AsyncCallbackQueue = { success: [], failure: [], processing: [], complete: [] }; // ONLY USE COMPLETE NOW!

SDKBridge = {};

// executeAsync: Required

SDKBridge.executeAsync = function (baseUrl, resourceUrl, method, body, parameters, headers, contentType) {
    var data = null;
    if (body) {

        if (method.toLowerCase() != 'get') {
            body._token = $('[name="_token"]').val();
        }
        data = JSON.stringify(body)
    } else {
        data = SDKBridge.mapKeyValue(parameters);
    }

    contentType = contentType || "application/json";

    callback = AsyncCallbackQueue.complete.length > 0 ? AsyncCallbackQueue.complete.pop() : null;
    // callback2 = AsyncCallbackQueue.success.length > 0 ? AsyncCallbackQueue.success.pop() : null;
    // callback3 = AsyncCallbackQueue.failure.length > 0 ? AsyncCallbackQueue.failure.pop() : null;

    var $defer = $.ajax({
        type: method,
        complete: callback,
        async: callback === null ? false : true, // deprecated, but replicates "await"
        url: baseUrl + "/" + resourceUrl,
        processData: (body == null),
        contentType: contentType,
        data: data,
        dataType: 'json',
        beforeSend: function( xhr ) {
            if (headers) {
                for (var i = 0; i < headers.storage.length; i++) {
                    if ( headers.storage[i].key && headers.storage[i].value) {
                        // result[headers.storage[i].key] = headers.storage[i].value;
                        xhr.setRequestHeader(headers.storage[i].key, headers.storage[i].value);
                    }
                }
            }
        }
    });


    return $defer;
};

// generateMD5Hash: Required

SDKBridge.generateMD5Hash = function (content) {
    return md5(content);
};
// getTimeStamp: Required

SDKBridge.getTimeStamp = function () {
    return Math.floor(new Date().getTime() / 1000);
};

//mapKeyValue: Internal

SDKBridge.mapKeyValue = function (keyValuePairs) {
    var result = {};
    // var result = [];
    if (keyValuePairs) {
        for (var i = 0; i < keyValuePairs.storage.length; i++) {
            result[keyValuePairs.storage[i].key] = keyValuePairs.storage[i].value;
        }
    }
    return result;
};