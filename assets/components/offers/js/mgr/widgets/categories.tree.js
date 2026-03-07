Offers.tree.Categories = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'offers-tree-categories',
        border: false,
        autoScroll: true,
        useArrows: true,
        rootVisible: true,

        root: {
            id: 8,
            text: 'Каталог',
            expanded: true
        },

        loader: new Ext.tree.TreeLoader({
            dataUrl: Offers.config.connectorUrl,
            baseParams: {
                action: 'mgr/product/getcategories'
            }
        }),

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

Ext.extend(Offers.tree.Categories, Ext.tree.TreePanel);
Ext.reg('offers-tree-categories', Offers.tree.Categories);
