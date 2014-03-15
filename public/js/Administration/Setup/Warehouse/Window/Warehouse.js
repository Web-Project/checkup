(function(){
	Ext.namespace('Checkup.Windows');

	Ext.define('Checkup.Administration.Setup.Warehouse.Window.Warehouse',
	{
		extend 		: 'Ext.window.Window',

		title 		: 'Stores',
		id 			: 'window-warehouse',

		layout 		: 'fit',

		resizable 	: false,
		//modal 		: true,

		initComponent : function(){
			
			this.items = Ext.create('Checkup.Administration.Setup.Warehouse.Form.Warehouse');
			this.superclass.initComponent.call(this);
		}, 

		closeAction : 'destroy',

		listeners:{
			'close':function(win){
				Checkup.Windows.openedWindows.splice(Checkup.Windows.openedWindows.indexOf('Checkup.Administration.Setup.Warehouse.Window.Warehouse'),1);
			},
			scope : this

         }
	});

})();