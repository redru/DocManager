(function() {

    var AuthenticationViewController = function($http, $location) {
        this.$http = $http;
        this.$location = $location;
    };

    /* ContoController.prototype.getUsers = function() {
        this.$http.get('/bank/getUsers')
            .then(function (response) {
            this.users = JSON.parse(response.data);
    }); */
    
    AuthenticationViewController.prototype.authenticate = function() {
        $('#auth_error_message').fadeOut('fast');
        var $location = this.$location;

        this.$http({
            method: 'POST',
            data: { username: this.username, password: this.password },
            url: '/docmanager/authenticate'
        }).then(function successCallback(response) {
            $location.url('Home');
        }, function errorCallback(response) {
            $('#auth_error_message').fadeIn('slow');
        });
    };

    // AngularJS, controller Class initialization
    AuthenticationViewController.$inject = [ '$http', '$location' ];
    app.controller('AuthenticationViewController', AuthenticationViewController);

})();