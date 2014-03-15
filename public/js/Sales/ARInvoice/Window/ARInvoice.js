(function(){
	Ext.namespace('Checkup.Windows');

	Ext.define('Checkup.Sales.ARInvoice.Window.ARInvoice',
	{
		extend 		: 'Ext.window.Window',

		title 		: 'Sales A/R Invoice',
		id 			: 'window-arinvoice',

		
		style 		: 'top : 0px !important',
		layout 		: 'fit',

		resizable 	: false,
		width 		: '80%',
		//modal 		: true,

		initComponent : function(){
			
			this.items = Ext.create('Checkup.Sales.ARInvoice.Form.ARInvoice');
			this.superclass.initComponent.call(this);
		}, 

		closeAction : 'destroy',

		listeners:{
			'close':function(win){
				Checkup.Windows.openedWindows.splice(Checkup.Windows.openedWindows.indexOf('Checkup.Sales.ARInvoice.Window.ARInvoice'),1);
			},
			scope : this

         }
	});

})();