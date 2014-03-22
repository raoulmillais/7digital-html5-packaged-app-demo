;(function (exports) {
	var PAGE_SIZE = 15;

	function err() {
		return console.error.apply(console, arguments);
	}

	function log() {
		return console.log.apply(console, arguments);
	}

	function extractReleasesFromSearchResponse(res) {
		return res.searchResults.searchResult
			.map(function (result) {
				return result.release;
			});
	}

	function search(term, cb) {
		var releases = new sevendigital.Releases();
		log('About to search for: ', term);

		releases.search({
			q: term,
			type: 'album',
			pageSize: PAGE_SIZE
		}, function handleSearchResponse(err, res) {
			var releases;
			if (err) return cb(err);

			releases = extractReleasesFromSearchResponse(res);

			return cb(null, releases);
		});
	}

	function tracks(release, cb) {
		var releases = new sevendigital.Releases();
		log('About to get tracks for: ', release.id);

		releases.getTracks({
			releaseId: release.id
		}, function handleTracksResponse(err, res) {
			var releases;
			if (err) return cb(err);

			return cb(null, res.tracks.track);
		});
	
	}

	exports.releases = {
		search: search,
		tracks: tracks
	};

})(window);

