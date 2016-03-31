define("frontend-js-map-open@2.0.1/js/init.es", ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	console.log('INIT');
	debugger;

	var OpenStreetMap = function () {
		function OpenStreetMap() {
			_classCallCheck(this, OpenStreetMap);

			this.MapBase = Liferay.MapBase;
			this.CONTROLS_CONFIG_MAP = {};

			this.CONTROLS_CONFIG_MAP[MapBase.CONTROLS.ATTRIBUTION] = 'attributionControl';
			this.CONTROLS_CONFIG_MAP[MapBase.CONTROLS.ZOOM] = 'zoomControl';

			this.CONTROLS_POSITION_MAP = {};

			this.CONTROLS_POSITION_MAP[MapBase.POSITION.BOTTOM] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.BOTTOM_CENTER] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.BOTTOM_LEFT] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.BOTTOM_RIGHT] = 'bottomright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.CENTER] = 'topleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.LEFT] = 'topleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.LEFT_BOTTOM] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.LEFT_CENTER] = 'topleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.LEFT_TOP] = 'topleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.RIGHT] = 'bottomright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.RIGHT_BOTTOM] = 'bottomright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.RIGHT_CENTER] = 'bottomright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.RIGHT_TOP] = 'topright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.TOP] = 'topright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.TOP_CENTER] = 'topright';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.TOP_LEFT] = 'topleft';
			this.CONTROLS_POSITION_MAP[MapBase.POSITION.TOP_RIGHT] = 'topright';

			this.initializer();
		}

		OpenStreetMap.prototype.initializer = function initializer() {
			debugger;
		};

		return OpenStreetMap;
	}();

	Liferay = Liferay || {};

	Liferay.MapOpenStreetMap = OpenStreetMap;

	exports.default = OpenStreetMap;
});
//# sourceMappingURL=init.es.js.map