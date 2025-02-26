const View = {
    render(items) {
        const $list = $('#item-list');
        $list.empty(); // Limpia la lista
        items.forEach((item) => {
            $list.append(`<li>${item}</li>`);
        });
    },
};
