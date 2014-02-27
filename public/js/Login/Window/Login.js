(function(){

    Ext.define('Checkup.Login.Window.Login',
    {
        extend  : 'Ext.window.Window',

        title   : 'Checkup Motor Parts Admin Panel Login',
        renderTo: Ext.getBody(),

        width   : 300,

        initComponent : function() {

            this.items = Ext.create('Checkup.Login.Form.Login');

            this.superclass.initComponent.call(this);
        },

        closable    : false,
        layout      : 'fit',
        resizable   : true,
        border      : false,
        modal       : true,
        resizable   : false,
        draggable   : false
    });

})();