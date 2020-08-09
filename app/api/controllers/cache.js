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

	getRoute(from, to) {
		const existRoute = (this.ROUTES[from] && this.ROUTES[from][to]) || null;
		return existRoute;
	}

	async setRoute({ from, to, distance }) {
		let existRoute;
		existRoute = this.getRoute(from, to);
		if (existRoute) {
			this.ROUTES[from][to] = distance;
			this.ROUTES[to][from] = distance;
			const responseFromSavingNewRoute = await helpers.setDataToFile(
				this.ROUTES
			);
			if (responseFromSavingNewRoute) {
				return true;
			}
		} else {
			if (this.ROUTES[from]) {
				this.ROUTES[from][to] = distance;
			} else {
				this.ROUTES[from] = { [to]: distance };
			}
			if (this.ROUTES[to]) {
				this.ROUTES[to][from] = distance;
			} else {
				this.ROUTES[to] = { [from]: distance };
			}

			const responseFromSavingNewRoute = await helpers.setDataToFile(
				this.ROUTES
			);
			if (responseFromSavingNewRoute) {
				return true;
			} else {
				return false;
			}
		}
	}
}

module.exports = CacheService;
