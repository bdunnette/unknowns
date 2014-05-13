'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var slides = require('../../app/controllers/slides');

	// Slides Routes
	app.route('/slides')
		.get(slides.list)
		.post(users.requiresLogin, slides.create);
	
	app.route('/slides/:slideId')
		.get(slides.read)
		.put(users.requiresLogin, slides.hasAuthorization, slides.update)
	    .delete(users.requiresLogin, slides.hasAuthorization, slides.delete);

	// Finish by binding the Slide middleware
	app.param('slideId', slides.slideByID);
};