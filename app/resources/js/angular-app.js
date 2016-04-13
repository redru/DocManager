(function() {

    var AuthInterceptor = function() {
        return {
            request: function (config) {
                var auth = sessionStorage.getItem('Authorization');

                if (auth && auth !== 'undefined')
                    config.headers.Authorization = auth;

                return config;
            },

            response: function (res) {
                var headers = new res.headers();

                if (headers.authorization)
                    sessionStorage.setItem('Authorization', headers.authorization);

                return res;
            },

            responseError: function(rejection) {
                if (rejection.status === 401)
                    window.location.hash = '/Auth';

                return $q.reject(rejection);
            }
        }
    }

    // Angular initialization
    app = angular.module('docmanager', ['ngRoute']);

    app.factory('authInterceptor', AuthInterceptor)
        .config(['$httpProvider',
            function($httpProvider) {
                $httpProvider.interceptors.push('authInterceptor');
            }
        ]);

    /**
     * Window hashchange event
     */
    window.onhashchange = function() {
        document.title = 'Document Manager - ' + window.location.hash.substr(2);
    };

})();