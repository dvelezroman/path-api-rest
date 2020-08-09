const helpers = require('../../../helpers/index');
const CacheService = require('./cache');

const RouteCache = new CacheService();

module.exports = {
	getAll: async (req, res, next) => {
		res.status(200).json(RouteCache.getAllRoutes());
	},
	get: async (req, res, next) => {
		const { route } = req.params;
		const dataFromMaps = RouteCache.getRoute(route);
		if (dataFromMaps) {
			res.status(200).json({ status: true, data: dataFromMaps });
		} else {
			res.status(404).json({ status: false, msg: 'Distance not available.' });
		}
	},
	create: async (req, res, next) => {
		const mapsData = await helpers.getDataFromFile();
		const { data } = req.body;
		const newRoute = `${data.from}-${data.to}`;
		const existsRoute = RouteCache.getRoute(newRoute);
		if (existsRoute) {
			res
				.status(200)
				.json({ status: false, msg: 'This route already exists!' });
		}
		const newRouteData = {
			distance: data.distance,
			unit: 'Kms',
		};
		const responseFromSavingNewRoute = await RouteCache.setRoute(
			newRoute,
			newRouteData
		);
		if (responseFromSavingNewRoute) {
			res.status(201).json({
				status: true,
				msg: 'New route saved!',
			});
		}
		res.status(404).json({
			status: false,
			msg: 'Error saving new Route!',
		});
	},
};
