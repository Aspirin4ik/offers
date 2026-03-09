if (typeof Offers === 'undefined') {
    var Offers = {};
}
Offers.tree = Offers.tree || {};

Offers.tree.Categories = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        xtype: 'offers-tree-categories',
        url: Offers.config.connectorUrl + '?tree=1',
        action: 'mgr/product/getcategories',
        root_id: 8,
        rootVisible: true,
        useArrows: true,
        border: false,
        autoScroll: true,
        enableDD: false,
        loaderConfig: {
            dataUrl: Offers.config.connectorUrl + '?tree=1',
            baseParams: {
                action: 'mgr/product/getcategories'
            },
            preloadChildren: true,
            clearOnLoad: true
        },
        root: {
            id: config.root_id || 8,
            text: 'Категории',
            draggable: false,
            expanded: true
        },
        listeners: {
            click: function(node) {
                var grid = Ext.getCmp('offers-grid-products');
                if (!grid) return;

                var store = grid.getStore();
                store.baseParams = store.baseParams || {};
                store.baseParams.category_id = node.id;

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });
            }
        }
    });

    Offers.tree.Categories.superclass.constructor.call(this, config);
};
Ext.extend(Offers.tree.Categories, MODx.tree.Tree);
Ext.reg('offers-tree-categories', Offers.tree.Categories);
