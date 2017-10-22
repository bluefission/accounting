function TableNameInfoController() {
	this.IDENTIFIER = "TableNameInfoController";
	this.DOCUMENT = "table-name-info-template.html";
	this.ViewModel = null;
	this.Route = {}; // set to blank object, will be the currently edited object
	var self = this;

	System.Guid.cctor(); // Instatiate GUID object to make comparisons
}

TableNameInfoController.prototype.onReady = function() {
	if (!this.Route.object_id) {
		this.Route.object_id = 0;
	}

	// Naming Conventions
	// Text field variable names begin with "txt". Ex: this.txtFieldName
	// Checkbox field variable names begin with "chk". Ex: this.chkFieldName
	// Select field variable names begin with "sel". Ex: this.selFieldName
	// Table area variable names begin with "tbl". Ex: this.tblItemList
	// Table row variable names begin with "row". Ex: this.rowItemData
	// Form variable names begin with "frm". Ex: this.frmEditData
	// Button variable names begin with "btn". Ex: this.btnSave
	
	// Assign variables
	this.txtFieldName = $('#field_name');
	this.btnSave = $('#save-btn');
	this.btnNewObject1 = $('#new-foreign-table-name-btn');
	this.btnNewObject2 = $('#new-foreign-table-2-name-btn');
	this.btnNewObject3 = $('#new-foreign-table-3-name-btn');
	this.tblList1 = new DashboardDatatable('#foreign-table-name-list');
	this.tblList2 = new DashboardDatatable('#foreign-table-name-2-list');
	this.tblList3 = new DashboardDatatable('#foreign-table-name-3-list');

	// Assign interactions	
    this.tblList1.form = $('#foreign-table-name-edit');
	this.tblList1.bindRow = this.OnLoadPreference.bind(this);
	this.tblList1.bindForm = this.OnClickPreference;
	this.tblList1.process = this.OnPreferenceSave;
    this.tblList1.tryDelete = this.DeletePreference;

	this.tblList2.form = $('#foreign-table-name-2-edit');
	this.tblList2.bindRow = this.OnLoadMember.bind(this);
	this.tblList2.bindForm = this.OnClickMember;
	this.tblList2.process = this.OnMemberSave;
    this.tblList2.tryDelete = this.DeleteMember;

	this.tblList3.form = $('#foreign-table-name-3-edit');
	this.tblList3.bindRow = this.OnLoadPet.bind(this);
	this.tblList3.bindForm = this.OnClickPet;
	this.tblList3.process = this.OnPetSave;
    this.tblList3.tryDelete = this.DeletePet;

    this.btnSave.click(this.OnSaveClick.bind(this));

    //Load Data
    this.ViewModel = new TableNameViewModel(this);
	this.ViewModel.Start();

    this.ViewModel.LoadData();

	this.ViewModel.GetForeignTableData1Async();
	this.ViewModel.GetForeignTableData2Async();
	this.ViewModel.GetForeignTableData3Async();
};

TableNameInfoController.prototype.BindData = function( ) {

	this.txtFieldName.val(this.Route.name);
	
	this.tblList1.load(this.ViewModel.CurrentSubObjectList1);
	this.tblList2.load(this.ViewModel.CurrentSubObjectList2);
	this.tblList3.load(this.ViewModel.CurrentSubObjectList3);

	this.ReadySubForm1();
	this.ReadySubForm2();
	this.ReadySubForm3();
};

TableNameInfoController.prototype.OnLoadPreference = function(row, object) {
	// row.find('.item-id').text(object.family_member_id);
	
	row.find('.number').text(object.value_int);
	row.find('.text').text(object.value_string);
	row.find('.extra').text(object.value_extra);

	AccountingApp.Get(endpoint, object.family_preference_type_id, function(data) {
		var item = data.responseJSON.item;
		row.find('.type').text(item.name);
	});
	AccountingApp.Get(endpoint, object.family_preference_category_id, function(data) {
		var item = data.responseJSON.item;
		row.find('.category').text(item.name);
	});
};

TableNameInfoController.prototype.OnLoadMember = function(row, object) {
	var account_id = object.account_id;

	// row.find('.item-id').text(object.family_member_id);
	AccountingApp.Get(endpoint, object.account_id, function(data) {
		var account = data.responseJSON.item;
		row.find('.name').text(account.first_name);
	});
	row.find('.type').text(object.type_name);
	row.find('.address').text(object.location);
	
};

TableNameInfoController.prototype.OnLoadPet = function(row, object) {
	// row.find('.item-id').val(object.pet_id);
	row.find('.name').text(object.name);
	row.find('.breed_primary').text(object.breed_primary_friendly_name);
	row.find('.species').text(object.species_primary == 1 ? "Cat" : "Dog");
	row.find('.gender').text(object.gender == 1 ? "Female" : "Male");
	row.find('.weight_lbs').text(object.weight_lbs);
	row.find('.height_inches').text(object.weight_inches);
	row.find('.ideal_weight_range').text(object.ideal_weight_lbs_min +"-"+ object.ideal_weight_lbs_max);
	row.find('.recommended_food_calories').text(object.recommended_calories_from_food);
	row.find('.bcs').text(object.body_score +" ("+object.body_score_name+")");
	row.find('.activity_level').text(object.activity_score +" ("+object.activity_score_name+")");
	row.find('.fixed').text(object.is_fixed ? "Yes" : "No");

	var birthdate = new Date(object.birthdate);
	var today = new Date();
	var months;
    months = (today.getFullYear() - birthdate.getFullYear()) * 12;
    months -= birthdate.getMonth();
    months += today.getMonth();
    var span = months <= 0 ? 0 : months;
    if(span%12 > 0)
    {
        row.find('.age').text(String.Format("{0:D}{1} {2:D}{3}", [span/12, this.ViewModel.Text_YearsShort, span%12, this.ViewModel.Text_MonthsShort]));
    }
    else
    {
        row.find('.age').text(String.Format("{0:D} {1}", [span/12, this.ViewModel.Text_YearsLong]));
    }
};



TableNameInfoController.prototype.OnClickPreference = function() {
	AccountingApp.Get(endpoint, object.family_preference_type_id, function(data) {
		var item = data.responseJSON.items;
		row.find('.type').text(item.name);

		this._newForm.find('.type').val(object.family_preference_type_id);
	});
	AccountingApp.Get(endpoint, object.family_preference_category_id, function(data) {
		var item = data.responseJSON.items;
		row.find('.category').text(item.name);

    	this._newForm.find('.category').val(object.family_preference_category_id);
	});
	this._newForm.find('.number').val(object.value_int);
	this._newForm.find('.text').val(object.value_string);
	this._newForm.find('.extra').val(object.value_extra);
};



TableNameInfoController.prototype.OnClickMember = function() {
};

TableNameInfoController.prototype.OnClickPet = function() {
	console.log(this.current);
	var object = this.current;
	this._newForm.find('.name').val(object.name);
	this._newForm.find('.weight_lbs').val(object.weight_lbs);
	this._newForm.find('.height_inches').val(object.height_inches);
	this._newForm.find('.birthdate').val(object.birthdate);
	this._newForm.find('.activity_score').val(object.activity_score);
	this._newForm.find('.body_score').val(object.body_score);
	this._newForm.find('.breed_id_primary').val(object.breed_id_primary);
	this._newForm.find('.breed_id_secondary').val(object.breed_id_secondary);
	this._newForm.find('.gender').val(object.gender);
	this._newForm.find('.is_fixed').val(object.is_fixed);
	this._newForm.find('.species_id').val(object.species_id);
};

TableNameInfoController.prototype.OnSaveClick = function() {
	if ( System.Guid.Empty.Equals(this.Route.family_id) ) {
		this.Route.family_id = null;
		AccountingApp.Create(endpoint, item);
	} else {
		AccountingApp.Update(endpoint, item);
	}

	SiteController.ShowToast('Saved');
	return false;
};

TableNameInfoController.prototype.ReadySubForm3 = function() {

	var species = {};
	var $species_field = this.tblList3.form.find('.species_id');
	$species_field.empty();
	for (var i = 0; i < this.ViewModel.Types.length; i++) {
		species = this.ViewModel.Types[i];
		$species_field.append('<option value="'+species.id+'">'+species.name+'</option>');
	} 

	var breed = {};
	var $breed_field_primary = this.tblList3.form.find('.breed_id_primary');
	var $breed_field_secondary = this.tblList3.form.find('.breed_id_secondary');
	$breed_field_primary.empty();

	$breed_field_secondary.empty();
	var breeds = this.ViewModel.BreedsDogs;
	for (var i = 0; i < breeds.length; i++) {
		breed = breeds[i];
		$breed_field_primary.append('<option value="'+breed.id+'">'+breed.name+'</option>');
		$breed_field_secondary.append('<option value="'+breed.id+'">'+breed.name+'</option>');
	}
	var gender = {};
	var $gender_field = this.tblList3.form.find('.gender');
	$gender_field.empty();
	for (var i = 0; i < this.ViewModel.Genders.length; i++) {
		gender = this.ViewModel.Genders[i];
		$gender_field.append('<option value="'+gender.id+'">'+gender.name+'</option>');
	}

	var fixed = {};
	var $fixed_field = this.tblList3.form.find('.is_fixed');
	$fixed_field.empty();
	for (var i = 0; i < this.ViewModel.FixedStatuses.length; i++) {
		fixed = this.ViewModel.FixedStatuses[i];
		$fixed_field.append('<option value="'+fixed.id+'">'+fixed.name+'</option>');
	}

	var bcs = {};
	var $bcs_field = this.tblList3.form.find('.body_score');
	$bcs_field.empty();
	var bodyTypes = this.ViewModel.BodyTypesDogs;
	for (var i = 0; i < bodyTypes.length; i++) {
		bcs = bodyTypes[i];
		$bcs_field.append('<option value="'+bcs.number+'">'+bcs.name+'</option>');
	}

	var activity = {};
	var $activity_field = this.tblList3.form.find('.activity_score');
	$activity_field.empty();
	var activityLevels = this.ViewModel.ActivityLevels;
	for (var i = 0; i < activityLevels.length; i++) {
		activity = activityLevels[i];
		$activity_field.append('<option value="'+activity.id+'">'+activity.name+'</option>');
	}

};

TableNameInfoController.prototype.ReadySubForm1 = function() {
	var type = {};
	var $type_field = this.tblList1.form.find('.type');
	$type_field.empty();
	for (var i = 0; i < this.ViewModel.PreferenceTypes.length; i++) {
		type = this.ViewModel.PreferenceTypes[i];
		$type_field.append('<option value="'+type.family_preference_type_id+'">'+type.name+'</option>');
	} 
	var category = {};
	var $category_field = this.tblList1.form.find('.category');
	$category_field.empty();
	for (var i = 0; i < this.ViewModel.PreferenceCategories.length; i++) {
		category = this.ViewModel.PreferenceCategories[i];
		$category_field.append('<option value="'+category.family_preference_category_id+'">'+category.name+'</option>');
	} 
};

TableNameInfoController.prototype.ReadySubForm2 = function() {
	var type = {};
	var $type_field = this.tblList2.form.find('.type');
	$type_field.empty();
	for (var i = 0; i < this.ViewModel.MemberTypes.length; i++) {
		type = this.ViewModel.MemberTypes[i];
		$type_field.append('<option value="'+type.member_type_id+'">'+type.name+'</option>');
	} 
	var state = {};
	var $state_field = this.tblList2.form.find('.state_id');
	$state_field.empty();
	for (var i = 0; i < this.ViewModel.States.length; i++) {
		state = this.ViewModel.States[i];
		$state_field.append('<option value="'+state.state_id+'">'+state.name_long+'</option>');
	} 
	var country = {};
	var $country_field = this.tblList2.form.find('.country_id');
	$country_field.empty();
	for (var i = 0; i < this.ViewModel.Countries.length; i++) {
		country = this.ViewModel.Countries[i];
		$country_field.append('<option value="'+country.country_id+'">'+country.name+'</option>');
	} 
};