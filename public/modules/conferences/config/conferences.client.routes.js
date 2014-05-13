'use strict';

//Setting up route
angular.module('conferences').config(['$stateProvider',
	function($stateProvider) {
		// Conferences state routing
		$stateProvider.
		state('listConferences', {
			url: '/conferences',
			templateUrl: 'modules/conferences/views/list-conferences.client.view.html'
		}).
		state('createConference', {
			url: '/conferences/create',
			templateUrl: 'modules/conferences/views/create-conference.client.view.html'
		}).
		state('viewConference', {
			url: '/conferences/:conferenceId',
			templateUrl: 'modules/conferences/views/view-conference.client.view.html'
		}).
		state('editConference', {
			url: '/conferences/:conferenceId/edit',
			templateUrl: 'modules/conferences/views/edit-conference.client.view.html'
		});
	}
]);