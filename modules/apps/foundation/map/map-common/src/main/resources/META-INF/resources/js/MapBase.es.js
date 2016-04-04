'use strict';

class MapBase {
	constructor(){
		this.controls = [
			'Base.CONTROLS.PAN',
			'Base.CONTROLS.TYPE',
			'Base.CONTROLS.ZOOM'
		];

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

	static CONTROLS() {
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
	}

	static POSITION() {
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
	}

	initializer() {
		var location = this.position || position.location ? position.location : {};

		if (!location.lat || !location.lng) {
			Liferay.Util.getGeolocation(
				function(latitude, longitude) {
					var location = {
						lat: latitude,
						lng: longitude
					};

					this._initializeLocation(location);
				}
			);
		}
		else {
			this._initializeLocation(location);
		}
	}

	addMarker(location) {
		var MarkerImpl = this.MarkerImpl;

		if (MarkerImpl) {
			return new MarkerImpl(
				{
					location: location,
					map: this._map
				}
			);
		}
	}

	getNativeMap() {
		return this._map;
	}

	openDialog(dialogConfig) {
		this._getDialog().open(dialogConfig);
	}

	_bindUIMB() {
		var geojsonLayer = this._geojsonLayer;

		if (geojsonLayer) {
			geojsonLayer.on(
				'featuresAdded',
				function(event) {
					var bounds = this.getBounds();

					var features = event.features;

					if (features.length > 1) {
						event.features.forEach(
							function(item, index) {
								bounds.extend(item.getGeometry().get());
							}
						);
					}
					else {
						this.position = {
							location: features[0].getGeometry().get()
						}
					}
				}
			);

			geojsonLayer.on(
				'featureClick',
				function(event) {
					this.fire(
						'featureClick',
						{
							feature: event.feature
						}
					);
				}
			);
		}

		var gelocationMarker = this._geolocationMarker;

		if (geolocationMarker) {
			geolocationMarker.on(
				'dragend',
				function (event) {
					var geocoder = this._getGeocoder();

					geocoder.reverse(
						event.location,
						function(event) {
							this.position = event.data;
						}
					);
				}
			);
		}

		var customControls = this._customControls;

		var homeControl = customControls[this.CONTROLS().HOME];

		if (homeControl) {
			homeControl.on('click', this._onHomeButtonClick, this);
		}

		var searchControls = customControls[this.CONTROLS().SEARCH];

		if (searchControl) {
			searchControl.on(
				'search',
				function (event) {
					this.position = event.position;
				}
			);
		}
	}

	_createCustomControls() {
		/*TODO*/
	}

	_getControlsConfig() {
		/*TODO*/
	}

	_getDialog() {
		var dialog = this._dialog;

		if (!dialog) {
			var DialogImpl = this.DialogImpl;

			if (DialogImpl) {
				dialog = new DialogImpl(
					{
						map: this._map
					}
				);
			}
		}

		return dialog;
	}

	_getGeocoder() {
		var geocoder = this._geocoder;

		if (!geocoder) {
			var GeoCoderImpl = this.GeocoderImpl;

			if (GeoCoderImpl) {
				geocoder = new GeoCoderImpl();

				this._geocoder = geocoder;
			}
		}

		return geocoder;
	}

	_initializeGeojsonData() {
		var data = this.data;

		if (data && this._geojsonLayer) {
			this._geojsonLayer.addData(data);
		}
	}

	_initializeLocation(location) {
		if (this.geolocation && this.GeocoderImpl) {
			var geocoder = this._getGeocoder();

			geocoder.reverse(
				location,
				function (event) {
					this._initializeMap(event.data);
				}
			);
		}
		else {
			this._initializeMap(
				{
					location: location
				}
			);
		}
	}

	_initializeMap(position) {
		var location = position.location;

		this._originalPosition = position;

		var controlsConfig = this._getControlsConfig();

		this._map = this._createMap(location, controlsConfig);

		if (this.geolocation) {
			this._geolocationMarker = this.addMarker(location);
		}

		var GeojsonImpl = this.GeojsonImpl;

		if (GeojsonImpl) {
			instance._geojsonLayer = new GeojsonImpl(
				{
					map: this._map
				}
			);
		}

		this.position = position;

		this._createCustomControls();
		this._bindUIMB();
		this._initializeGeojsonData();
	}

	_onHomeButtonClick(event) {
		event.preventDefault();

		this.position = this._originalPosition;
	}

	_onPositionChange(event) {
		var location = event.newVal.location;

		this.setCenter(location);

		var gelocationMarker = this._gelocationMarker;

		if (geolocationMarker) {
			geolocationMarker.setPosition(location);
		}
	}


}
export default MapBase;