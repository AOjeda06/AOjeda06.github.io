class Tarea {
    #id;
    #tarea;
    #fecha;
    #estado;

    // Constructor
    constructor(id, tarea, fecha, estado = false) {
        this.#id = id;
        this.#tarea = tarea;
        this.#fecha = fecha;
        this.#estado = estado;
    }

    // Métodos para acceder a los atributos privados
    getId() {
        return this.#id;
    }

    getTarea() {
        return this.#tarea;
    }

    getFecha() {
        return this.#fecha;
    }

    getEstado() {
        return this.#estado;
    }

    setEstado(estado) {
        this.#estado = estado;
    }
}
