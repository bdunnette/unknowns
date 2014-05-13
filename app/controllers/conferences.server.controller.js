'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Conference = mongoose.model('Conference'),
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
				message = 'Conference already exists';
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
 * Create a Conference
 */
exports.create = function(req, res) {
	var conference = new Conference(req.body);
	conference.user = req.user;

	conference.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(conference);
		}
	});
};

/**
 * Show the current Conference
 */
exports.read = function(req, res) {
	res.jsonp(req.conference);
};

/**
 * Update a Conference
 */
exports.update = function(req, res) {
	var conference = req.conference;

	conference = _.extend(conference, req.body);

	conference.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(conference);
		}
	});
};

/**
 * Delete an Conference
 */
exports.delete = function(req, res) {
	var conference = req.conference;

	conference.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(conference);
		}
	});
};

/**
 * List of Conferences
 */
exports.list = function(req, res) {
	Conference.find().sort('-created').populate('user', 'displayName').exec(function(err, conferences) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(conferences);
		}
	});
};

/**
 * Conference middleware
 */
exports.conferenceByID = function(req, res, next, id) {
	Conference.findById(id).populate('user', 'displayName').exec(function(err, conference) {
		if (err) return next(err);
		if (!conference) return next(new Error('Failed to load Conference ' + id));
		req.conference = conference;
		next();
	});
};

/**
 * Conference authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.conference.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};