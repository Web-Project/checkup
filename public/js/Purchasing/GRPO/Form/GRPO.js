(function(){
	var me, origUsername, finalUsername;
	var businessPartnerStoreUrl = 'application/BusinessPartner/getBusinessPartnersByType',
		grpoStoreUrl = 'application/GRPO',
		grpoItemsStoreUrl = 'application/GRPOItem/getGRPOItemsByDocId',
		submit_url = 'application/user/saveUser',
		deleteUrl = 'application/user/deleteUser',
		reportGRPOUrl = 'application/GRPO/printGRPO',
		docId;


	var businessPartnerStoreFields = [
		'code', 'BPName'
	];

	var grpoStoreFields = [
		'id', 'docId', 'vendorCode', 'vendorName',
		'postingDate', 'remarks1', 'remarks2',
		'totalPrcntDscnt', 'totalAmtDscnt', 'netTotal',
		'grossTotal'
	];

	var grpoItemStoreFields = [
		'docId', 'indx', 'itemCode', 'description',
		'warehouse', 'vatable', 'realBsNetPrchsPrc',
		'realBsGrossPrchsPrc', 'realNetPrchsPrc',
		'realGrossPrchsPrc', 'qty', 'baseUoM',
		'qtyPrPrchsUoM', 'prcntDscnt', 'amtDscnt',
		'netPrchsPrc', 'grossPrchsPrc', 'rowNetTotal',
		'rowGrossTotal'
	];

	var businessPartnerStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-businessPartnerStore',
		proxy	: proxy(businessPartnerStoreUrl, { type : '0' }),
		autoLoad: true ,
	    fields: businessPartnerStoreFields
	});

	var grpoStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-grpoStore',
		proxy	: proxy(grpoStoreUrl, {}),
		autoLoad: true ,
	    fields: grpoStoreFields
	});

	var grpoItemsStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-grpoItemsStore',
		proxy	: proxy(grpoItemsStoreUrl, {}),
		autoLoad: false ,
	    fields: grpoItemStoreFields
	});

	function getCurrentDate()
	{
		var date = new Date();
		var day = date.getDate();
		var year = date.getFullYear();
		var month = date.getMonth() + 1

		return year + '-' + month + '-' + day;
	}

	function populateFields(data)
	{
		docId = data.docId;

		Ext.getCmp('txt-grpoId-grpo').setValue(data.docId);
		Ext.getCmp('txt-postingDate-grpo').setValue(data.postingDate);
		Ext.getCmp('cbo-vendorCode-grpo').setValue(data.vendorCode);
		Ext.getCmp('cbo-vendorName-grpo').setValue(data.vendorName);
		Ext.getCmp('txtarea-remarks1-grpo').setValue(data.remarks1);
		Ext.getCmp('txtarea-remarks2-grpo').setValue(data.remarks2);
		Ext.getCmp('txt-totalDscntInPrcnt-grpo').setValue(data.totalPrcntDscnt);
		Ext.getCmp('txt-totalDscntInAmt-grpo').setValue(data.totalAmtDscnt);
		Ext.getCmp('txt-netTotal-grpo').setValue(data.netTotal);
		Ext.getCmp('txt-grossTotal-grpo').setValue(data.grossTotal);

		grpoItemsStore.load({params : { docId : data.docId}});
	}

	Ext.define('Checkup.Purchasing.GRPO.Form.GRPO',
	{
		extend 		: 'Ext.form.Panel',


		layout 		: 'column',
		
		border 		: true,
		title 		: 'Good Receipt Purchase Order',
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
						title 	: 'GRPO Information',
						width 	: 420,
						height 	: 426,
						layout 	: 'column',
						margin 	: '3 5 0 10',
						items 	: [
							{
								xtype 		: 'textfield',
								fieldLabel 	: 'GRPO #',
								readOnly 	: true,
								name 		: 'purchaseOrderId',
								id 			: 'txt-grpoId-grpo',
								columnWidth	: 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Posting Date',
								readOnly 	: true,
								name 		: 'postingDate',
								id 			: 'txt-postingDate-grpo',
								columnWidth	: 1,
								margin 		: '5 0 0 0',
								value 		: getCurrentDate()
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Vendor Code',
								columnWidth : 1,
								name 		: 'vendorCode',
								id 			: 'cbo-vendorCode-grpo',
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
								fieldLabel 	: 'Vendor Name',
								columnWidth : 1,
								name 		: 'vendorName',
								id 			: 'cbo-vendorName-grpo',
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
								id 			: 'txtarea-remarks1-grpo',
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textarea',
								fieldLabel 	: 'Remarks 2',
								columnWidth : 1,
								name 		: 'remarks2',
								id 			: 'txtarea-remarks2-grpo',
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Total Discount %',
								readOnly 	: true,
								name 		: 'totalDscntInPrcnt',
								id 			: 'txt-totalDscntInPrcnt-grpo',
								columnWidth	: 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Total Discount Amt',
								readOnly 	: true,
								name 		: 'totalDscntInAmt',
								id 			: 'txt-totalDscntInAmt-grpo',
								columnWidth	: 1
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Net Total',
								readOnly 	: true,
								name 		: 'netTotal',
								id 			: 'txt-netTotal-grpo',
								columnWidth	: 1
							}, {
								xtype 		: 'textfield',
								fieldLabel 	: 'Gross Total',
								readOnly 	: true,
								name 		: 'grossTotal',
								id 			: 'txt-grossTotal-grpo',
								columnWidth	: 1,
								margin 		: '5 0 10 0'
							}
						]
					}, {
						xtype 	: 'grid',
						id 		: 'grid-grpoList-grpo',
						store 	: grpoStore,
						columnWidth: 1,
						height 	: 420,
						margin 	: '10 10 10 5',
						columns : [
							{text : 'GRPO ID', 	dataIndex : 'docId',	width : 88},
							{text : 'Vendor Code', 	dataIndex : 'vendorCode',	width : 86},
							{text : 'Vendor Name', 	dataIndex : 'vendorName',	width : 159},
							{text : 'Posting Date', 	dataIndex : 'postingDate',	width : 98},
							{text : 'Remarks 1', 	dataIndex : 'remarks1',	width : 100},
							{text : 'Remakrs 2', 	dataIndex : 'remarks2',	width : 100},
							{text : 'Total Discount %', 	dataIndex : 'totalPrcntDscnt',	width : 96},
							{text : 'Total Discount Amt', 	dataIndex : 'totalAmtDscnt',	width : 102},
							{text : 'Net Total', 	dataIndex : 'netTotal',	width : 87},
							{text : 'Gross Total', 	dataIndex : 'grossTotal',	width : 87}
						],
						listeners : {
							selectionchange : function(grid, selected, eOpts) {
								if(selected[0] != null && selected[0] != 'undefined')
								{
									populateFields(selected[0].raw);

									Ext.getCmp('btn-delete-grpo').enable();
									Ext.getCmp('btn-print-grpo').enable();
								}
							}
						}
					}
				]
			}, {
				xtype 	: 'grid',
				title 	: 'Items',
				id 		: 'grid-grpoItems-grpo',
				store 	: grpoItemsStore,
				columnWidth: 1,
				height 	: 200,
				margin 	: '0 10 10 10',
				columns : [

					{text : 'Item Code', 	dataIndex : 'itemCode', width : 63},
					{text : 'Description', 	dataIndex : 'description',	width : 170},
					{text : 'Vatable', 	dataIndex : 'vatable',	width : 50},
					{text : 'Warehouse', 	dataIndex : 'warehouse',	width : 77},
					{text : 'Qty', 	dataIndex : 'qty',	width : 60},
					{text : 'Base UoM', 	dataIndex : 'baseUoM',	width : 55},
					{text : 'Qty/Prchs UoM', 	dataIndex : 'qtyPrPrchsUoM',	width : 83},
					{text : 'Real Base Net Purchase Price', 	dataIndex : 'realBsNetPrchsPrc',	width : 161},
					{text : 'Real Base Gross Purchase Price', 	dataIndex : 'realBsGrossPrchsPrc',	width : 161},
					{text : 'Real Net Purchase Price', 	dataIndex : 'realNetPrchsPrc',	width : 139},
					{text : 'Real Gross Purchase Price', 	dataIndex : 'realGrossPrchsPrc',	width : 139},
					{text : 'Net Pur. Price', 	dataIndex : 'netPrchsPrc',	width : 95},
					{text : 'Gross Pur. Price', 	dataIndex : 'grossPrchsPrc',	width : 95},
					{text : '% Discount', 	dataIndex : 'prcntDscnt',	width : 80},
					{text : 'Amt Discount', 	dataIndex : 'amtDscnt',	width : 77},
					{text : 'Row Net Total', 	dataIndex : 'rowNetTotal',	width : 90},	
					{text : 'Row Gross Total', 	dataIndex : 'rowGrossTotal',	width : 90}
					
				],
				tbar 	: [
					{
						xtype 	: 'button',
						text 	: 'Add Item',
						id 		: 'btn-add-item-grpo',
						disabled : true,
						handler	: function()
						{

						}
					}, {
						xtype 	: 'button',
						text 	: 'Delete Item',
						id 		: 'btn-delete-item-grpo',
						disabled: true,
						handler : function()
						{

						}
					}
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
				id 		: 'btn-delete-grpo',
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
				text 	: 'Print',
				id 		: 'btn-print-grpo',
				disabled: true,
				handler : function()
				{
					new Ext.Window({
                        height: Ext.getBody().getViewSize().height,
                        width: Ext.getBody().getViewSize().width - 20,
                        html : '<iframe style="width:100%;height:' + (Ext.getBody().getViewSize().height - 30) + 'px;" frameborder="0"  src="' + reportGRPOUrl + '?docId=' + docId + '"></iframe>',
                        modal: true
                    }).show();
				}
			}
		]

	});

})();