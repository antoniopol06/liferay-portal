'use strict';

import MapBase from 'frontend-js-map-common/js/MapBase.es';

class OpenStreetMap {
	constructor(){

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

	initializer(){
		debugger;
	}
}

Liferay = Liferay || {};

Liferay.MapOpenStreetMap = OpenStreetMap;

export default OpenStreetMap;