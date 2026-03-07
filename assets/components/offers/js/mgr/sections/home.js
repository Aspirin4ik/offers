Offers.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'offers-panel-home',
            renderTo: 'offers-panel-home-div'
        }]
    });
    Offers.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(Offers.page.Home, MODx.Component);
Ext.reg('offers-page-home', Offers.page.Home);