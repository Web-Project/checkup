(function(){
	var me, origUsername, finalUsername;
	var businessPartnerStoreUrl = 'application/BusinessPartner',
		salesInvoiceStoreUrl = 'application/SalesInvoice',
		salesInvoiceItemsStoreUrl = 'application/SalesInvoiceItem',
		submit_url = 'application/user/saveUser',
		deleteUrl = 'application/user/deleteUser';


	var businessPartnerStoreFields = [
		'code', 'BPName'
	];

	var salesInvoiceStoreFields = [
		'id', 'docId', 'customerCode', 'customerName',
		'postingDate', 'remarks1', 'remarks2', 
		'totalDscntInPrcnt', 'totalDscntInAmt',
		'netTotal', 'grossTotal'
	];

	var salesInvoiceItemStoreFields = [
		'docId', 'indx', 'itemCode', 'description',
		'vatable', 'saleUoM', 'qtyPrSaleUoM',
		'netPrchsPrice', 'grossPrchsPrice', 'realNetSalePrice',
		'realGrossSalePrice', 'qty', 'prcntDscnt', 'amtDscnt',
		'netSalePrice','grossSalePrice', 'rowNetTotal', 'rowGrossTotal'
	];

	var businessPartnerStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-businessPartnerStore',
		proxy	: proxy(businessPartnerStoreUrl, {}),
		autoLoad: true ,
	    fields: businessPartnerStoreFields
	});

	var salesInvoiceStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-salesInvoiceStore',
		proxy	: proxy(salesInvoiceStoreUrl, {}),
		autoLoad: true ,
	    fields: salesInvoiceStoreFields
	});

	function getCurrentDate()
	{
		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var month = date.getMonth() + 1

		return year + '-' + month + '-' + day;
	}

	/*function populateFields(data)
	{
		Ext.getCmp('user_id').setValue(data.user_id);
		Ext.getCmp('txt-username-users').setValue(data.username);
		Ext.getCmp('txt-firstname-users').setValue(data.fName);
		Ext.getCmp('txt-middlename-users').setValue(data.midName);
		Ext.getCmp('txt-lastname-users').setValue(data.lName);
		Ext.getCmp('txt-email-users').setValue(data.email);
		Ext.getCmp('txt-address-users').setValue(data.address);
		Ext.getCmp('cbo-gender-users').setValue(data.gender);
		Ext.getCmp('cbo-role-users').setValue(data.role);

		if(data.picLocation)
		{
			Ext.getCmp('img-user-picture').setSrc( '/img/userPic/' + data.picLocation);
		}
		else
		{
			Ext.getCmp('img-user-picture').setSrc( '');
		}

		if(data.deactivated == 'Y')
		{
			Ext.getCmp('chk-deactivate-users').setValue(true);
		}
		else
		{
			Ext.getCmp('chk-deactivate-users').setValue(false);
		}

		origUsername = data.username;
	}*/

	Ext.define('Checkup.Purchasing.PurchaseOrder.Form.PurchaseOrder',
	{
		extend 		: 'Ext.form.Panel',


		layout 		: 'column',
		
		border 		: true,
		title 		: 'Purchasing - Purchase Order',
		//style 		: 'top : 0px !important',
		width 		: '90%',

		defaultType : 'textfield',

		initComponent : function(){
			me = this;

			this.superclass.initComponent.call(this);
		},

		items 		: [
			{
				xtype 	: 'panel',
				columnWidth : 1,
				layout 	: 'column',
				border  : false,
				items 	: [
					{
						xtype 	: 'fieldset',
						title 	: 'Sales Invoice Information',
						width 	: 420,
						height 	: 426,
						layout 	: 'column',
						margin 	: '3 5 0 10',
						items 	: [
							{
								xtype 		: 'textfield',
								fieldLabel 	: 'Sales Invoice #',
								readOnly 	: true,
								name 		: 'salesInvoidId',
								id 			: 'txt-salesInvoiceId-salesInvoice',
								columnWidth	: 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Posting Date',
								readOnly 	: true,
								name 		: 'postingDate',
								id 			: 'txt-postingDate-salesInvoice',
								columnWidth	: 1,
								margin 		: '5 0 0 0',
								value 		: getCurrentDate()
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Customer Code',
								columnWidth : 1,
								name 		: 'customerCode',
								id 			: 'cbo-customerCode-salesInvoice',
								queryMode 	: 'local',
								triggerAction: 'all',
								forceSelection:false,
								displayField: 'code',
								valueField 	: 'code',
								columnWidth	: 1,
								store 		: businessPartnerStore,
								margin 		: '5 0 0 0',
								allowBlank 	: false
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Customer Name',
								columnWidth : 1,
								name 		: 'customerName',
								id 			: 'cbo-customerName-salesInvoice',
								queryMode 	: 'local',
								triggerAction: 'all',
								forceSelection:false,
								displayField: 'BPName',
								valueField 	: 'code',
								columnWidth	: 1,
								store 		: businessPartnerStore,
								margin 		: '5 0 0 0',
								allowBlank 	: false
							}, {
								xtype 		: 'textarea',
								fieldLabel 	: 'Remarks 1',
								columnWidth : 1,
								name 		: 'remarks1',
								id 			: 'txtarea-remarks1-salesInvoice',
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textarea',
								fieldLabel 	: 'Remarks 2',
								columnWidth : 1,
								name 		: 'remarks2',
								id 			: 'txtarea-remarks2-salesInvoice',
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Total Discount %',
								readOnly 	: true,
								name 		: 'totalDscntInPrcnt',
								id 			: 'txt-totalDscntInPrcnt-salesInvoice',
								columnWidth	: 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Total Discount Amt',
								readOnly 	: true,
								name 		: 'totalDscntInAmt',
								id 			: 'txt-totalDscntInAmt-salesInvoice',
								columnWidth	: 1
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Net Total',
								readOnly 	: true,
								name 		: 'netTotal',
								id 			: 'txt-netTotal-salesInvoice',
								columnWidth	: 1
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Gross Total',
								readOnly 	: true,
								name 		: 'grossTotal',
								id 			: 'txt-grossTotal-salesInvoice',
								columnWidth	: 1,
								margin 		: '5 0 10 0'
							}
						]
					}, {
						xtype 	: 'grid',
						id 		: 'grid-salesInvoiceList-salesInvoice',
						store 	: salesInvoiceStore,
						columnWidth: 1,
						height 	: 420,
						margin 	: '10 10 10 5',
						columns : [
							{text : 'Sales Invoice ID', 	dataIndex : 'docId',	width : 88},
							{text : 'Customer Code', 	dataIndex : 'customerCode',	width : 86},
							{text : 'Customer Name', 	dataIndex : 'customerName',	width : 159},
							{text : 'Posting Date', 	dataIndex : 'postingDate',	width : 98},
							{text : 'Remarks 1', 	dataIndex : 'remarks1',	width : 100},
							{text : 'Remakrs 2', 	dataIndex : 'remarks2',	width : 100},
							{text : 'Total Discount %', 	dataIndex : 'totalDscntInPrcnt',	width : 96},
							{text : 'Total Discount Amt', 	dataIndex : 'totalDscntInAmt',	width : 102},
							{text : 'Net Total', 	dataIndex : 'netTotal',	width : 87},
							{text : 'Gross Total', 	dataIndex : 'grossTotal',	width : 87}
						]
					}
				]
			}, {
				xtype 	: 'grid',
				title 	: 'Items',
				id 		: 'grid-salesInvoiceItems-salesInvoice',
				store 	: businessPartnerStore,
				columnWidth: 1,
				height 	: 200,
				margin 	: '0 10 10 10',
				columns : [

					{text : 'Item Code', 	dataIndex : 'itemCode', width : 63},
					{text : 'Description', 	dataIndex : 'description',	width : 170},
					{text : 'Vatable', 	dataIndex : 'vatable',	width : 50},
					{text : 'Net Pur. Price', 	dataIndex : 'netPrchsPrice',	width : 95},
					{text : 'Gross Pur. Price1', 	dataIndex : 'grossPrchsPrice',	width : 95},
					{text : 'Sale UoM', 	dataIndex : 'saleUoM',	width : 55},
					{text : 'Qty/Sale UoM', 	dataIndex : 'qtyPrSaleUoM',	width : 77},
					{text : 'Real Base Net Sale Price', 	dataIndex : 'realNetSalePrice',	width : 139},
					{text : 'Real Base Gross Sale Price', 	dataIndex : 'realGrossSalePrice',	width : 139},
					{text : 'Qty', 	dataIndex : 'qty',	width : 60},
					{text : '% Discount', 	dataIndex : 'prcntDscnt',	width : 80},
					{text : 'Amt Discount', 	dataIndex : 'amtDscnt',	width : 77},
					{text : 'Net Sale Price', 	dataIndex : 'netSalePrice',	width : 90},
					{text : 'Gross Sale Price', 	dataIndex : 'grossSalePrice',	width : 90},
					{text : 'Row Net Total', 	dataIndex : 'rowNetTotal',	width : 90},	
					{text : 'Row Gross Total', 	dataIndex : 'rowGrossTotal',	width : 90}
				]
			}
		],

		buttons 	: [
			{
				text 	: 'New',
				/*handler : function()
				{
					me.getForm().reset();
					Ext.getCmp('txt-password').allowBlank = false;
					Ext.getCmp('btn-delete-users').disable();
				}*/
			}, {
				text 	: 'Save',
				/*handler : function()
				{
					var form = me.getForm(),
						usernameEdit = 0;

					finalUsername = Ext.getCmp('txt-username-users').getValue();

					if(origUsername != finalUsername)
					{
						usernameEdit = 1;
					}

                    if(form.isValid())
                    {
                        form.submit({
                            url     : submit_url,
                            waitMsg : 'Saving data...',
                            params 	: {
                            	usernameEdit : usernameEdit
                            },
                            success : function(response, responseText) {
                                msg = Ext.Msg.alert('Success',  responseText.result.message, function() { 
                                	usersStore.load();
                                	me.getForm().reset(); 
                                	finalUsername = "";
                                	origUsername = "";
                                	Ext.getCmp('grid-users-list').getSelectionModel().deselectAll();
                               	});
                            },
                            failure : function(response, responseText) {
                                Ext.MessageBox.alert(
                                    'Failed',
                                    responseText.result.errorMessage
                                );
                            }
                        });

						Ext.getCmp('img-user-picture').setSrc('');
						Ext.getCmp('btn-delete-users').disable();
                    }
				}*/
			}, {
				text 	: 'Delete',
				id 		: 'btn-delete-salesInvoice',
				disabled: true,
				/*handler : function()
				{
					var grid = Ext.getCmp('grid-users-list');
					var selectionModel = grid.getSelectionModel();

					if(selectionModel.hasSelection())
					{
						var selection = selectionModel.getSelection();
						var record = selection[0];

						Ext.Msg.confirm('Delete', 'Are you sure you want to delete this record?', function(btn){
							if(btn == 'yes')
							{
								Ext.Ajax.request({
									url  : deleteUrl,
									method : 'POST',
									params : {
										user_id : record.raw.user_id
									},
									success : function(response, opt)
									{
										result = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Success', result.message,  function() { 
		                                	usersStore.load();
		                                	me.getForm().reset(); 
		                                	finalUsername = "";
		                                	origUsername = "";
		                                	Ext.getCmp('grid-users-list').getSelectionModel().deselectAll();
		                               	});
									},
									failure : function(response, opt)
									{
										result = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Failed', result.errorMessage);
									}
								});

								Ext.getCmp('btn-delete-users').disable();
								Ext.getCmp('img-user-picture').setSrc('');
							}
						});
					}
					else
					{
						Ext.Msg.alert('Delete', 'Please select a row to delete');
					}
				}*/
			}, {
				text 	: 'Close',
				handler : function()
				{
					me.getForm().reset();
					me.up('window').close();
				}
			}
		]

	});

})();