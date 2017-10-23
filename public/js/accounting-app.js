var AccountingApp = {
    
    CurrentCulture: _culture,
    ApiBaseUrl: "/api",
    CacheHost: CacheHost,
    DataCache: DataCache,
    ViewPlatform: SiteController,
    AppConfig: {},
    CurrentAccount: {},
    AppPreferences: { PreferredCulture: null, LastTranslationCheck: null },
    Badge: null,

    DeviceToken: "",

    ClientAnonymous: null,
    ClientAuthenticated: null,

    // App Methods
    Initialize: function() {
        // Check for dev environment
        if(window.location.href.indexOf("file://") > -1 || window.location.href.indexOf("bluefission") > -1) {
            this.ApiBaseUrl = "https://blue-acct.herokuapp.com";
        }
        this.AppPreferences = this.CacheHost.PersistentDataGet(false, CACHE_FILENAME_APP_PREFS);
        if (this.AppPreferences == null)
        {
            this.AppPreferences = { PreferredCulture: null, LastTranslationCheck: null };
        }
        this.AppConfig = this.CacheHost.PersistentDataGet(false, CACHE_FILENAME_APP_CONFIG);
        if (this.AppConfig == null)
        {
            this.AppConfig = {};
        }
        this.ApplyAppConfig();

        DashboardStorage.load();

        this.CurrentAccount = this.CacheHost.CachedUserGet();

        if ((this.CurrentAccount != null) && (this.CurrentAccount.account_id != System.Guid.Empty))
        {
            console.log('Logged in');

            this.VerifyCachedAccountAsync();
        } else {
            console.log("Not logged in");
            this.LogOff(true, true);
        }
        console.log(this.CurrentAccount);

        this.EnsureAppConfigDelayed();
    },
    RegisterAsyncSafe: function(info, onProcessing) {
        result = { success: false };
        var isOutdated = false;
        try
        {
            var registerResult = null;
            this.LogOff(false, false);

            registerResult = this.PostItemUnSafeAsync(onProcessing, function ()
            {
                client = this.GetSDK(false);
                return client.Auth.RegisterAsync(info);
            }.bind(this));

            registerResult = registerResult.responseJSON;
            if (registerResult.success)
            {
                result = registerResult;
            }
            else
            {
                result.success = false;
                result.meta = registerResult.meta;
                result.message = registerResult.message;
            }
        }
        catch (ex)
        {
            // ex = ex.FirstNonAggregateException();

            this.LogError(ex, "RegisterAsyncSafe");

            result.success = false;
            isOutdated = this.IsOutdated(ex);
            if (isOutdated)
            {
                this.Outdated(string.Empty);
            }
            result.message = ex;
            endpointException = ex
            if (endpointException != null)
            {
                result.meta = endpointException;
            }
        }
        if (result.success == true)
        {
            try {
                this.CacheHost.CachedUserClear();
                this.CacheHost.CachedUserSet(result.item);
                this.CurrentAccount = result.item;
                // this.UserCacheClear();

                prefs = { PreferredCulture: null, LastTranslationCheck: null };
                this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_APP_PREFS, prefs);
                this.AppPreferences = prefs;

                this.ViewPlatform.OnLoggedOn();
            } catch(ex) {
                this.LogError(ex);
            }
        }
        else
        {
            this.LogOff(!isOutdated, false);
            if (String.IsNullOrEmpty(result.message))
            {
                result.message = "Could not create account.";
            }
        }

        return result;
    },
    LoginAsyncSafe: function(info, onProcessing) {
        var result = { success: false };
        var isOutdated = false; // TODO: actually handle aggregate exceptions
        try
        {
            var loginResult = null;
            this.LogOff(false, false);
            
            AsyncCallbackQueue.complete.push( function(response) {
                if (response.status != 200)
                {
                    result.success = false;
                    result.meta = result.meta;
                    result.message = result.responseText;
                } else {
                    result = response.responseJSON;
                }
                if (result.success)
                {
                    console.log("Adding user to cache");
                    this.CacheHost.CachedUserSet(result.item);
                    this.CurrentAccount = result.item;
                    this.UserCacheClear(); // TODO: implement
                    var prefs = { PreferredCulture: null, LastTranslationCheck: null };
                    this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_APP_PREFS, prefs);
                    this.AppPreferences = prefs;
                    SiteController.HandleLogin(result);
                }
                else
                {
                    console.log("Something went wrong");
                    this.LogOff(!isOutdated, false);
                    if (String.IsNullOrEmpty(result.message))
                    {
                        result.success = false;
                        result.meta = null;
                        result.message = result.message || "Could not log in to your account.";
                    }
                    SiteController.HandleLogin(result);
                }
            }.bind(this));

            loginResult = this.PostItemUnSafeAsync(onProcessing, function()
            {
                client = this.GetSDK(false);
                return client.Auth.LoginAsync(info);
            }.bind(this));

            result = loginResult;
        }
        catch (ex)
        {
            // ex = ex.FirstNonAggregateException();

            this.LogError(ex, "LoginAsyncSafe");

            result.success = false;
            isOutdated = false;
            if (isOutdated)
            {
                this.Outdated(String.Empty);
            }
            result.message = ex.Message;
            endpointException = ex
            if (endpointException != null)
            {
                result.meta = ex
            }
        }

        return result;
    },
    LogOff: function(notifyViewPlatform, redirect) {
        this.ClientAnonymous = null;
        this.ClientAuthenticated = null;
        // SiteController.UnRegisterForPushNotifications();
        this.CacheHost.CachedUserClear();
        this.CacheHost.CachedDataClear();
        this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_APP_PREFS, {});
        this.AppPreferences = { PreferredCulture: null, LastTranslationCheck: null };
        // this.UserCacheClear(); // TODO: implement
        // this.DataCache.Clear(); // TODO: implement
        // this.DataCache.InvalidateTimedCache(); // TODO: implement
        this.CurrentAccount = null;
        if (notifyViewPlatform)
        {
            try
            {
                SiteController.OnLoggedOff();
            }
            catch (ex)
            {
                this.LogError(ex, "OnLoggedOff");
            }
        }
        if (redirect)
        {
            SiteController.NavigateToFirstScreen();
        }
    },
    OnAppActivated: function() {
        this.EnsureAppConfigDelayed();
        this.EnsureAppVersionDelayed();
        this.EnsureAccountStillValidDelayed();
    },
    PersistPushNotificationToken: function(deviceToken)
    {
       // Not Implemented
    },
    Outdated: function(reason) {
        this.ViewPlatform.OnOutDated(reason);
        this.LogOff(true, true);
    },
    ApplyAppPreferences: function( preferences) {
        if (preferences == null || typeof preferences == "undefined") {
            preferences = this.AppPreferences;
        }
        this.AppPreferences = preferences;
        this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_APP_PREFS, preferences);
    },
    InvalidateCacheForPrefix: function(prefix)
    {
            this.DataCache.InvalidateTimedPrefix(prefix);
    },
    RefreshAccountAsync: function() {
       
    },
    UserCacheGet: function(token)
    {
        var result = null;
        /*Dictionary<string, string>*/ userCache = this.CacheHost.PersistentDataGet(false, CACHE_FILENAME_USER_CACHE);
        if (userCache == null)
        {
            // userCache = new Dictionary<string, string>();
            userCache = new (System.Collections.Generic.Dictionary$2(String, String).ctor)()
        }

        if (userCache.TryGetValue(token, result) && !String.IsNullOrEmpty(result))
        {
            // return JsonConvert.DeserializeObject<T>(result);
            return JSON.parse(result);
        }
        else
        {
            return {};
        }
    },
    UserCacheSet: function(token, value)
    {
        /*Dictionary<string, string> */ userCache = this.CacheHost.PersistentDataGet(false, CACHE_FILENAME_USER_CACHE);
        if (userCache == null)
        {
            userCache = new (System.Collections.Generic.Dictionary$2(String, String).ctor)()
        }
        // userCache[token] = JsonConvert.SerializeObject(value);
        userCache.get_Item(token) = JSON.stringify(value);
        this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_USER_CACHE, userCache);
    },
    UserCacheClear: function()
    {
        this.CacheHost.PersistentDataSet(false, CACHE_FILENAME_USER_CACHE, String.Empty);

        // this.CacheHost.PersistentDataSet(false, _notificationResultCacheKey, String.Empty);
        // this.CacheHost.PersistentDataSet(false, _notificationInputCacheKey, String.Empty);
    },
    UpdatePreferredCulture: function(culture)
    {
        _culture = culture;
        this.AppPreferences.PreferredCulture = culture;
        this.ApplyAppPreferences();
        if (!String.IsNullOrEmpty(_culture))
        {
            
        }
    },
    GetLocalizedText: function(token, defaultText) {
        if (String.IsNullOrEmpty(_culture))
        {
            _culture = this.AppPreferences.PreferredCulture;
            if (String.IsNullOrEmpty(_culture))
            {
                // _culture = System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName;
                _culture = "en"; // This is really not the way to do this, but it will be localized post launch v2
                if (String.IsNullOrEmpty(_culture))
                {
                    _culture = "en";
                }
            }
        }

        //TODO:SHOULD:Localization: Get localized text from token based on _culture

        return defaultText;
    },

    /* Data access methods */

    /// Throws Errors.
    /// Executes a direct response method WITHOUT support for cached data or timeouts
    PostItemUnSafeAsync: function(onProcessing, postMethod) {
        try
        {
            if (onProcessing != null && typeof onProcessing === "function")
            {
                onProcessing(true);
            }
            return postMethod();
        }
        catch (ex)
        {
            this.ProcessExecuteException(ex, "PostItemUnSafeAsync");
            // ex = ex.FirstNonAggregateException();
            if (typeof ex == "EndpointException")
            {
                return {
                    success: false,
                    message: ex
                };
            }
            throw ex; // we dont catch here
        }
        finally
        {
            if (onProcessing != null && typeof onProcessing === "function")
            {
                onProcessing(false);
            }
        }
    },
    /// <summary>
    /// Fetches scalar data WITHOUT support for cached data or timeouts
    /// </summary>
    GetItemAsync(onFetched, onFetching, fetchMethod) {
        try
        {

            if (onFetching != null)
            {
                onFetching(true);
            }
            // TODO: MAKE SENSE OF THIS BELOW!
            result = fetchMethod();
            
            if (onFetched != null)
                AsyncCallbackQueue.complete.push(onFetched);

            return true;
        }
        catch (ex)
        {
            this.ProcessExecuteException(ex, "GetItemAsync");
            return false;
        }
        finally
        {
            if (onFetching != null)
            {
                onFetching(false);
            }
        }
    },
    /// <summary>
    /// Fetches list data WITHOUT support for cached data or timeouts
    /// </summary>
    GetListAsync: function(onFetched, onFetching, fetchMethod) {
        try
        {

            if (onFetching != null)
            {
                onFetching(true);
            }
            result = fetchMethod();
            // return result; // TODO: remove me!!!
            if (onFetched != null)
            {
                AsyncCallbackQueue.complete.push(onFetched);
                // onFetched(result);
            }
            return true;
        }
        catch (ex)
        {
            this.ProcessExecuteException(ex, "GetListAsync");
            return false;
        }
        finally
        {
            if (onFetching != null)
            {
                onFetching(false);
            }
        }
    },
    /// <summary>
    /// Fetches scalar data with support for cached data and timeouts
    /// </summary>
    FetchItemAsync(allowStale, cachePrefixKey, cacheSpecificKey, staleLimit, onFetched, onFetching, fetchMethod) {
        return fetchMethod(); // TODO: add all the caching stuff below back in

    },
    /// <summary>
    /// Fetches list data with support for cached data and timeouts
    /// </summary>
    FetchListAsync: function(requestToken, allowStale, cachePrefixKey, cacheSpecificKey, staleLimit, onFetched, onFetching, fetchMethod) {
        return fetchMethod(); // TODO: add all the caching stuff below back in

    },

    ProcessExecuteException: function(ex, methodName) {
        this.LogError(ex, methodName); // standard logging      

        // TODO: Duplicate this somehow later
        // if (IsUnauthorized(ex) && methodName != "VerifyCachedAccountAsync") //name should never match.. but...
        // {
        //     this.VerifyCachedAccountAsync(); // double check our credentials are still valid
        // }
    },
    ApplyAppConfig: function() {
        // Apply any forced changes here
    },
    VerifyCachedAccountAsync: function() {
        // NOTE: TEMPORARILY PASSING THIS THROUGH, VERIFICATION THROWS ERRORS!
        this.ViewPlatform.OnAccountRefreshed();
        return;

    },
    GetSDK: function( useCurrentUserInfo ) {
        result = null;

        return result;
    },
    EnsureAppConfigDelayed: function() {
        try
        {
            
        }
        catch (ex)
        {
            this.LogError(ex, "EnsureAppConfigDelayed");
        }
    },
    EnsureAppVersionDelayed: function() {
        try
        {
            
        }
        catch (ex)
        {
            this.LogError(ex, "EnsureAppVersionDelayed");
        }
    },
    EnsureAccountStillValidDelayed: function() {
        try
        {
            
        }
        catch (ex)
        {
            this.LogError(ex, "EnsureAccountStillValidDelayed");
        }
    },
    IsOutdated: function(ex) {
        // Not using aggregate exceptions
        return false;
    },
    IsForbidden: function(ex) {
        // Not using aggregate exceptions
        return false;
    },
    IsUnauthorized: function(ex) {
        // Not using aggregate exceptions
        return false;
    },
    ,
    LogError: function( ex, methodName ) {
        console.log( methodName+": "+ex ); // TODO: Make this actually log something later
    }
};