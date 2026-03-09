// Пространство имён для окон
Offers.window = Offers.window || {};

/* ============================
   ОКНО СОЗДАНИЯ КП
============================ */
Offers.window.OfferCreate = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Создать КП',
        width: 700,
        height: 500,
        autoHeight: false,
        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/offer/create'
        },
        layout: 'fit',
        items: [{
            xtype: 'modx-tabs',
            border: true,
            deferredRender: false,
            items: [{
                title: 'Основная информация',
                layout: 'form',
                bodyStyle: 'padding:10px;',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название',
                    name: 'title',
                    anchor: '100%',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Клиент',
                    name: 'client',
                    anchor: '100%',
                    allowBlank: true
                },{
                    xtype: 'hidden',
                    name: 'total',
                    value: 0
                },{
                    xtype: 'hidden',
                    name: 'pdf_path',
                    value: ''
                }]
            },{
                title: 'Товары',
                layout: 'fit',
                autoHeight: false,
                height: 400, // ← можно 300–500, как удобно
                items: [{
                    xtype: 'offers-grid-offer-items-temp',
                    id: 'offers-grid-offer-items-temp'
                }], 
                listeners: {
                    activate: function(tab) {
                        var grid = Ext.getCmp('offers-grid-offer-items-temp');
                        if (grid) {
                            grid.getView().refresh();
                        }
                    }
                }
            }]
        }],
        buttons: [{
                    text: 'Сохранить',
                    cls: 'primary-button',
                    handler: function() {
                        this.submitOfferWithItems();
                    },
                scope: this
                },{
                    text: 'Закрыть',
                    handler: function() {
                    this.close();
                    },
                scope: this
        }]

        
    });

    Offers.window.OfferCreate.superclass.constructor.call(this, config);
};

Ext.extend(Offers.window.OfferCreate, MODx.Window, {

    // Перед сохранением добавляем товары из временного грида
        submitOfferWithItems: function() {
        var itemsGrid = Ext.getCmp('offers-grid-offer-items-temp');
        var items = itemsGrid.getItems();

        this.baseParams.items = Ext.encode(items);

        this.submit();
    }

    
});

Ext.reg('offers-window-offer-create', Offers.window.OfferCreate);



/* ============================
   ОКНО РЕДАКТИРОВАНИЯ КП
============================ */
Offers.window.UpdateOffer = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        title: 'Карточка КП',
        width: 700,
        height: 500,
        autoHeight: false,
        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/offer/update'
        },
        layout: 'fit',
        items: [{
            xtype: 'modx-tabs',
            border: true,
            deferredRender: false,
            items: [{
                title: 'Основная информация',
                layout: 'form',
                bodyStyle: 'padding:10px;',
                items: [{
                    xtype: 'hidden',
                    name: 'id'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Название',
                    name: 'title',
                    anchor: '100%',
                    allowBlank: false
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Описание',
                    name: 'description',
                    anchor: '100%'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Создано',
                    name: 'created_at',
                    anchor: '100%',
                    readOnly: true
                }]
            },{
                    title: 'Товары',
                    layout: 'fit',
                    items: [{
                        xtype: 'offers-grid-offer-items-temp',
                        id: 'offers-grid-offer-items-temp'
                    }]
            }]
        }],
        buttons: [{
            text: 'Сохранить',
            cls: 'primary-button',
            handler: function() {
                this.submit();
            },
            scope: this
        },{
            text: 'Закрыть',
            handler: function() {
                this.close();
            },
            scope: this
        }]
    
        });



    Offers.window.UpdateOffer.superclass.constructor.call(this, config);
};

Ext.extend(Offers.window.UpdateOffer, MODx.Window);
Ext.reg('offers-window-offer-update', Offers.window.UpdateOffer);
