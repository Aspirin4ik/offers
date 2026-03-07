Offers.grid.Offers = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'offers-grid-offers',
        url: Offers.config.connectorUrl,
        baseParams: {
            action: 'mgr/offer/getlist'
        },
        fields: ['id','title','description','created_at'],
        paging: true,
        remoteSort: true,
        autosave: false,
        columns: [{
            header: 'ID',
            dataIndex: 'id',
            width: 50
        },{
            header: 'Название',
            dataIndex: 'title',
            width: 200
        },{
            header: 'Создано',
            dataIndex: 'created_at',
            width: 150
        },{
            header: 'Действия',
            xtype: 'actioncolumn',
            width: 80,
            items: [{
                iconCls: 'icon-edit',
                tooltip: 'Редактировать',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    grid.ownerCt.editOffer(rec);
                }
            }]
        }],
        tbar: [{
            text: 'Создать КП',
            handler: this.createOffer,
            scope: this,
            cls: 'primary-button'
        }]
    });
    Offers.grid.Offers.superclass.constructor.call(this,config);
};

Ext.extend(Offers.grid.Offers, MODx.grid.Grid, {

    // Создание КП
    createOffer: function(btn,e) {
        var win = MODx.load({
            xtype: 'offers-window-offer-create',
            listeners: {
                success: {fn:function(){this.refresh();},scope:this}
            }
        });
        win.show(e.target);
    },

    // Редактирование КП
    editOffer: function(rec) {
        var win = MODx.load({
            xtype: 'offers-window-offer-update',
            record: rec.data,
            listeners: {
                success: {fn:function(){this.refresh();},scope:this}
            }
        });
        win.setValues(rec.data);
        win.show();
    }

});

Ext.reg('offers-grid-offers', Offers.grid.Offers);
