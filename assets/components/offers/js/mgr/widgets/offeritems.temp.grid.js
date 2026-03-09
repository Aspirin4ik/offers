Offers.grid.OfferItemsTemp = function(config) {
    config = config || {};

    this.tempItems = [];

    // Создаём store вручную — это критично для LocalGrid
    this.store = new Ext.data.JsonStore({
        idProperty: 'id',
        fields: [
            {name: 'id'},
            {name: 'name_prod'},
            {name: 'price'},
            {name: 'quantity'},
            {name: 'thumb'},
            {name: 'image'},
            {name: 'total'}
        ]
    });

    Ext.applyIf(config, {
        id: 'offers-grid-offer-items-temp',
        store: this.store,
        columns: [{
            header: 'Фото',
            dataIndex: 'thumb',
            width: 80,
            renderer: function(v, md, rec) {
                return v
                    ? '<a href="' + rec.data.image + '" target="_blank"><img src="' + v + '" style="height:40px;"></a>'
                    : '';
            }
        },{
            header: 'Товар',
            dataIndex: 'name_prod',
            width: 200
        },{
            header: 'Цена',
            dataIndex: 'price',
            width: 80
        },{
            header: 'Кол-во',
            dataIndex: 'quantity',
            width: 60
        },{
            header: 'Сумма',
            dataIndex: 'total',
            width: 80
        },{
            header: 'Удалить',
            width: 60,
            renderer: function(v, md, rec) {
                return '<button class="offers-delete-item" data-id="' + rec.data.id + '">Удалить</button>';
            }
        }],
        tbar: [{
            text: 'Добавить из каталога',
            handler: this.addFromCatalog,
            scope: this
        }]
        
    });
    if (config.data) delete config.data;
    if (config.initialConfig && config.initialConfig.data) delete config.initialConfig.data;
    
    Offers.grid.OfferItemsTemp.superclass.constructor.call(this, config);
    if (this.data) delete this.data;
    if (this.initialConfig && this.initialConfig.data) delete this.initialConfig.data;
};

Ext.extend(Offers.grid.OfferItemsTemp, MODx.grid.LocalGrid, {
    listeners: {
        afterrender: function(grid) {
            grid.getView().el.on('click', function(e) {
                var btn = e.getTarget('.offers-delete-item');
                    if (btn) {
                        var id = btn.getAttribute('data-id');
                        grid.removeTempItem(id);
                    }
                });
        }
    },


    removeTempItem: function(id) {
        this.tempItems = this.tempItems.filter(function(item) {
            return item.id != id;
        });

        this.store.loadData(this.tempItems);
        this.getView().refresh();
    },


    _loadStore: function() {
        return; // Полностью отключаем автозагрузку config.data
    },
    
    addFromCatalog: function() {
        var grid = this;

        var win = MODx.load({
            xtype: 'offers-window-product-selector',
            category_id: 8,
            onSelect: function(product) {
                grid.addTempItem(product);
            }
        });

        win.show();
    },

    addTempItem: function(product) {
        var quantity = 1;
        var total = product.price * quantity;

        var item = {
            id: product.id,
            name_prod: product.name_prod,
            price: product.price,
            quantity: quantity,
            thumb: product.thumb,
            image: product.image,
            total: total
        };

        this.tempItems.push(item);

        this.store.loadData(this.tempItems);
        this.getView().refresh();
    },

    getItems: function() {
        return this.tempItems;
    }

});

Ext.reg('offers-grid-offer-items-temp', Offers.grid.OfferItemsTemp);