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
    };

    var TokenService = function() {
        return {
            unpack: function(token) {
                return JSON.parse(atob(token.split('.')[1])); // split token -> get payload -> decode Base64 -> parse JSON
            }
        }
    };

    var MenuService = function() {
        return {
            loadAdminMenu: function () {
                debugger;
                $('#navMenu').addClass('ready');
                alert('Admin menu load...');
            }
        }
    };

    // Angular initialization
    app = angular.module('docmanager', ['ngRoute']);

    app.factory('authInterceptor', AuthInterceptor)
        .factory('token', TokenService)
        .factory('menu', MenuService)
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