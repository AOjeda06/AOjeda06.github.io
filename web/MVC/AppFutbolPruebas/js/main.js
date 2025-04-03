import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async () => {
    try {
        console.log("Iniciando la obtención de datos...");
        const datos = await FootballDataApi.obtenerLigasYJugadoresDeChampions();

        // Procesar los jugadores de los clubes
        const jugadoresPorLiga = datos.clubes.map(async club => {
            console.log(`Procesando jugadores del club: ${club.strTeam}`);
            return await FootballDataApi.obtenerJugadoresDeEquipos([club.idTeam]);
        });

        const jugadores = await Promise.all(jugadoresPorLiga);
        console.log("Jugadores procesados:", jugadores);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();