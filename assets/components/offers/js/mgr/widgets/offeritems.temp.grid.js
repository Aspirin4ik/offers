Offers.grid.OfferItemsTemp = function(config) {
    config = config || {};

    this.tempItems = []; // временное хранилище

    Ext.applyIf(config, {
        id: 'offers-grid-offer-items-temp',
        fields: ['name_prod', 'price', 'quantity', 'thumb', 'image', 'total'],
        columns: [{
            header: 'Фото',
            dataIndex: 'thumb',
            width: 80,
            renderer: function(v, md, rec) {
                return '<a href="' + rec.data.image + '" target="_blank">'
                     + '<img src="' + v + '" style="height:40px;">'
                     + '</a>';
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
        }],
        tbar: [{
            text: 'Добавить из каталога',
            handler: this.addFromCatalog,
            scope: this
        }],
        data: this.tempItems
    });

    Offers.grid.OfferItemsTemp.superclass.constructor.call(this, config);
};

Ext.extend(Offers.grid.OfferItemsTemp, MODx.grid.LocalGrid, {

    addFromCatalog: function() {
        var win = MODx.load({
            xtype: 'offers-window-productselector', // ← ИСПРАВЛЕНО
            category_id: 8,
            onSelect: function(product) {
                this.addTempItem(product);
            },
            scope: this
        });
        win.show();
    },

    addTempItem: function(product) {
        var quantity = 1;
        var total = product.price * quantity;

        this.tempItems.push({
            name_prod: product.name_prod,
            price: product.price,
            quantity: quantity,
            thumb: product.thumb,
            image: product.image,
            total: total
        });

        this.getStore().loadData(this.tempItems);
    },

    getItems: function() {
        return this.tempItems;
    }

});

Ext.reg('offers-grid-offer-items-temp', Offers.grid.OfferItemsTemp);
