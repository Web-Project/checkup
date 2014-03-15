(function(){
	var me, origUsername, finalUsername;
	var url = 'application/user/getUsers',
		submit_url = 'application/user/saveUser',
		deleteUrl = 'application/user/deleteUser';
	var userFields = [
		'user_id', 'username', 'password', 'fName',
		'midName', 'lName', 'email', 'address',
		'gender', 'picLocation', 'deactivated',
		'role'
	];

	var genderStore = Ext.create('Ext.data.Store', {
	    fields: ['code'],
	    data : [
	        {"code":"M"},
	        {"code":"F"}
	    ]
	});

	var roleStore = Ext.create('Ext.data.Store', {
	    fields: ['id', 'type'],
	    data : [
	        {'id' : "0", "type":"Superuser"},
	        {'id' : "1", "type":"User"}
	    ]
	});

	var usersStore = Ext.create('Ext.data.Store',
	{
		id 		: 'store-users',
		proxy	: { 
			url 			: url,
			type 			: 'ajax',
			extraParams  	: {m: "GetAllAppointmentTypes"},
			actionMethods 	: 'POST',
			reader 			: { 
				type 			:'json',
				root			: 'rows',
				totalProperty	: 'totalRecords'
			},

			simpleSortMode: true
		},
		
		autoLoad: true ,
	    fields: userFields
	});

	function populateFields(data)
	{
		Ext.getCmp('user_id').setValue(data.user_id);
		Ext.getCmp('txt-username').setValue(data.username);
		Ext.getCmp('txt-firstname').setValue(data.fName);
		Ext.getCmp('txt-middlename').setValue(data.midName);
		Ext.getCmp('txt-lastname').setValue(data.lName);
		Ext.getCmp('txt-email').setValue(data.email);
		Ext.getCmp('txt-address').setValue(data.address);
		Ext.getCmp('cbo-gender').setValue(data.gender);
		Ext.getCmp('cbo-role').setValue(data.role);
		Ext.getCmp('img-photo').setSrc(data.picLocation);

		if(data.deactivated == 'Y')
		{
			Ext.getCmp('chk-deactivate').setValue(true);
		}

		origUsername = data.username;
	}

	Ext.define('Checkup.Administration.Users.Form.Users',
	{
		extend 		: 'Ext.form.Panel',


		layout 		: 'column',
		frame 		: false,
		border 		: false,

		defaultType : 'textfield',

		initComponent : function(){
			me = this;

			this.superclass.initComponent.call(this);
		},

		items 		: [
			{
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
							Ext.getCmp('btn-delete').enable();
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
										id 			: 'txt-username',
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
										id 			: 'txt-firstname',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Middle Name',
										name 		: 'middlename',
										id 			: 'txt-middlename',
										allowBlank 	: false
									}, {
										fieldLabel 	: 'Last Name',
										name 		: 'lastname',
										id 			: 'txt-lastname',
										allowBlank 	: false
									}
								]
							}, {
								xtype 		: 'image',
								id 			: 'img-photo',
								width 		: 130,
								height 		: 130,
								margin 		: '0 0 0 10',
								style 		: 'border : 1px solid #CCC',
								src 		: 'http://www.sencha.com/img/20110215-feat-html5.png'
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
								id 			: 'txt-email',
								vtype 		: 'email',
								columnWidth : 1
							}, {
								fieldLabel 	: 'Address',
								name 		: 'address',
								id 			: 'txt-address',
								columnWidth : 1,
								margin 		: '5 0 0 0'
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Gender',
								name 		: 'gender',
								id 			: 'cbo-gender',
							    store 		: genderStore,
							    queryMode 	: 'local',
							    displayField: 'code',
							    valueField 	: 'code',
							    forceSelection : false,
							    triggerAction : 'all',
							    margin 		: '5 0 0 0'
							}, {
								xtype 		: 'checkbox',
								boxLabel 	: 'Deactivate',
								name 		: 'deactivate',
								id 			: 'chk-deactivate',
								margin 		: '5 0 0 25'
							}, {
								xtype 		: 'combo',
								fieldLabel 	: 'Role',
								name 		: 'role',
								id 			: 'cbo-role',
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
			}
		],

		buttons 	: [
			{
				text 	: 'New',
				handler : function()
				{
					me.getForm().reset();
					Ext.getCmp('txt-password').allowBlank = false;
					Ext.getCmp('btn-delete').disable();
				}
			}, {
				text 	: 'Save',
				handler : function()
				{
					var form = me.getForm(),
						usernameEdit = 0;

					finalUsername = Ext.getCmp('txt-username').getValue();

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
                                msg = Ext.Msg.alert('Success', 'User successfully added/updated', function() { 
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

						Ext.getCmp('btn-delete').disable();
                    }
				}
			}, {
				text 	: 'Delete',
				id 		: 'btn-delete',
				disabled: true,
				handler : function()
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
										Ext.Msg.alert('Success', 'Record deleted successfully',  function() { 
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

								Ext.getCmp('btn-delete').disable();
							}
						});
					}
					else
					{
						Ext.Msg.alert('Delete', 'Please select a row to delete');
					}
				}
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