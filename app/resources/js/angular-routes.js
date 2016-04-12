(function() {
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/Auth', {
                templateUrl: '/docmanager/views/authentication_view.html',
                controller: 'AuthenticationViewController'
            }).otherwise({
                redirectTo: '/Auth'
            });
        }]);
})();