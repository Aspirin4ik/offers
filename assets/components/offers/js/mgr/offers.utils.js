Offers.utils = {

    // Рендер кнопок действий в гриде
    renderActions: function(value, metaData, record, rowIndex, colIndex, store) {
        var actions = record.data.actions || record.json.actions || [];
        var html = '';

        Ext.each(actions, function(a) {
            html += '<button class="offers-action-btn offers-action-' + a.icon + '" '
                 + 'title="' + a.title + '" '
                 + 'onclick="Ext.getCmp(\'' + store.grid.id + '\').' + a.action + '(this, event);">'
                 + '</button>';
        });

        return html;
    }

};