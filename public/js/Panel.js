(function(){

    Ext.namespace('Checkup.Windows');
    var token;
    Checkup.Windows.openedWindows = [];

    function menuHandler(btn)
    {

        var btnId = btn.id;
        var btnIdArr = btnId.split('-');

        btnIdArr[btnIdArr.length - 1] = btnIdArr[btnIdArr.length - 1] + '.Window.' + btnIdArr[btnIdArr.length - 1];

        var windowPath = btnIdArr.join('.');


        if(Checkup.Windows.openedWindows.indexOf('Checkup.' + windowPath) ==-1)
        {
            Checkup.Windows.openedWindows.push('Checkup.' + windowPath);

            var win = Ext.create('Checkup.' + windowPath);
            win.show();
        }
    }

    var menu_bar = [
        {
            xtype   : 'button',
            text    : 'File',
            menu    : {
                items   : [
                    {
                        text    : 'Logout',
                        handler : logout
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
                                    text    : 'Users',
                                    id      : 'Administration-Users',
                                    handler : menuHandler
                                }, {
                                    text    : 'Setup',
                                    menu    : {
                                        items   : [
                                            {
                                                text    : 'Warehouse'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }, {
                        text    : 'Sales',
                        menu    : {
                            items   : [
                                {
                                    text    : 'A/R Invoice'
                                }, {
                                    text    : 'Sales Return'
                                }
                            ]
                        }
                    }, {
                        text    : 'Purchasing',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Puchase Order'
                                }, {
                                    text    : 'Goods Receipt PO'
                                }
                            ]
                        }
                    }, {
                        text    : 'Business Partners',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Business Partners'
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
                                    text    : 'Inventory Transactions',
                                    menu    : {
                                        items   : [
                                            {
                                                text : 'Goods Return'
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
            text    : 'Windows'/*,
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
            }*/
        }
    ];

    function logout()
    {
        msg = Ext.Msg.wait('Logging out');

        Ext.Ajax.request({ 
            url: 'application/index/logout', 
            params: { 
                token : token
            }, 
            success: function (resp, opt) {
                result = Ext.JSON.decode(resp.responseText);
                msg = Ext.Msg.wait('Redirecting');
                window.location = result.redirect;
            },
            failure : function(resp, opt)
            {
                result = Ext.JSON.decode(resp.responseText);
            }
        });
    }

    Ext.define('Checkup.Panel',
    {
        extend      : 'Ext.panel.Panel',
        title       : 'Checkout Motor Parts Admin Panel',
        renderTo    : Ext.get('container'),
        id          : 'panel-main',
        layout      : 'column',
        iconCls     : 'default-icon',
        height      : Ext.getBody().getViewSize().height,


        border  : false,
        tbar    : { 
            border:false, 
            items: menu_bar 
        },

        initComponent : function() { 

            token = this.token;

            this.tools = [
                {
                    type: 'gear',
                    width: 'auto',
                    renderTpl: [
                        'Welcome Admin',
                        '&nbsp;|&nbsp;<u>Logout</u>'
                    ],
                    handler: logout
                }
            ];
            this.superclass.initComponent.call(this);
        },

        listeners : {
            
        }
    });
})();