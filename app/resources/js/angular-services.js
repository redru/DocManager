(function() {

    var AuthInterceptor = function($q, $location) {
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
                    $location.url('/Auth');

                return $q.reject(rejection);
            }
        }
    };

    var AuthService = function() {
        return {
            token: { },
            checkToken: function() {
                var authorization = sessionStorage.getItem('Authorization');
                return this.token = authorization ? JSON.parse(atob(authorization.split('.')[1])) : undefined;
            }
        }
    };

    var MenuService = function() {
        return {
            loadAdminMenu: function () {
                $('#navMenu').removeClass('hidden');
            }
        }
    };

    app.factory('authInterceptor', [ '$q', '$location', AuthInterceptor ])
        .factory('auth', AuthService)
        .factory('menu', MenuService)
        .config(['$httpProvider',
            function($httpProvider) {
                $httpProvider.interceptors.push('authInterceptor');
            }
        ]);

})();