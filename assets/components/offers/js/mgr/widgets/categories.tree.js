Offers.tree.Categories = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        url: Offers.config.connectorUrl,
        action: 'mgr/product/getcategories',
        root_id: 8, // ID корневой категории
        rootVisible: true,
        useArrows: true,
        autoScroll: true,
        border: false,
        listeners: {
            click: function(node) {
                var grid = Ext.getCmp('offers-grid-products');
                grid.getStore().baseParams.category_id = node.id;
                grid.getStore().load();
            }
        }
    });

    Offers.tree.Categories.superclass.constructor.call(this, config);
};

Ext.extend(Offers.tree.Categories, MODx.tree.Tree);
Ext.reg('offers-tree-categories', Offers.tree.Categories);
