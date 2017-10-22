//Petrics app admin
var AccountingApp = AccountingApp || {};

// Dashboard Methods
// -------



// Account Methods
// -------
AccountingApp.AccountsInvalidateCache = function(account_id, suffix) {
    throw "NotImplemented";
};

AccountingApp.AccountGetAsync = function (account_id, onFetched) {

    sdk = this.GetSDK(true);

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = sdk.Account.GetAccountAsync(account_id);
    // result.success = onFetched;

    return result;
};

AccountingApp.AccountsFindAsync = function (keyword, onFetched) {

    sdk = this.GetSDK(true);

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = sdk.Account.Find(0, 200, keyword, "last_name.sort", false);
    // result.success = onFetched;

    return result;
};

AccountingApp.AccountUpdateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function ()
    {
        var sdk = this.GetSDK(true);
        var result = sdk.Account.UpdateAccountAsync(item.account_id, item);
        if(result.success)
        {
            // this.AccountsInvalidateCache(item.account_id);
        }
        return result;
    }.bind(this));
};

AccountingApp.AccountCreateUnSafe = function(item, onFetching) {
    return this.PostItemUnSafeAsync(onFetching, function()
    {
        var sdk = this.GetSDK(true);
        var result = sdk.Account.CreateAccountAsync(item);
        if(result.success)
        {
            // this.AccountsInvalidateCache(item.account_id);
        }
        return result;
    }.bind(this));
};

AccountingApp.AccountsGetAsync = function(requestToken, allowStale, force, skip, take, onFetched, onFetching) {
    if (skip === null) {
        skip = 0;
    }
    if (take === null) {
        take = this.AppConfig.Accounts.PageSize;
    }
    cachePrefix = "/accounts/";
    cacheKey = String.Format("?skip={0}&take={1}", skip, take);
    staleLimit = force ? 0 : 3600;

    if(typeof allowStale === undefined)
    {
        allowStale = staleLimit !== 0;
    }
    if(force)
    {
        this.AccountsInvalidateCache();
    }

    sdk = this.GetSDK(true);

    if (onFetched !== null)
        AsyncCallbackQueue.complete.push(onFetched);

    var result = sdk.Account.Find(skip, take, String.Empty, "last_name.sort", false);
    // result.success = onFetched;

    return result;

};
