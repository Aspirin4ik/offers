Offers.window.ProductSelector = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Выбор товара',
        width: 700,
        height: 500,
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [{
                region: 'west',
                width: 250,
                xtype: 'offers-tree-categories',
                split: true
            },{
                region: 'center',
                xtype: 'offers-grid-products',
                id: 'offers-grid-products'
        }]
    }]

    });

    Offers.window.ProductSelector.superclass.constructor.call(this, config);
};

Ext.extend(Offers.window.ProductSelector, MODx.Window);
Ext.reg('offers-window-product-selector', Offers.window.ProductSelector);