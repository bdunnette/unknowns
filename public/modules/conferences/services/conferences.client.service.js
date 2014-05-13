'use strict';

//Conferences service used to communicate Conferences REST endpoints
angular.module('conferences').factory('Conferences', ['$resource', function($resource) {
    return $resource('conferences/:conferenceId', {
        conferenceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);