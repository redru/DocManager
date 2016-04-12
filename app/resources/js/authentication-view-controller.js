(function() {

    var AuthenticationViewController = function($http) {

    };

    /* ContoController.prototype.getUsers = function() {
        this.$http.get('/bank/getUsers')
            .then(function (response) {
            this.users = JSON.parse(response.data);
    }); */
    AuthenticationViewController.prototype.authenticate = function() {
        alert('Authenticate!');
    }

    // AngularJS, controller Class initialization
    AuthenticationViewController.$inject = [ '$http' ];
    app.controller('AuthenticationViewController', AuthenticationViewController);

})();