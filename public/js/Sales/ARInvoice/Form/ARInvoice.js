(function(){
	var me, origUsername, finalUsername;
	var businessPartnerStoreUrl = 'application/BusinessPartner',
		salesInvoiceStoreUrl = 'application/SalesInvoice',
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

	var businessPartnerStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-businessPartnerStore',
		proxy	: { 
			url 			: businessPartnerStoreUrl,
			type 			: 'ajax',
			actionMethods 	: 'POST',
			reader 			: { 
				type 			:'json',
				root			: 'rows',
				totalProperty	: 'totalRecords'
			},

			simpleSortMode: true
		},
		
		autoLoad: true ,
	    fields: businessPartnerStoreFields
	});

	var salesInvoiceStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-salesInvoiceStore',
		proxy	: { 
			url 			: salesInvoiceStoreUrl,
			type 			: 'ajax',
			actionMethods 	: 'POST',
			reader 			: { 
				type 			:'json',
				root			: 'rows',
				totalProperty	: 'totalRecords'
			},

			simpleSortMode: true
		},
		
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

	Ext.define('Checkup.Sales.ARInvoice.Form.ARInvoice',
	{
		extend 		: 'Ext.form.Panel',


		layout 		: 'column',
		
		border 		: true,
		title 		: 'Sales - A/R Invoice',
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
						store 	: businessPartnerStore,
						columnWidth: 1,
						height 	: 420,
						width 	: 500,
						margin 	: '10 10 10 5',
						columns : [
							{text : 'Sales Invoice ID', 	dataIndex : 'docId',	flex : 1},
							{text : 'Customer Code', 	dataIndex : 'customerCode',	flex : 1},
							{text : 'Customer Name', 	dataIndex : 'customerName',	flex : 1},
							{text : 'Posting Date', 	dataIndex : 'postingDate',	flex : 1},
							{text : 'Remarks 1', 	dataIndex : 'remarks1',	flex : 1},
							{text : 'Remakrs 2', 	dataIndex : 'remarks2',	flex : 1},
							{text : 'Total Discount %', 	dataIndex : 'totalDscntInPrcnt',	flex : 1},
							{text : 'Total Discount Amt', 	dataIndex : 'totalDscntInAmt',	flex : 1},
							{text : 'Net Total', 	dataIndex : 'netTotal',	flex : 1},
							{text : 'Gross Total', 	dataIndex : 'grossTotal',	flex : 1}
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
				margin 	: '0 10 10 5',
				columns : [
					{text : 'Sales Invoice ID', 	dataIndex : 'docId',	flex : 1},
					{text : 'Customer Code', 	dataIndex : 'customerCode',	flex : 1},
					{text : 'Customer Name', 	dataIndex : 'customerName',	flex : 1},
					{text : 'Posting Date', 	dataIndex : 'postingDate',	flex : 1},
					{text : 'Remarks 1', 	dataIndex : 'remarks1',	flex : 1},
					{text : 'Remakrs 2', 	dataIndex : 'remarks2',	flex : 1},
					{text : 'Total Discount %', 	dataIndex : 'totalDscntInPrcnt',	flex : 1},
					{text : 'Total Discount Amt', 	dataIndex : 'totalDscntInAmt',	flex : 1},
					{text : 'Net Total', 	dataIndex : 'netTotal',	flex : 1},
					{text : 'Gross Total', 	dataIndex : 'grossTotal',	flex : 1}
				]
			}
			/*{
				xtype 	: 'grid',
				id 		: 'grid-users-list',
				width 	: 500,
				height 	: 275,
				padding : '10 5 10 10 ',
				store 	: usersStore,
				columns : [
					{ text : 'Username', dataIndex : 'username', flex : 1},
					{ text : 'Firstname', dataIndex : 'fName', flex : 1},
					{ text : 'Middle Name', dataIndex : 'midName', flex : 1},
					{ text : 'Last Name', dataIndex : 'lName', flex : 1},
					{ text : 'Email', dataIndex : 'email', flex : 1},
					{ text : 'Gender', dataIndex : 'gender', flex : 1}
				],
				listeners : {
					selectionchange : function(grid, selected, eOpts) {
						if(selected[0] != null && selected[0] != 'undefined')
						{
							populateFields(selected[0].raw);

							Ext.getCmp('txt-password').allowBlank = true;
							Ext.getCmp('btn-delete-users').enable();
						}
					}
				}
			}, {
				xtype 	: 'fieldset',
				title 	: 'User Information',
				width 	: 410,
				height 	: 265,
				margin : '0 10 10 5',
				layout 	: 'column',
				items 	: [
					{
						xtype 		: 'panel',
						columnWidth : 1,
						layout 		: 'column',
						border 		: false,
						items 		: [
							{
								xtype 		: 'panel',
								columnWidth : 1,
								border 		: false,
								defaultType : 'textfield',
								items 		: [
									{
										fieldLabel 	: 'Username',
										name 		: 'username',
										id 			: 'txt-username-users',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Password',
										name 		: 'password',
										id 			: 'txt-password',
										inputType 	: 'password',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Firstname',
										name 		: 'firstname',
										id 			: 'txt-firstname-users',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Middle Name',
										name 		: 'middlename',
										id 			: 'txt-middlename-users',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Last Name',
										name 		: 'lastname',
										id 			: 'txt-lastname-users',
										allowBlank 	: false
									}
								]
							}, {
								xtype 		: 'panel',
								layout 		: 'vbox',
								width 		: 130,
								height 		: 130,
								margin 		: '0 0 0 10',
								border 		: false,
								items 		: [
									{
										xtype 		: 'image',
										width 		: 130,
										height 		: 98,
										style 		: 'border : 1px solid #CCC',
										id 			: 'img-user-picture',
										src 		: 'http://www.sencha.com/img/20110215-feat-html5.png'
									}, {
										xtype 		: 'filefield',
										width 		: 130,
										margin 		: '10 0 0 0',
										id 			: 'img-photo',
										name 		: 'img-photo',
										emptyText 	: 'Select Photo',
										buttonText 	: 'Upload',
										listeners 	: {

                                        	'change' 	: function(obj, value, opts) {

                                        		handleFileSelect('img-photo', 'img-user-picture');
                                        	}
                                        }
									}
								]
							}
						]
					}, {
						xtype 		: 'panel',
						columnWidth : 1,
						border 		: false,
						layout 		: 'column',
						defaultType : 'textfield',
						items 		: [
							{
								xtype 		: 'hidden',
								name 		: 'user_id',
								id 			: 'user_id'
							}, {
								fieldLabel 	: 'Email',
								name 		: 'email',
								id 			: 'txt-email-users',
								vtype 		: 'email',
								columnWidth : 1
							}, {
								fieldLabel 	: 'Address',
								name 		: 'address',
								id 			: 'txt-address-users',
								columnWidth : 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Gender',
								name 		: 'gender',
								id 			: 'cbo-gender-users',
							    store 		: genderStore,
							    queryMode 	: 'local',
							    displayField: 'code',
							    valueField 	: 'code',
							    forceSelection : false,
							    triggerAction : 'all',
							    margin 		: '5 0 0 0',
							    allowBlank 	: false
							}, {
								xtype 		: 'checkbox',
								boxLabel 	: 'Deactivate',
								name 		: 'deactivate',
								id 			: 'chk-deactivate-users',
								margin 		: '5 0 0 25'
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Role',
								name 		: 'role',
								id 			: 'cbo-role-users',
							    store 		: roleStore,
							    queryMode 	: 'local',
							    displayField: 'type',
							    valueField 	: 'id',
							    forceSelection : false,
							    triggerAction : 'all',
							    margin 		: '5 0 5 0',
							    allowBlank 	: false
							}
						]
					}
				]
			}*/
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