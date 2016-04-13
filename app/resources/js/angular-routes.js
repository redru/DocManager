(function() {
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/Auth', {
                templateUrl: '/docmanager/views/authentication_view.html',
                controller: 'AuthenticationViewController',
                reloadOnSearch: false
            }).when('/Home', {
                templateUrl: '/docmanager/views/home_view.html',
                controller: 'AuthenticationViewController',
                reloadOnSearch: false
            }).otherwise({
                redirectTo: '/Auth'
            });
        }]);
})();
