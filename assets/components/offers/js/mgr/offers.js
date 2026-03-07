var Offers = function(config) {
    config = config || {};
    Offers.config = config;
    Offers.superclass.constructor.call(this,config);
};
Ext.extend(Offers, Ext.Component);
Ext.reg('offers', Offers);

// Пространства имён
Offers.grid = {};
Offers.window = {};
Offers.panel = {};
Offers.page = {};

// Конфиг
Offers.config = {
    connectorUrl: '/assets/components/offers/connector.php'
};

Offers.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'offers-grid-offers',
            renderTo: 'offers-panel-home-div'
        }]
    });
    Offers.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(Offers.page.Home, MODx.Component);
Ext.reg('offers-page-home', Offers.page.Home);
