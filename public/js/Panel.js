(function(){

    var token;

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