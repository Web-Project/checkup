(function(){

    var fileUrl = 'files.php?m=GetFiles';

    /**
     * Flag to get the seelcted tab
     * @type {Number}
     * 1 = Formatter
     * 2 = Mapper
     */
    var selectedTab = 1;

    var fileStore = Ext.create('Ext.data.Store', {
        proxy   : { 
            url             : fileUrl,
            type            : 'ajax',
            actionMethods   : 'POST',
            reader          : { 
                type            :'json',
                root            : 'rows',
                totalProperty   : 'totalRecords'
            },
            simpleSortMode : true,
            timeout        :600000
        },
        fields: ['file', 'file_id', 'site_id', 'format']
    });



    var gridFormatterFile = Ext.create('Checkup.Util.GridSearch.Panel', {
        store: fileStore,
        id  : 'grid-files-formatter',
        columnLines: true,
        columns: [
            {
                text        : 'Files',
                dataIndex   : 'file',
                flex        : 1
            }, {
                text        : 'Format ID',
                dataIndex   : 'file_id',
                flex        : 1
            }, {
                text        : 'Site ID(s)',
                dataIndex   : 'site_id',
                flex        : 1,
                renderer    : function(value)
                {
                    return "<div title='" + value + "' >" + value + "</div>";
                }
            }, {
                text        : 'Format',
                dataIndex   : 'format',
                flex        : 1
            }
        ],
        columnWidth : 1,
        border      : true,
        frame       : false,
        viewConfig: {
            stripeRows: true
        },
        height  : Ext.getBody().getViewSize().height - 90
    });

    var gridMapperFile = Ext.create('Checkup.Util.GridSearch.Panel', {
        store: fileStore,
        id  : 'grid-files-mapper',
        columnLines: true,
        columns: [
            {
                text        : 'Files',
                dataIndex   : 'file',
                flex        : 1
            }, {
                text        : 'Site ID',
                dataIndex   : 'file_id',
                flex        : 1
            }
        ],
        columnWidth : 1,
        border      : true,
        frame       : false,
        viewConfig: {
            stripeRows: true
        },
        height  : Ext.getBody().getViewSize().height - 90
    });

    var gridTransmitterFile = Ext.create('Checkup.Util.GridSearch.Panel', {
        store: fileStore,
        id  : 'grid-files-transmitter',
        columnLines: true,
        columns: [
            {
                text        : 'Files',
                dataIndex   : 'file',
                flex        : 1
            }, {
                text        : 'Transmit ID',
                dataIndex   : 'file_id',
                flex        : 1
            }, {
                text        : 'Site ID(s)',
                dataIndex   : 'site_id',
                flex        : 1,
                renderer    : function(value)
                {
                    return "<div title='" + value + "' >" + value + "</div>";
                }
            }, {
                text        : 'Transmission Type',
                dataIndex   : 'format',
                flex        : 1
            }
        ],
        columnWidth : 1,
        border      : true,
        frame       : false,
        viewConfig: {
            stripeRows: true
        },
        height  : Ext.getBody().getViewSize().height - 90
    });


    function refreshAllGrid()
    {
        fileStore.load({params : { type :'formatter' }});
    }

    function btnHandler(btn)
    {
        var form;
        var action;

        switch(selectedTab)
        {
            case 1:
                form = 'Formatter';
                break;
            case 2:
                form = 'Mapper';
                break;
            case 3:
                form = 'Transmitter';
                break;
        }


        if(btn.id == 'btn-add')
        {
            action = 'Add';
            console.log('add Tools.' + form + '.Window.Add');
        }
        else if(btn.id == 'btn-edit')
        {
            action = 'Edit';
            console.log('edit Tools.' + form + '.Window.Edit');
        }
        else if(btn.id == 'btn-delete')
        {
            action = 'Delete';
            console.log('delete Tools.' + form + '.Window.Delete');
        }

        Ext.create('Checkup.' + form + '.Window.' + action).show();
    }

    Ext.define('Checkup.Panel',
    {
        extend      : 'Ext.tab.Panel',
        title       : 'Job Distribution Tools',
        renderTo    : Ext.get('container'),
        id          : 'tabpanel-main',
        layout      : 'fit',

        tools: [
            {
                type: 'gear',
                width: 'auto',
                renderTpl: [
                    'Welcome Admin',
                    '&nbsp;|&nbsp;<u>Logout</u>'
                ],
                handler: function () {
                    window.location = 'application/index/logout';
                }
            }
        ],

        initComponent : function() {

            this.items = [
                {
                    title  : 'Formatter',
                    layout  : 'column',
                    //items   : [gridFormatterFile]
                }, {
                    title   : 'Mapper',
                    layout  : 'column',
                    //items   : [gridMapperFile]
                }, {
                    title   : 'Transmitter',
                    layout  : 'column',
                    //items   : [gridTransmitterFile]
                }
            ];
            this.superclass.initComponent.call(this);

            //refreshAllGrid()
        },

        listeners : {
            tabchange : function(tp, newTab)
            {

                if(newTab.title == 'Formatter')
                {
                    fileStore.load({params : { type :'formatter' }});
                    selectedTab = 1;
                }
                else if(newTab.title == 'Mapper')
                {
                    fileStore.load({params : { type :'mapper' }});
                    selectedTab = 2;
                }
                else if(newTab.title == 'Transmitter')
                {
                    fileStore.load({params : { type :'transmitter' }});
                    selectedTab = 3;
                }
            }
        },

        buttons : [
            {
                text    : 'Add',
                id      : 'btn-add',
                handler : btnHandler
            }, {
                text    : 'Edit',
                id      : 'btn-edit',
                handler : btnHandler
            }, {
                text    : 'Delete',
                id      : 'btn-delete',
                handler : btnHandler
            }
        ]
    });
})();