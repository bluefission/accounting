var _culture;

var CACHE_FILENAME_APP_PREFS = "app_prefs";
var CACHE_FILENAME_APP_CONFIG = "app_config";
var CACHE_FILENAME_USER_CACHE = "usercache";

CacheHost = {
    CachedUserSet: function(userdata) {
        console.log('setting cache');
        // $.cookie(CACHE_FILENAME_USER_CACHE, JSON.stringify(userdata), { expires: 30, path: '/' });
        DashboardStorage.set(CACHE_FILENAME_USER_CACHE, userdata);
        DashboardStorage.save();
    },
    CachedUserGet: function() {
        try {
            return DashboardStorage.get(CACHE_FILENAME_USER_CACHE);
            // return JSON.parse($.cookie(CACHE_FILENAME_USER_CACHE));
        } catch (ex) {
            return null;
        }
    },
    CachedUserClear: function() {
        console.log("clearing user cache");
        DashboardStorage.set(CACHE_FILENAME_USER_CACHE, null);
        DashboardStorage.save();
    },
    PersistentDataSet: function(secure, name, data) {
        $.cookie(name, JSON.stringify(data), { expires: 1, path: '/' });
    },
    PersistentDataGet: function(secure, name) {
        try {
            return JSON.parse($.cookie(name));
        } catch (ex) {
            return null;
        }
    },
    PersistentDataClear: function(name) {
        $.removeCookie(name, { path: '/' });
    },
    CachedDataSet: function(secure, name, data) {
        $.cookie(name, JSON.stringify(data), { expires: 1, path: '/' });
    },
    CachedDataGet: function(secure, name) {
        try {
            return JSON.parse($.cookie(name));
        } catch (ex) {
            return null;
        }
    },
    CachedDataClear: function(name) {
        $.removeCookie(name, { path: '/' });
    },
};
DataCache = {
    init: function() {
        this.CacheHost = CacheHost;
        this.CachedData = DashboardStorage;
        this.CachedData.load();
    },
    Filters: [],
    Clear: function() {
        CachedData.clear();
    },
    ClearWithPrefix: function( prefix ) {},
    ContainsKey: function( key ) {
        return CachedData.get(key) ? true : false;
    },
    AddToCache: function( key, object ) {
        CachedData.set(key, object);
        CachedData.save();
    },
    RemoveFromCache: function(key) {
        CachedData.set(key, null);
    },
    TryGetFromCache: function ( key, value ) {
        return CachedData.get(key, value);
    },
    InvalidateTimedPrefix: function(cachePrefix) {
    },
    /// <summary>
    /// Returns true if data was retrieved
    /// </summary>
    /// <param name="onRefreshed">true if updated, false if from cache</param>
    // WithRefreshAsync: function(token, key, allowStaleData, forceRefresh, onRefreshed, onRefreshing, createMethod) {
    WithRefreshAsync: function(key, allowStaleData, forceRefresh, onRefreshed, onRefreshing, createMethod) {
            // return this.DataCache.WithTimedRefreshForPrefixAsync(allowStale, cacheSpecificKey, staleLimit, onFetched, onFetching, function ()
            // return this.DataCache.WithTimedRefreshForPrefixAsync(allowStale, cacheSpecificKey, staleLimit, onFetched, onFetching, function ()

        var data = this.CachedData.get(key);
        var aging = this.CachedData.get('_data_ages');
        // if ( data ) {
        //     return data;
        // }
        // use old data if we can
        forceRefresh = null;
        if (allowStaleData && data)
        {
            foundData = data;
            if (foundData == null)
            {
                forceRefresh = true; //had it, but it was bad data
            }
        }
        // see if we need to refresh
        if (!forceRefresh)
        {
            var date1 = aging[key].start;
            var date2 = new Date();
            if (date1.getTime()+aging[key].end > date2.getTime()) {
                // alert("The first date is after the second date!");
                forceRefresh = true;
            }
        }

        if (foundData != null)
        {
            if (onRefreshed != null)
            {
                try
                {
                    onRefreshed(token, false, foundData); // its not fresh
                }
                catch (ex)
                {
                    SiteController.LogError(ex, "onRefreshed:old");
                }
            }
        }

        // get the data if we need to
        if (foundData == null || forceRefresh || !this.CachedData.get(key))
        {
            // single request at a time
            // lock (_ExecutingLock)
            // {
            //     if (this.Executing.Contains(key))
            //     {
            //         return false;
            //     }
            //     this.Executing.Add(key);
            // }
            try
            {
                if (onRefreshing != null)
                {
                    try
                    {
                        onRefreshing(true);
                    }
                    catch (ex)
                    {
                        SiteController.LogError(ex, "onRefreshing:true");
                    }
                }
                data = null;
                if (createMethod != null)
                {
                    data = createMethod();
                }

                if (data != null)
                {
                    this.AddToCache(key, data);


                    if (onRefreshed != null)
                    {
                        try
                        {
                            onRefreshed(token, true, data);
                        }
                        catch (ex)
                        {
                            SiteController.LogError(ex, "onRefreshed:new");
                        }
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            finally
            {
                if (onRefreshing != null)
                {
                    try
                    {
                        onRefreshing(false);
                    }
                    catch (ex)
                    {
                        this.LogError(ex, "onRefreshing:false");
                    }
                }
            }
        }
        else
        {
            if (onRefreshing != null)
            {
                try
                {
                    onRefreshing(false);
                }
                catch (ex)
                {
                    SiteController.LogError(ex, "onRefreshing:false");
                }
            }
            return false;
        }
    }
};