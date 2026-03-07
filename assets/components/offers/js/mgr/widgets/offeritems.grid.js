Offers.grid.OfferItems = function(config) {
    config = config || {}; 
    
    Ext.applyIf(config, { 
        id: 'offers-grid-offer-items', 
        url: Offers.config.connectorUrl, 
        baseParams: {
            action: 'mgr/offeritem/getlist', 
            offer_id: config.offerIdField 
            
        }, 
        fields: ['id', 'name_prod', 'price', 'quantity', 'thumb', 'image', 'total'], 
        paging: true, 
        remoteSort: true, 
        autoHeight: true, 
        columns: [{
            header: 'Название',
            dataIndex: 'name',
            width: 200
        },{ 
        
        header: 'Действия', 
        width: 80, 
        renderer: Offers.utils.renderActions, 
        actions: [{ 
            icon: 'edit', 
            title: 'Редактировать', 
            action: 'editItem'
        },{ 
            icon: 'trash', 
            title: 'Удалить', 
            action: 'removeItem'    
        }]
        
            
        },{
            
        header: 'Фото',
        dataIndex: 'thumb',
        width: 80,
        renderer: function(v, md, rec) {
        if (!v) return '';
        return '<a href="' + rec.data.image + '" target="_blank">'
             + '<img src="' + v + '" style="height:40px;">'
             + '</a>';
        }
        
        },

        
        {
            header: 'Цена',
            dataIndex: 'price',
            width: 100
        },{
            header: 'Кол-во',
            dataIndex: 'quantity',
            width: 80
        },{
            header: 'Сумма',
            dataIndex: 'total',
            width: 100
        }],
        tbar: [{ 
            text: 'Добавить из каталога', 
            handler: this.addFromCatalog, 
            scope: this 
        }]
    });

    Offers.grid.OfferItems.superclass.constructor.call(this, config);
};

Ext.extend(Offers.grid.OfferItems, MODx.grid.Grid, {

    removeItem: function(btn, e) {
        var rec = this.menu.record;

        MODx.msg.confirm({
            title: 'Удалить товар',
            text: 'Вы уверены, что хотите удалить этот товар из КП?',
            url: Offers.config.connectorUrl,
            params: {
                action: 'mgr/offeritem/remove',
                id: rec.id
            },
            listeners: {
                success: { fn: this.refresh, scope: this }
            }
        });
    },


    createItem: function() {
        var win = MODx.load({
            xtype: 'offers-window-offeritem-create',
            offer_id: this.config.offerIdField,
            listeners: {
                success: { fn: this.refresh, scope: this }
            }
        });
        win.show();
    },
    
    
    editItem: function(btn, e) {
    var rec = this.menu.record;

    var win = MODx.load({
        xtype: 'offers-window-offeritem-update',
        record: rec,
        listeners: {
            success: { fn: this.refresh, scope: this }
        }
    });

    win.setValues(rec);
    win.show(e.target);
}

});

Ext.reg('offers-grid-offer-items', Offers.grid.OfferItems);
