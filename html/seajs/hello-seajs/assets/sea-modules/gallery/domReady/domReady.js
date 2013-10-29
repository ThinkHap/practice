define(function(){
    'use scrict';

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== 'undefined' && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](doc);
        }    
    }

    function callReady() {
        var callbacks = readyCalls;
        if(isPageLoaded) {
            //Call the Dom ready callbacks
            if(callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
     function pageLoaded() {
        if(!isPageLoaded) {
            isPageLoaded = true;
            if(scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }
            callReady();
        }
     }

     if(isBrowser) {
         if(document.addEventListener) {
            //standarts. Assumption here that if standards based,
            //if knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("DOMContentLoaded", pageLoaded, false);
        }else if(window.attachEvent) {
            window.attachEvent("onload", pageLoaded);   

            testDiv = document.createElement("div");
            try {
                isTop = window.frameElement === null;
            }catch(e) {
            }

            if(testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function(){
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch(e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and will 
        //fire the on DOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". 
        //There is still a window.onload binding that should get fired if 
        //DOMContentLoaded is missed.
        if(document.readyState === "complete") {
            pageLoaded();
        }
     }


     //START OF PUBLIC API
     //Registers a callback for DOM ready. If DOM is already ready, the 
     //callback is called immediately.
     // @param {Function} callback

     function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        }else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /*
     * Loader Plugin API method
     */
    domReady.load = function(name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        }else {
            domReady(onLoad);
        }
    }
    
    // END OF PUBLIC API
    return domReady;
});
