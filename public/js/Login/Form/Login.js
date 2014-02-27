(function(){

    var me;
    var submitUrl = 'application/index/login';

    Ext.define('Checkup.Login.Form.Login',
    {
        extend  : 'Ext.form.Panel',

        layout  : 'column',
        frame       : false,
        border      : false,

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
                        }
                    ]
                }
            ];

            this.superclass.initComponent.call(this);
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
                            waitMsg : 'Loggin in',
                            success : function(response, responseText) {

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

                }
            }
        ]
    });

})();