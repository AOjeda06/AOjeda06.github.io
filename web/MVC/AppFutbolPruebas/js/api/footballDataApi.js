const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3/';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const RETRY_DELAY = 5000; // 5 seconds
const MAX_CONCURRENT_REQUESTS = 5; // Limit concurrent requests

const FootballDataApi = {
    /**
     * Realiza una solicitud con reintentos en caso de error 429.
     * @param {string} url - URL de la solicitud.
     * @param {number} retries - Número de reintentos permitidos.
     * @returns {Promise<Object>} Respuesta de la solicitud.
     */
    fetchWithRetry: async function (url, retries = 3) {
        try {
            const response = await fetch(url);
            if (response.status === 429 && retries > 0) {
                console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return this.fetchWithRetry(url, retries - 1);
            }
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    },

    /**
     * Procesa solicitudes en lotes para limitar la concurrencia.
     * @param {Array<Function>} tasks - Array de funciones que devuelven promesas.
     * @returns {Promise<Array>} Resultados de las tareas.
     */
    processInBatches: async function (tasks) {
        const results = [];
        while (tasks.length > 0) {
            const batch = tasks.splice(0, MAX_CONCURRENT_REQUESTS);
            const batchResults = await Promise.allSettled(batch.map(task => task()));
            results.push(...batchResults);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Delay between batches
        }
        return results;
    },

    /**
     * Obtiene la lista de ligas.
     * @returns {Promise<Array>} Lista de ligas.
     */
    obtenerLigas: async function () {
        console.log("Solicitando la lista de ligas...");
        const localStorageKey = 'ligas';
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
            console.log("Ligas obtenidas del localStorage.");
            return JSON.parse(cachedData);
        }

        try {
            const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}all_leagues.php`);
            console.log("Ligas recibidas:", data.leagues);
            localStorage.setItem(localStorageKey, JSON.stringify(data.leagues || []));
            return data.leagues || [];
        } catch (error) {
            console.error("Error al obtener la lista de ligas:", error);
            throw error;
        }
    },

    /**
     * Obtiene los equipos de una liga específica.
     * @param {string} leagueName - Nombre de la liga.
     * @returns {Promise<Array>} Lista de equipos.
     */
    obtenerEquipos: async function (leagueName) {
        console.log(`Solicitando equipos para la liga: ${leagueName}`);
        const localStorageKey = `equipos_${leagueName}`;
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
            console.log(`Equipos para la liga ${leagueName} obtenidos del localStorage.`);
            return JSON.parse(cachedData);
        }

        try {
            const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
            console.log("Equipos recibidos:", data.teams);
            localStorage.setItem(localStorageKey, JSON.stringify(data.teams || []));
            return data.teams || [];
        } catch (error) {
            console.error(`Error al obtener equipos para la liga ${leagueName}:`, error);
            throw error;
        }
    },

    /**
     * Obtiene los jugadores de múltiples equipos.
     * @param {Array<number>} teamIds - IDs de los equipos.
     * @returns {Promise<Array>} Lista de jugadores.
     */
    obtenerJugadoresDeEquipos: async function (teamIds) {
        console.log("Solicitando jugadores para múltiples equipos...");
        const results = [];

        for (const teamId of teamIds) {
            const localStorageKey = `jugadores_${teamId}`;
            const cachedData = localStorage.getItem(localStorageKey);

            if (cachedData) {
                console.log(`Jugadores para el equipo ID ${teamId} obtenidos del localStorage.`);
                results.push(JSON.parse(cachedData));
                continue;
            }

            try {
                console.log(`Solicitando jugadores para el equipo ID: ${teamId}`);
                const data = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}lookup_all_players.php?id=${teamId}`);
                localStorage.setItem(localStorageKey, JSON.stringify(data.player || []));
                results.push(data.player || []);
            } catch (error) {
                console.error(`Error al obtener jugadores para el equipo ID ${teamId}:`, error);
            }
        }

        return results;
    },

    /**
     * Obtiene los equipos de la Champions League y las ligas de esos equipos.
     * @returns {Promise<Object>} Datos agrupados de equipos y ligas.
     */
    obtenerDatosChampions: async function () {
        console.log("Obteniendo datos de la Champions League...");

        // Verificar si los datos ya están en localStorage
        const localStorageKey = 'champions_data';
        const cachedData = localStorage.getItem(localStorageKey);

        if (cachedData) {
            console.log("Datos de la Champions League obtenidos del localStorage.");
            return JSON.parse(cachedData);
        }

        try {
            // Obtener los equipos de la Champions League usando el nombre exacto de la liga
            const response = await this.fetchWithRetry(`${PROXY_URL}${BASE_URL}search_all_teams.php?l=UEFA%20Champions%20League`);
            const equipos = response.teams || [];
            console.log("Equipos de la Champions League:", equipos);

            // Obtener las ligas de los equipos participantes
            const leagueNames = [...new Set(equipos.map(equipo => equipo.strLeague))]; // Evitar duplicados
            console.log("Ligas de los equipos participantes:", leagueNames);

            const ligasDeEquipos = await this.processInBatches(
                leagueNames.map(leagueName => async () => this.obtenerEquipos(leagueName))
            );

            const ligasProcesadas = ligasDeEquipos
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            // Guardar los datos agrupados en localStorage
            const championsData = { equipos, ligasProcesadas };
            localStorage.setItem(localStorageKey, JSON.stringify(championsData));

            return championsData;
        } catch (error) {
            console.error("Error al obtener datos de la Champions League:", error);
            throw error;
        }
    },

    /**
     * Obtiene las ligas de los equipos que participan en la Champions League.
     * Luego obtiene los clubes y jugadores de esas ligas.
     * @returns {Promise<Object>} Datos agrupados de ligas, clubes y jugadores.
     */
    obtenerLigasYJugadoresDeChampions: async function () {
        console.log("Obteniendo ligas y jugadores de los equipos de la Champions League...");

        try {
            // Obtener los equipos de la Champions League
            const championsData = await this.obtenerDatosChampions();
            const equipos = championsData.equipos;

            // Extraer las ligas únicas de los equipos
            const leagueNames = [...new Set(equipos.map(equipo => equipo.strLeague))];
            console.log("Ligas únicas de los equipos de la Champions League:", leagueNames);

            // Crear un conjunto para rastrear las ligas ya procesadas
            const ligasProcesadas = new Set();

            // Obtener los clubes de cada liga (evitando duplicados)
            const clubesPorLiga = await this.processInBatches(
                leagueNames
                    .filter(leagueName => {
                        if (ligasProcesadas.has(leagueName)) {
                            console.log(`Liga ya procesada: ${leagueName}`);
                            return false;
                        }
                        ligasProcesadas.add(leagueName);
                        return true;
                    })
                    .map(leagueName => async () => {
                        console.log(`Obteniendo clubes de la liga: ${leagueName}`);
                        return this.obtenerEquipos(leagueName);
                    })
            );

            const clubes = clubesPorLiga
                .filter(result => result.status === 'fulfilled')
                .flatMap(result => result.value);

            console.log("Clubes obtenidos de todas las ligas:", clubes);

            // Obtener los jugadores de cada club
            const jugadoresPorClub = await this.processInBatches(
                clubes.map(club => async () => {
                    console.log(`Obteniendo jugadores del club: ${club.strTeam}`);
                    return this.obtenerJugadoresDeEquipos([club.idTeam]);
                })
            );

            const jugadores = jugadoresPorClub
                .filter(result => result.status === 'fulfilled')
                .flatMap(result => result.value);

            console.log("Jugadores obtenidos de todos los clubes:", jugadores);

            // Retornar los datos agrupados
            return { ligas: Array.from(ligasProcesadas), clubes, jugadores };
        } catch (error) {
            console.error("Error al obtener ligas y jugadores de los equipos de la Champions League:", error);
            throw error;
        }
    }
};

export default FootballDataApi;
