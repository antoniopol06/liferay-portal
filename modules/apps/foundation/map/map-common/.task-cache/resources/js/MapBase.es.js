define("frontend-js-map-common@2.0.1/js/MapBase.es", ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var MapBase = function () {
		function MapBase() {
			_classCallCheck(this, MapBase);

			this.controls = ['Base.CONTROLS.PAN', 'Base.CONTROLS.TYPE', 'Base.CONTROLS.ZOOM'];

			this.data = {};

			this.geolocation = false;

			this.position = {
				location: {
					lat: 0,
					lng: 0
				}
			};

			this.zoom = 11;

			this.initializer();
		}

		MapBase.CONTROLS = function CONTROLS() {
			return {
				ATTRIBUTION: 'attribution',
				GEOLOCATION: 'geolocation',
				HOME: 'home',
				OVERVIEW: 'overview',
				PAN: 'pan',
				ROTATE: 'rotate',
				SCALE: 'scale',
				SEARCH: 'search',
				STREETVIEW: 'streetview',
				TYPE: 'type',
				ZOOM: 'zoom'
			};
		};

		MapBase.POSITION = function POSITION() {
			return {
				BOTTOM: 11,
				BOTTOM_CENTER: 11,
				BOTTOM_LEFT: 10,
				BOTTOM_RIGHT: 12,
				CENTER: 13,
				LEFT: 5,
				LEFT_BOTTOM: 6,
				LEFT_CENTER: 4,
				LEFT_TOP: 5,
				RIGHT: 7,
				RIGHT_BOTTOM: 9,
				RIGHT_CENTER: 8,
				RIGHT_TOP: 7,
				TOP: 2,
				TOP_CENTER: 2,
				TOP_LEFT: 1,
				TOP_RIGHT: 3
			};
		};

		MapBase.prototype.initializer = function initializer() {
			var location = this.position || position.location ? position.location : {};

			if (!location.lat || !location.lng) {
				Liferay.Util.getGeolocation(function (latitude, longitude) {
					var location = {
						lat: latitude,
						lng: longitude
					};

					this._initializeLocation(location);
				});
			} else {
				this._initializeLocation(location);
			}
		};

		MapBase.prototype.addMarker = function addMarker(location) {
			var MarkerImpl = this.MarkerImpl;

			if (MarkerImpl) {
				return new MarkerImpl({
					location: location,
					map: this._map
				});
			}
		};

		MapBase.prototype.getNativeMap = function getNativeMap() {
			return this._map;
		};

		MapBase.prototype.openDialog = function openDialog(dialogConfig) {
			this._getDialog().open(dialogConfig);
		};

		MapBase.prototype._bindUIMB = function _bindUIMB() {
			var geojsonLayer = this._geojsonLayer;

			if (geojsonLayer) {
				geojsonLayer.on('featuresAdded', function (event) {
					var bounds = this.getBounds();

					var features = event.features;

					if (features.length > 1) {
						event.features.forEach(function (item, index) {
							bounds.extend(item.getGeometry().get());
						});
					} else {
						this.position = {
							location: features[0].getGeometry().get()
						};
					}
				});

				geojsonLayer.on('featureClick', function (event) {
					this.fire('featureClick', {
						feature: event.feature
					});
				});
			}

			var gelocationMarker = this._geolocationMarker;

			if (geolocationMarker) {
				geolocationMarker.on('dragend', function (event) {
					var geocoder = this._getGeocoder();

					geocoder.reverse(event.location, function (event) {
						this.position = event.data;
					});
				});
			}

			var customControls = this._customControls;

			var homeControl = customControls[this.CONTROLS().HOME];

			if (homeControl) {
				homeControl.on('click', this._onHomeButtonClick, this);
			}

			var searchControls = customControls[this.CONTROLS().SEARCH];

			if (searchControl) {
				searchControl.on('search', function (event) {
					this.position = event.position;
				});
			}
		};

		MapBase.prototype._createCustomControls = function _createCustomControls() {
			/*TODO*/
		};

		MapBase.prototype._getControlsConfig = function _getControlsConfig() {
			/*TODO*/
		};

		MapBase.prototype._getDialog = function _getDialog() {
			var dialog = this._dialog;

			if (!dialog) {
				var DialogImpl = this.DialogImpl;

				if (DialogImpl) {
					dialog = new DialogImpl({
						map: this._map
					});
				}
			}

			return dialog;
		};

		MapBase.prototype._getGeocoder = function _getGeocoder() {
			var geocoder = this._geocoder;

			if (!geocoder) {
				var GeoCoderImpl = this.GeocoderImpl;

				if (GeoCoderImpl) {
					geocoder = new GeoCoderImpl();

					this._geocoder = geocoder;
				}
			}

			return geocoder;
		};

		MapBase.prototype._initializeGeojsonData = function _initializeGeojsonData() {
			var data = this.data;

			if (data && this._geojsonLayer) {
				this._geojsonLayer.addData(data);
			}
		};

		MapBase.prototype._initializeLocation = function _initializeLocation(location) {
			if (this.geolocation && this.GeocoderImpl) {
				var geocoder = this._getGeocoder();

				geocoder.reverse(location, function (event) {
					this._initializeMap(event.data);
				});
			} else {
				this._initializeMap({
					location: location
				});
			}
		};

		MapBase.prototype._initializeMap = function _initializeMap(position) {
			var location = position.location;

			this._originalPosition = position;

			var controlsConfig = this._getControlsConfig();

			this._map = this._createMap(location, controlsConfig);

			if (this.geolocation) {
				this._geolocationMarker = this.addMarker(location);
			}

			var GeojsonImpl = this.GeojsonImpl;

			if (GeojsonImpl) {
				instance._geojsonLayer = new GeojsonImpl({
					map: this._map
				});
			}

			this.position = position;

			this._createCustomControls();
			this._bindUIMB();
			this._initializeGeojsonData();
		};

		MapBase.prototype._onHomeButtonClick = function _onHomeButtonClick(event) {
			event.preventDefault();

			this.position = this._originalPosition;
		};

		MapBase.prototype._onPositionChange = function _onPositionChange(event) {
			var location = event.newVal.location;

			this.setCenter(location);

			var gelocationMarker = this._gelocationMarker;

			if (geolocationMarker) {
				geolocationMarker.setPosition(location);
			}
		};

		return MapBase;
	}();

	exports.default = MapBase;
});
//# sourceMappingURL=MapBase.es.js.map