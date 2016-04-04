define("frontend-js-map-open@2.0.1/js/init.es", ['exports', 'frontend-js-map-common/js/MapBase.es'], function (exports, _MapBase) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MapBase2 = _interopRequireDefault(_MapBase);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var OpenStreetMap = function () {
		function OpenStreetMap() {
			_classCallCheck(this, OpenStreetMap);

			this.CONTROLS_CONFIG_MAP = {};

			this.CONTROLS_CONFIG_MAP[_MapBase2.default.CONTROLS.ATTRIBUTION] = 'attributionControl';
			this.CONTROLS_CONFIG_MAP[_MapBase2.default.CONTROLS.ZOOM] = 'zoomControl';

			this.CONTROLS_POSITION_MAP = {};

			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.BOTTOM] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.BOTTOM_CENTER] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.BOTTOM_LEFT] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.BOTTOM_RIGHT] = 'bottomright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.CENTER] = 'topleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.LEFT] = 'topleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.LEFT_BOTTOM] = 'bottomleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.LEFT_CENTER] = 'topleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.LEFT_TOP] = 'topleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.RIGHT] = 'bottomright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.RIGHT_BOTTOM] = 'bottomright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.RIGHT_CENTER] = 'bottomright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.RIGHT_TOP] = 'topright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.TOP] = 'topright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.TOP_CENTER] = 'topright';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.TOP_LEFT] = 'topleft';
			this.CONTROLS_POSITION_MAP[_MapBase2.default.POSITION.TOP_RIGHT] = 'topright';

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