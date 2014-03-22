;(function (exports) {
	var currentView;

	function err() {
		return console.error.apply(console, arguments);
	}

	function log() {
		return console.log.apply(console, arguments);
	}

	window.onload = function () {
		currentView = 'search';
		searchController.init();
		releaseController.init();
	};

	function navigate(newView) {
		log('Attempting to navigate to ', newView);
		if (currentView !== newView) {
			log('Navigating to ', newView)
			document
				.getElementById(currentView + '-view')
				.classList.add('hidden');
			document
				.getElementById(newView + '-view')
				.classList.remove('hidden');
			currentView = newView;
		} else {
			err('Already on ', newView)
		}
	}

	exports.app = {
		navigate: navigate
	};

})(window);
