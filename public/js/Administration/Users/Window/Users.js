(function(){
	Ext.namespace('Checkup.Windows');

	Ext.define('Checkup.Administration.Users.Window.Users',
	{
		extend 		: 'Ext.window.Window',

		title 		: 'Users',
		id 			: 'window-users',

		layout 		: 'fit',

		resizable 	: false,

		initComponent : function(){
			
			this.items = Ext.create('Checkup.Administration.Users.Form.Users');
			this.superclass.initComponent.call(this);
		}, 

		closeAction : 'destroy',

		listeners:{
			'close':function(win){
				Checkup.Windows.openedWindows.splice(Checkup.Windows.openedWindows.indexOf('Checkup.Administration.Users.Window.Users'),1);
			},
			scope : this

         }
	});

})();