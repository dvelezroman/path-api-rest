const helpers = require('../../../helpers/index');

class CacheService {
	constructor() {
		this.ROUTES = {};
		this.initCache();
	}

	async initCache() {
		const routes = await helpers.getDataFromFile();
		this.ROUTES = { ...routes };
	}

	getAllRoutes() {
		return this.ROUTES;
	}

	getRoute(route) {
		const existRoute =
			this.ROUTES[route] || this.ROUTES[helpers.switchRoute(route)] || null;
		return existRoute;
	}

	async setRoute(route, data) {
		this.ROUTES[route] = { ...data };
		const responseFromSavingNewRoute = await helpers.setDataToFile(this.ROUTES);
		if (responseFromSavingNewRoute) {
			return true;
		}
		return false;
	}
}

module.exports = CacheService;
