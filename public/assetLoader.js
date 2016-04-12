var assetLoader = (function assetLoaderInit() {
    var FRAMES_COUNT = 9,
    	SEPARATOR = '__',
    	PADDING = '000',
    	BASE_URL = '/heroSprites/',
    	EXTENSION = '.png',
    	s,
    	f,
    	len,
    	frames,
    	frameNumber,
    	hero = {};

	var states = [
		'Dead',
		'Idle',
		'Jump',
		'Run',
		'Slide'
	];

	for (s = 0, len = states.length; s < len; s += 1) {
		frames = [];

		for (f = 0; f < FRAMES_COUNT; f += 1) {
			frames[f] = new Image();

			// Pad left.
			frameNumber = (PADDING + f).slice(-PADDING.length);

			frames[f].src = BASE_URL +  states[s] + SEPARATOR + frameNumber + EXTENSION;
			console.log(frames[f].src);
		}

		hero[states[s].toLowerCase()] = frames;
	}

	return { hero }
})();