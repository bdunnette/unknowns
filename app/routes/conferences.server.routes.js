'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var conferences = require('../../app/controllers/conferences');

	// Conferences Routes
	app.route('/conferences')
		.get(conferences.list)
		.post(users.requiresLogin, conferences.create);
	
	app.route('/conferences/:conferenceId')
		.get(conferences.read)
		.put(users.requiresLogin, conferences.hasAuthorization, conferences.update)
	    .delete(users.requiresLogin, conferences.hasAuthorization, conferences.delete);

	// Finish by binding the Conference middleware
	app.param('conferenceId', conferences.conferenceByID);
};