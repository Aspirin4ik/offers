Offers.window.ProductSelector = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Выбор товара',
        width: 780,
        height: 500,
        layout: 'fit',
        modal: true,

        items: [{
            xtype: 'panel',
            layout: 'border',
            border: false,

            items: [{
                region: 'west',
                xtype: 'offers-tree-categories',
                width: 250,
                split: true,
                collapsible: false
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
Ext.reg('offers-window-productselector', Offers.window.ProductSelector);
