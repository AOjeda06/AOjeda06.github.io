const Controller = {
    init() {
        this.bindEvents();
        this.updateView();
    },
    bindEvents() {
        $('#add-item-button').on('click', function () {
            const newItem = $('#item-input').val();
            if (newItem) {
                Model.addItem(newItem);
                const items = Model.getItems();
                View.render(items);
            }
        });
    },
};
