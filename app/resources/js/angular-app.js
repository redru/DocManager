(function() {

    function authInterceptor(API, auth) {
        return {
            // automatically attach Authorization header
            request: function (config) {
                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                return res;
            }
        }
    }

    // Angular initialization
    app = angular.module('docmanager', ['ngRoute']);
    app.factory('authInterceptor', authInterceptor);

    /**
     * Window hashchange event
     */
    window.onhashchange = function() {
        document.title = 'Document Manager - ' + window.location.hash.substr(2);
    };

})();