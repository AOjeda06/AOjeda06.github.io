const Model = {
    data: {
        items: [],		// Usamos un array como BD
    },
    addItem(item) {
        this.data.items.push(item);
    },
    getItems() {
        return this.data.items;
    },
};
