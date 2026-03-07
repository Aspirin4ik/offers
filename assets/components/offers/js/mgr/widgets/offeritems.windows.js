Offers.window.OfferItemUpdate = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Редактировать товар',
        width: 400,
        autoHeight: true,
        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/offeritem/update'
        },
        fields: [{
            xtype: 'hidden',
            name: 'id'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Товар',
            name: 'name_prod'
        },{
            xtype: 'numberfield',
            id: config.id + '-price',
            fieldLabel: 'Цена',
            name: 'price',
            allowBlank: false,
            listeners: {
                change: function(field, value) {
                    var qty = Ext.getCmp(config.id + '-qty').getValue();
                    Ext.getCmp(config.id + '-total').setValue((value * qty).toFixed(2));
                }
            }
        },{
            xtype: 'numberfield',
            id: config.id + '-qty',
            fieldLabel: 'Количество',
            name: 'quantity',
            allowBlank: false,
            listeners: {
                change: function(field, value) {
                    var price = Ext.getCmp(config.id + '-price').getValue();
                    Ext.getCmp(config.id + '-total').setValue((price * value).toFixed(2));
                }
            }
        },{
            xtype: 'displayfield',
            id: config.id + '-total',
            fieldLabel: 'Сумма',
            name: 'total'
        }]
    });

    Offers.window.OfferItemUpdate.superclass.constructor.call(this, config);
};

Ext.extend(Offers.window.OfferItemUpdate, MODx.Window);
Ext.reg('offers-window-offeritem-update', Offers.window.OfferItemUpdate);
