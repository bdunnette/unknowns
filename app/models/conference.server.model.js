'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Conference Schema
 */
var ConferenceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Conference name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    slides: [{
        type: Schema.ObjectId,
        ref: 'Slide'
    }]
});

mongoose.model('Conference', ConferenceSchema);