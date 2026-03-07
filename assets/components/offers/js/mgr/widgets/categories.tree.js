Offers.tree.Categories = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        xtype: 'treepanel',
        id: 'offers-tree-categories',
        url: Offers.config.connectorUrl,

        // ВАЖНО: только baseParams работает в MODx.tree.Tree
        baseParams: {
            action: 'mgr/product/getcategories'
        },

        root_id: 8,
        root_name: 'Каталог',
        rootVisible: true,

        useArrows: true,
        autoScroll: true,
        border: false,

        listeners: {
            click: function(node) {
                var grid = Ext.getCmp('offers-grid-products');
                if (grid) {
                    grid.getStore().load({
                        params: {
                            action: 'mgr/product/getlist',
                            category_id: node.id
                        }
                    });
                }
            }
        }
    });

    Offers.tree.Categories.superclass.constructor.call(this, config);
};

Ext.extend(Offers.tree.Categories, MODx.tree.Tree);
Ext.reg('offers-tree-categories', Offers.tree.Categories);
