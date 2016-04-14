(function() {

    var HomeViewController = function($http, $location, auth, menu) {
        this.$http = $http;
        this.$location = $location;
        this.auth = auth;
        this.menu = menu;
    };

    // AngularJS, controller Class initialization
    HomeViewController.$inject = [ '$http', '$location', 'auth', 'menu' ];
    app.controller('HomeViewController', HomeViewController);

})();