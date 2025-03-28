class Tarea {
    #id;
    #tarea;
    #fecha;
    #estado;
    #visible;

    // Constructor
    constructor(id, tarea, fecha, estado = false, visible = true) {
        this.#id = id;
        this.#tarea = tarea;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#visible = visible;
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

    getVisible() {
        return this.#visible;
    }

    setVisible(visible) {
        this.#visible = visible;
    }
}
