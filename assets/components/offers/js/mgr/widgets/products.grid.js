Offers.grid.Products = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'offers-grid-products',
        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/product/getlist',
            category_id: config.category_id // отправляем в процессор
        },
        fields: ['id', 'name_prod', 'price', 'image', 'thumb'],
        paging: true,
        remoteSort: true,
        autoHeight: true,
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
        }],
        listeners: {
            rowdblclick: function(grid, rowIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                this.fireEvent('productSelected', rec.data);
            },
            scope: this
        }
    });

    Offers.grid.Products.superclass.constructor.call(this, config);
};

Ext.extend(Offers.grid.Products, MODx.grid.Grid);
Ext.reg('offers-grid-products', Offers.grid.Products);