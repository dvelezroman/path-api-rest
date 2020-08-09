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
		let existRoute;
		existRoute = this.ROUTES[route];
		if (existRoute) {
			this.ROUTES[route] = { ...data };
			const responseFromSavingNewRoute = await helpers.setDataToFile(
				this.ROUTES
			);
			if (responseFromSavingNewRoute) {
				return true;
			}
		} else if (this.ROUTES[helpers.switchRoute(route)]) {
			this.ROUTES[helpers.switchRoute(route)] = { ...data };
			const responseFromSavingNewRoute = await helpers.setDataToFile(
				this.ROUTES
			);
			if (responseFromSavingNewRoute) {
				return true;
			}
		} else {
			return false;
		}
	}
}

module.exports = CacheService;
