'use strict';

// Conferences controller
angular.module('conferences').controller('ConferencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Conferences', 'Slides',
    function($scope, $stateParams, $location, Authentication, Conferences, Slides) {
        $scope.authentication = Authentication;

        // Create new Conference
        $scope.create = function() {
        	// Create new Conference object
            var conference = new Conferences({
                name: this.name
            });

            // Redirect after save
            conference.$save(function(response) {
                $location.path('conferences/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Conference
        $scope.remove = function(conference) {
            if (conference) {
                conference.$remove();

                for (var i in $scope.conferences) {
                    if ($scope.conferences[i] === conference) {
                        $scope.conferences.splice(i, 1);
                    }
                }
            } else {
                $scope.conference.$remove(function() {
                    $location.path('conferences');
                });
            }
        };

        // Update existing Conference
        $scope.update = function() {
            var conference = $scope.conference;

            conference.$update(function() {
                $location.path('conferences/' + conference._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Conferences
        $scope.find = function() {
            $scope.conferences = Conferences.query();
        };

        // Find existing Conference
        $scope.findOne = function() {
            $scope.conference = Conferences.get({
                conferenceId: $stateParams.conferenceId
            });
          
            $scope.availableSlides = Slides.query();
        };
        
        $scope.addSlide = function (slide) {
          console.log(slide);
          $scope.conference.slides.push(slide._id);
        };
    }
]);