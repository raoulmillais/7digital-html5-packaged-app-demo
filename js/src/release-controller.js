;(function (exports) {
	var currentReleaseId, releaseTitle, trackListContainer;

	function err() {
		return console.error.apply(console, arguments);
	}

	function log() {
		return console.log.apply(console, arguments);
	}

	function createListItem(track) {
		var detailsAnchor,
			listItem,
			artistText,
			artistPara,
			titleText,
			titlePara;

		listItem = document.createElement('li');

		detailsAnchor = document.createElement('a');
		detailsAnchor.setAttribute('href', '#');
		titlePara = document.createElement('p');
		titleText = document.createTextNode(track.title);
		titlePara.appendChild(titleText);
		artistPara = document.createElement('p');
		artistText = document.createTextNode(track.artist.name);
		artistPara.appendChild(artistText);
		detailsAnchor.appendChild(titlePara);
		detailsAnchor.appendChild(artistPara);
		listItem.appendChild(detailsAnchor);

		return listItem;
	}

	function clearList() {
		while (trackListContainer.hasChildNodes()) {
			trackListContainer.removeChild(trackListContainer.lastChild);
		}
	}

	function addList(tracks) {
		var list,
			listItems;

		list = document.createElement('ul');
		listItems = tracks.map(createListItem);
		listItems.forEach(function (listItem) {
			list.appendChild(listItem);
		});

		trackListContainer.appendChild(list);
	}

	function processTracks(err, tracks) {
		log('Got tracks');

		clearList();
		addList(tracks);
	}

	function update(release) {
		log('Asked to update release with ', release.id);
		if (release.id === currentReleaseId) return;
		log('About to update ')

		currentReleaseId = release.id;

		releaseTitle.textContent = release.artist.name + ' - ' +
			release.title;
		releases.tracks(release, processTracks);
	}

	function init() {
		releaseTitle = document.getElementById('album-title');
		trackListContainer = document.getElementById('tracklist');
		document
			.getElementById('back-to-search')
			.addEventListener('click', function () {
				app.navigate('search');
			});
	}

	exports.releaseController = {
		update: update,
		init: init
	};

})(window);
