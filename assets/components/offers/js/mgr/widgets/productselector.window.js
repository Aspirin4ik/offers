Offers.window.ProductSelector = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Выбор товара',
        width: 700,
        height: 500,
        layout: 'fit',
        modal: true,

        items: [{
            layout: 'border',
            border: false,

            items: [{
                region: 'west',
                width: 250,
                xtype: 'offers-tree-categories',
                split: true
            },{
                region: 'center',
                xtype: 'offers-grid-products',
                id: 'offers-grid-products',
                category_id: config.category_id || 8
            }]
        }],

        buttons: [{
            text: 'Закрыть',
            handler: function() { this.hide(); },
            scope: this
        }]
    });

    Offers.window.ProductSelector.superclass.constructor.call(this, config);

    // Даем гриду ссылку на окно
    this.on('afterrender', function() {
        var grid = Ext.getCmp('offers-grid-products');
        if (grid) {
            grid.ownerWindow = this;
            this.bindGridEvents(grid);
        }
    }, this);

    // Загружаем товары при открытии окна
    this.on('show', function() {
        var grid = Ext.getCmp('offers-grid-products');
        if (!grid) return;

        var store = grid.getStore();
        store.baseParams = store.baseParams || {};
        store.baseParams.category_id = config.category_id || 8;

        store.load({ params: { start: 0, limit: 20 } });
    }, this);
};

Ext.extend(Offers.window.ProductSelector, MODx.Window, {

    // Подключаем обработчики кнопок "Добавить / Удалить"
    bindGridEvents: function(grid) {
        var view = grid.getView();

        view.el.on('click', function(e) {
            var addBtn = e.getTarget('.offers-add-product');
            var delBtn = e.getTarget('.offers-remove-product');

            // Добавление товара
            if (addBtn) {
                var id = addBtn.getAttribute('data-id');
                var rec = grid.getStore().getById(id);
                if (!rec) return;

                this.addProduct(rec.data);
                rec.data._added = true;
                view.refresh();
            }

            // Удаление товара
            if (delBtn) {
                var id = delBtn.getAttribute('data-id');
                var rec = grid.getStore().getById(id);
                if (!rec) return;

                this.removeProduct(rec.data);
                rec.data._added = false;
                view.refresh();
            }

        }, this);
    },

    // Добавление товара в КП
    addProduct: function(product) {
        var offerGrid = Ext.getCmp('offers-grid-offer-items-temp');
        if (offerGrid) {
            offerGrid.addTempItem(product);
        }
    },

    // Удаление товара из КП
    removeProduct: function(product) {
        var offerGrid = Ext.getCmp('offers-grid-offer-items-temp');
        if (offerGrid) {
            offerGrid.removeTempItem(product.id);
        }
    }

});

Ext.reg('offers-window-product-selector', Offers.window.ProductSelector);