//Petrics app admin
var AccountingApp = AccountingApp || {};

// Dashboard Methods
// -------



// Order Methods
// -------

AccountingApp.OrdersFindAsync = function (order_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('orders', order_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.OrderUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('orders', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.OrderDeleteUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.DeleteAsync('orders', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.OrderCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('orders',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.OrdersGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('orders', skip, take);
    // result.success = onFetched;

    return result;
};




// OrderItem Methods
// -------

AccountingApp.OrderItemsFindAsync = function (order_item_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('order_items', order_item_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.OrderItemUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('order_items', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.OrderItemCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('order_items',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.OrderItemsGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('order_items', skip, take);
    // result.success = onFetched;

    return result;
};



// Expense Methods
// -------

AccountingApp.ExpensesFindAsync = function (expense_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('expenses', expense_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.ExpenseUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('expenses', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.ExpenseCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('expenses',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.ExpensesGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('expenses', skip, take);
    // result.success = onFetched;

    return result;
};



// Item Methods
// -------

AccountingApp.ItemsFindAsync = function (item_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('items', item_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.ItemUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('items', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.ItemCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('items',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.ItemsGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('items', skip, take);
    // result.success = onFetched;

    return result;
};




// Setting Methods
// -------

AccountingApp.SettingsFindAsync = function (setting_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('settings', setting_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.SettingUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('settings', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.SettingCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('settings',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.SettingsGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('settings', skip, take);
    // result.success = onFetched;

    return result;
};



// User Methods
// -------

AccountingApp.UsersFindAsync = function (user_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('users', user_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.UserUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('users', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.UserCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('users',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.UsersGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('users', skip, take);
    // result.success = onFetched;

    return result;
};




// Account Methods
// -------

AccountingApp.AccountsFindAsync = function (account_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('accounts', account_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.AccountUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('accounts', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.AccountCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('accounts',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.AccountsGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('accounts', skip, take);
    // result.success = onFetched;

    return result;
};



// LineItem Methods
// -------

AccountingApp.LineItemsFindAsync = function (line_item_id, onFetched) {

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.FindAsync('line_items', line_item_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.LineItemUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var result = this.UpdateAsync('line_items', item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.LineItemCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var result = this.PostAsync('line_items',item);
        if(result.success)
        {

        }
        return result;
    }.bind(this));
};

AccountingApp.LineItemsGetAsync = function(skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = 100;
    }

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = this.GetAsync('line_items', skip, take);
    // result.success = onFetched;

    return result;
};

