(function(){
	Ext.namespace('Checkup.Windows');

	Ext.define('Checkup.Administration.Users.Window.Users',
	{
		extend 		: 'Ext.window.Window',

		title 		: 'Users',
		id 			: 'window-users',

		renderTo 	: Ext.get('container'),
		layout 		: 'fit',

		resizable 	: false,
		//modal 		: true,
		minimizable	: true,
		maximizable : true,

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