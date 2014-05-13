'use strict';

// Configuring the Articles module
angular.module('conferences').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Conferences', 'conferences');
		Menus.addMenuItem('topbar', 'New Conference', 'conferences/create');
	}
]);