import FootballDataApi from './api/footballDataApi.js';
import Model from './model/model.js';

(async () => {
    try {
        console.log("Iniciando la obtención de datos...");
        const equiposChampions = await FootballDataApi.obtenerEquiposChampions();

        // Procesar los jugadores de los clubes
        const jugadoresPorEquipo = equiposChampions.map(async equipo => {
            console.log(`Procesando jugadores del equipo: ${equipo.strTeam}`);
            return await FootballDataApi.obtenerJugadoresEquipo(equipo.idTeam);
        });

        const jugadores = await Promise.all(jugadoresPorEquipo);
        console.log("Jugadores procesados:", jugadores);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
})();