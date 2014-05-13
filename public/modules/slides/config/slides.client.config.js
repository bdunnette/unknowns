'use strict';

// Configuring the Articles module
angular.module('slides').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Slides', 'slides');
		Menus.addMenuItem('topbar', 'New Slide', 'slides/create');
	}
]);