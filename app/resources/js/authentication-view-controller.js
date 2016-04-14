(function() {

    var AuthenticationViewController = function($http, $location, auth, menu) {
        this.$http = $http;
        this.$location = $location;
        this.menu = menu;
    };
    
    AuthenticationViewController.prototype.authenticate = function() {
        $('#auth_error_message').fadeOut('fast');
        var $location = this.$location;
        var menu = this.menu;

        this.$http({
            method: 'POST',
            data: { username: this.username, password: this.password },
            url: '/docmanager/authenticate'
        }).then(function successCallback(response) {
            $location.url('/Home');
            menu.loadAdminMenu();
        }, function errorCallback(response) {
            $('#auth_error_message').fadeIn('slow');
        });
    };

    // AngularJS, controller Class initialization
    AuthenticationViewController.$inject = [ '$http', '$location', 'auth', 'menu' ];
    app.controller('AuthenticationViewController', AuthenticationViewController);

})();