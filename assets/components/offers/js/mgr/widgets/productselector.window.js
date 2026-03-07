offers.window.ProductSelector = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Выбор товара',
        width: 780,
        height: 500,
        layout: 'fit',

        items: [{
            xtype: 'panel',
            layout: 'border',

            items: [{
                region: 'west',
                width: 250,
                xtype: 'offers-tree-categories',
                split: true,
                collapsible: false
            },{
                region: 'center',
                xtype: 'offers-grid-products',
                id: 'offers-grid-products'
            }]
        }]
    });

    offers.window.ProductSelector.superclass.constructor.call(this, config);
};

Ext.extend(offers.window.ProductSelector, MODx.Window);
Ext.reg('offers-window-productselector', offers.window.ProductSelector);
