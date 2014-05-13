'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Slide = mongoose.model('Slide'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Slide already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Slide
 */
exports.create = function(req, res) {
	var slide = new Slide(req.body);
	slide.user = req.user;

	slide.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(slide);
		}
	});
};

/**
 * Show the current Slide
 */
exports.read = function(req, res) {
	res.jsonp(req.slide);
};

/**
 * Update a Slide
 */
exports.update = function(req, res) {
	var slide = req.slide;

	slide = _.extend(slide, req.body);

	slide.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(slide);
		}
	});
};

/**
 * Delete an Slide
 */
exports.delete = function(req, res) {
	var slide = req.slide;

	slide.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(slide);
		}
	});
};

/**
 * List of Slides
 */
exports.list = function(req, res) {
	Slide.find().sort('-created').populate('user', 'displayName').exec(function(err, slides) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(slides);
		}
	});
};

/**
 * Slide middleware
 */
exports.slideByID = function(req, res, next, id) {
	Slide.findById(id).populate('user', 'displayName').exec(function(err, slide) {
		if (err) return next(err);
		if (!slide) return next(new Error('Failed to load Slide ' + id));
		req.slide = slide;
		next();
	});
};

/**
 * Slide authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.slide.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};