(function() {

    // Angular initialization
    app = angular.module('docmanager', ['ngRoute']);

    /**
     * Window hashchange event
     */
    window.onhashchange = function() {
        document.title = 'Document Manager - ' + window.location.hash.substr(2);
    };

})();