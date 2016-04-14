(function() {

    var NavMenuController = function($http, $location, auth, menu) {
        this.$http = $http;
        this.$location = $location;
        this.auth = auth;
        this.menu = menu;

        this.navMenuUrl = '/docmanager/nav_menu.html';
    };

    NavMenuController.prototype.onLoad = function() {
        if (this.auth.checkToken()) {
            if (this.auth.token.role === 'admin')
                this.menu.loadAdminMenu();
        }
    };

    NavMenuController.$inject = [ '$http', '$location', 'auth', 'menu' ];
    app.controller('NavMenuController', NavMenuController);

})();