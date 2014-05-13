'use strict';

(function() {
	// Conferences Controller Spec
	describe('Conferences Controller Tests', function() {
		// Initialize global variables
		var ConferencesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Conferences controller.
			ConferencesController = $controller('ConferencesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Conference object fetched from XHR', inject(function(Conferences) {
			// Create sample Conference using the Conferences service
			var sampleConference = new Conferences({
				name: 'New Conference'
			});

			// Create a sample Conferences array that includes the new Conference
			var sampleConferences = [sampleConference];

			// Set GET response
			$httpBackend.expectGET('conferences').respond(sampleConferences);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.conferences).toEqualData(sampleConferences);
		}));

		it('$scope.findOne() should create an array with one Conference object fetched from XHR using a conferenceId URL parameter', inject(function(Conferences) {
			// Define a sample Conference object
			var sampleConference = new Conferences({
				name: 'New Conference'
			});

			// Set the URL parameter
			$stateParams.conferenceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/conferences\/([0-9a-fA-F]{24})$/).respond(sampleConference);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.conference).toEqualData(sampleConference);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Conferences) {
			// Create a sample Conference object
			var sampleConferencePostData = new Conferences({
				name: 'New Conference'
			});

			// Create a sample Conference response
			var sampleConferenceResponse = new Conferences({
				_id: '525cf20451979dea2c000001',
				name: 'New Conference'
			});

			// Fixture mock form input values
			scope.name = 'New Conference';

			// Set POST response
			$httpBackend.expectPOST('conferences', sampleConferencePostData).respond(sampleConferenceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Conference was created
			expect($location.path()).toBe('/conferences/' + sampleConferenceResponse._id);
		}));

		it('$scope.update() should update a valid Conference', inject(function(Conferences) {
			// Define a sample Conference put data
			var sampleConferencePutData = new Conferences({
				_id: '525cf20451979dea2c000001',
				name: 'New Conference'
			});

			// Mock Conference in scope
			scope.conference = sampleConferencePutData;

			// Set PUT response
			$httpBackend.expectPUT(/conferences\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/conferences/' + sampleConferencePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid conferenceId and remove the Conference from the scope', inject(function(Conferences) {
			// Create new Conference object
			var sampleConference = new Conferences({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Conferences array and include the Conference
			scope.conferences = [sampleConference];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/conferences\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConference);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.conferences.length).toBe(0);
		}));
	});
}());