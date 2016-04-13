(function() {

    var NavMenuController = function($http, $location, token, menu) {
        this.$http = $http;
        this.$location = $location;

        this.navMenuUrl = '/docmanager/nav_menu.html';

        this.token = token.unpack(sessionStorage.getItem('Authorization'));
        if (this.token.role === 'admin')
            menu.loadAdminMenu();
    };

    NavMenuController.$inject = [ '$http', '$location', 'token', 'menu' ];
    app.controller('NavMenuController', NavMenuController);

})();