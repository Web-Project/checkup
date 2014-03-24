(function(){

    Ext.namespace('Checkup.Windows');
    var token;
    Checkup.Windows.openedWindows = [];

    function menuHandler(btn)
    {

        var btnId = btn.id;
        var btnIdArr = btnId.split('-');

        btnIdArr[btnIdArr.length - 1] = btnIdArr[btnIdArr.length - 1] + '.Form.' + btnIdArr[btnIdArr.length - 1];

        var windowPath = btnIdArr.join('.');


        /*if(Checkup.Windows.openedWindows.indexOf('Checkup.' + windowPath) ==-1)
        {
            Checkup.Windows.openedWindows.push('Checkup.' + windowPath);*/

            Ext.get('panel-main-body').update('');
            console.log(windowPath);
            var win = Ext.create('Checkup.' + windowPath, {
                renderTo     : 'panel-main-body',
                style       : 'margin: auto; top:20px;',
                id          : btn.id + '-panel',
                frame       : false,
            });
            //win.show();
        /*}*/
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
                                                text    : 'Warehouse',
                                                id      : 'Administration-Setup-Warehouse',
                                                handler : menuHandler
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
                                    text    : 'A/R Invoice',
                                    id      : 'Sales-ARInvoice',
                                    handler : menuHandler
                                }, {
                                    text    : 'Sales Return',
                                    id      : 'Sales-Return',
                                    handler : menuHandler
                                }
                            ]
                        }
                    }, {
                        text    : 'Purchasing',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Puchase Order',
                                    id      : 'Purchasing-PurchaseOrder',
                                    handler : menuHandler
                                }, {
                                    text    : 'Goods Receipt PO',
                                    id      : 'Purchasing-GRPO',
                                    handler : menuHandler
                                }
                            ]
                        }
                    }, {
                        text    : 'Business Partners',
                        menu    : {
                            items   : [
                                {
                                    text    : 'Business Partners',
                                    id      : 'BusinessPartners-BusinessPartners',
                                    handler : menuHandler
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
        renderTo    : Ext.getBody(),
        id          : 'panel-main',
        layout      : 'fit',
        iconCls     : 'default-icon',
        height      : Ext.getBody().getViewSize().height,
        style       : 'overflow : hidden !important',


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

            this.items = [
                {
                    xtype   : 'panel',
                    border  : true,
                    id      : 'checkup-container'
                }
            ]
            this.superclass.initComponent.call(this);
        },

        listeners : {
            
        }
    });
})();