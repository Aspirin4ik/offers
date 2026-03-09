Offers.grid.Products = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'offers-grid-products',

        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/product/getlist',
            category_id: config.category_id || 0
        },

        fields: ['id', 'name_prod', 'price', 'image', 'thumb'],

        autoHeight: true,
        paging: false,
        remoteSort: false,

        columns: [{
            header: 'Фото',
            dataIndex: 'thumb',
            width: 80,
            renderer: function(v) {
                return v ? '<img src="' + v + '" style="height:40px;">' : '';
            }
        },{
            header: 'Наименование',
            dataIndex: 'name_prod',
            width: 250
        },{
            header: 'Цена',
            dataIndex: 'price',
            width: 100
        },{
            header: 'Действия',
            width: 80,
            renderer: function(v, md, rec) {

                // Если товар уже добавлен — показываем кнопку "Удалить"
                if (rec.data._added) {
                    return '<button class="offers-remove-product" data-id="' + rec.id + '">Удалить</button>';
                }

                // Иначе — "Добавить"
                return '<button class="offers-add-product" data-id="' + rec.id + '">Добавить</button>';
            }
        }],

        listeners: {
            afterrender: function(grid) {

                grid.getEl().on('click', function(e) {

                    // Кнопка "Добавить"
                    var addBtn = e.getTarget('.offers-add-product');
                    if (addBtn) {
                        var id = addBtn.getAttribute('data-id');
                        var rec = grid.getStore().getById(id);
                        if (!rec) return;

                        // Меняем кнопку
                        addBtn.innerHTML = 'Удалить';
                        addBtn.classList.remove('offers-add-product');
                        addBtn.classList.add('offers-remove-product');

                        // Передаём товар в окно
                        var win = grid.ownerWindow;
                        if (win) {
                            win.addProduct(rec.data);
                        }

                        rec.data._added = true;
                        grid.getView().refresh();
                        return;
                    }

                    // Кнопка "Удалить"
                    var delBtn = e.getTarget('.offers-remove-product');
                    if (delBtn) {
                        var id = delBtn.getAttribute('data-id');
                        var rec = grid.getStore().getById(id);
                        if (!rec) return;

                        // Меняем кнопку
                        delBtn.innerHTML = 'Добавить';
                        delBtn.classList.remove('offers-remove-product');
                        delBtn.classList.add('offers-add-product');

                        // Удаляем товар из КП
                        var win = grid.ownerWindow;
                        if (win) {
                            win.removeProduct(rec.data);
                        }

                        rec.data._added = false;
                        grid.getView().refresh();
                        return;
                    }

                });
            }
        }
    });

    Offers.grid.Products.superclass.constructor.call(this, config);
};

Ext.extend(Offers.grid.Products, MODx.grid.Grid, {

    loadCategory: function(categoryId) {
        var s = this.getStore();
        s.setBaseParam('category_id', categoryId);
        s.load();
    }

});

Ext.reg('offers-grid-products', Offers.grid.Products);
