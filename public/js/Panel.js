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


    var menu_bar = [
        {
            xtype   : 'button',
            text    : 'File',
            menu    : {
                items   : [
                    {
                        text    : 'Menu 1',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Menu 2'
                    }
                ]
            }
        }, {
            xtype   : 'button',
            text    : 'Module',
            menu    : {
                items   : [
                    {
                        text    : 'Administration',
                        iconCls : 'default-icon',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Sales',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Purchasing',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Business Partners',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Inventory',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Item Master Data'
                                }, {
                                    text    : 'Inventory Transaction',
                                    menu    : {
                                        items   : [
                                            {
                                                text : 'Goods Receipt'
                                            }, {
                                                text : 'Goods Issued'
                                            }, {
                                                text : 'Inventory Transfer'
                                            }
                                        ]
                                    }
                                }, {
                                    text    : 'Item Search'
                                }
                            ]
                        }
                    }, {
                        text    : 'Reports',
                        iconCls : 'default-icon'
                    }
                ]
            }
        }, {
            xtype   : 'button',
            text    : 'Windows',
            menu    : {
                items   : [
                    {
                        text    : 'Menu 1',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Submenu'
                                }
                            ]
                        }
                    }, {
                        text    : 'Menu 2'
                    }
                ]
            }
        }
    ];

    Ext.define('Checkup.Panel',
    {
        extend      : 'Ext.panel.Panel',
        title       : 'Checkout Motor Parts Admin Panel',
        renderTo    : Ext.get('container'),
        id          : 'panel-main',
        layout      : 'column',
        iconCls     : 'default-icon',

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

        border  : false,
        tbar    : { 
            border:false, 
            items: menu_bar 
        },

        initComponent : function() {
            this.superclass.initComponent.call(this);

            //refreshAllGrid()
        },

        listeners : {
            
        }
    });
})();