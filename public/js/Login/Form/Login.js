(function(){

    var me;
    var submitUrl = 'application/index/login';

    Ext.define('Checkup.Login.Form.Login',
    {
        extend  : 'Ext.form.Panel',

        layout  : 'column',
        frame       : false,
        width   : 300,
        border      : true,
        //renderTo    : Ext.getBody(),

        initComponent : function()
        {

            me = this;

            this.items = [
                {
                    xtype       : 'panel',
                    columnWidth : 1,
                    layout      : 'column',
                    padding     : 10,
                    frame       : false,
                    border      : false,

                    items       : [
                        {
                            xtype       : 'textfield',
                            columnWidth : 1,
                            fieldLabel  : 'Username',
                            id          : 'txt-username',
                            name        : 'username',
                            allowBlank  : false,
                            margin      : 5
                        }, {
                            xtype       : 'textfield',
                            columnWidth : 1,
                            inputType   : 'password',
                            fieldLabel  : 'Password',
                            id          : 'txt-password',
                            name        : 'password',
                            allowBlank  : false,
                            margin      : 5
                        }, {
                            xtype       : 'hiddenfield',
                            name        : 'token',
                            id          : 'csrf-token'
                        }
                    ]
                }
            ];

            this.superclass.initComponent.call(this);

            Ext.getCmp('csrf-token').setValue(this.token);
        },

        buttons     : [
            {
                text    : 'Login',
                handler : function()
                {
                    var form = me.getForm();

                    if(form.isValid())
                    {
                        form.submit({
                            url     : submitUrl,
                            waitMsg : 'Logging in',
                            success : function(response, responseText) {

                                msg = Ext.Msg.wait('Redirecting');
                                window.location = responseText.result.redirect;
                            },
                            failure : function(response, responseText) {
                                Ext.MessageBox.alert(
                                    'Failed',
                                    responseText.result.errorMessage,
                                    function(){
                                        me.getForm().reset();
                                    }
                                );
                            }
                        });
                    }
                }
            }, {
                text    : 'Cancel',
                handler : function() 
                {
                    me.getForm().reset();
                }
            }
        ]
    });

})();