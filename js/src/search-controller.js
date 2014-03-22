;(function (exports) {
	var searchBox, listContainer, currentResults;

	function err() {
		return console.error.apply(console, arguments);
	}

	function log() {
		return console.log.apply(console, arguments);
	}

	function handleReleaseClick(e) {
		var id = this.getAttribute('data-releaseid');
		log('Release with id %s clicked', id);
		var matchingReleases = currentResults.filter(function (item) {
			return item.id === id;
		});

		releaseController.update(matchingReleases[0]);
		app.navigate('release');
	}

	function createListItem(release) {
		var detailsAnchor,
			listItem,
			artistText,
			artistPara,
			titleText,
			titlePara,
			packshotContainer,
			packshotImage;

		listItem = document.createElement('li');

		//packshot
		packshotContainer = document.createElement('aside');
		packshotContainer.classList.add('pack-end');
		packshotImage = document.createElement('img');
		packshotImage.setAttribute('src', release.image);
		packshotContainer.appendChild(packshotImage);
		listItem.appendChild(packshotContainer);

		//details
		detailsAnchor = document.createElement('a');
		detailsAnchor.setAttribute('href', '#');
		detailsAnchor.setAttribute('data-releaseid', release.id);
		detailsAnchor.addEventListener('click', handleReleaseClick);
		titlePara = document.createElement('p');
		titleText = document.createTextNode(release.title);
		titlePara.appendChild(titleText);
		artistPara = document.createElement('p');
		artistText = document.createTextNode(release.artist.name);
		artistPara.appendChild(artistText);
		detailsAnchor.appendChild(titlePara);
		detailsAnchor.appendChild(artistPara);
		listItem.appendChild(detailsAnchor);

		return listItem;
	}

	function clearList() {
		while (listContainer.hasChildNodes()) {
			listContainer.removeChild(listContainer.lastChild);
		}
	}

	function addList(releases) {
		var list,
			listItems;

		list = document.createElement('ul');
		listItems = releases.map(createListItem);
		listItems.forEach(function (listItem) {
			list.appendChild(listItem);
		});

		listContainer.appendChild(list);
	}

	function doSearch(e) {
		var term = searchBox.value;
		releases.search(term, processSearchResults);
	}

	function processSearchResults(err, releases) {
		log('Got results');
		currentResults = releases;
		clearList();
		addList(releases);
	}

	function debounce(fn, delay) {
		var timer = null;
		return function debounced() {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}

	function init() {
		// Add a delay before actually searching so you dont eat up your
		// request limit.
		var inputHandler = debounce(doSearch, 2000);
		listContainer = document.getElementById('search-results');
		searchBox = document.getElementById('search-terms');

		searchBox.addEventListener('input', inputHandler);
	}

	exports.searchController = {
		init: init
	};

})(window);

