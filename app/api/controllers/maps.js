const helpers = require('../../../helpers/index');
const CacheService = require('./cache');

const RouteCache = new CacheService();

module.exports = {
	get: async (req, res, next) => {
		if (!req.query.from) {
			res.status(200).json(RouteCache.getAllRoutes());
		} else {
			const { from, to } = req.query;
			const route = `${from}-${to}`;
			const dataFromMaps = RouteCache.getRoute(route);
			if (dataFromMaps) {
				res.status(200).json({ status: true, data: dataFromMaps });
			} else {
				res.status(404).json({ status: false, msg: 'Distance not available.' });
			}
		}
	},
	getPath: async (req, res, next) => {
		if (!req.query.from) {
			res.status(404).json({
				status: false,
				msg: 'Query Params are not completed',
				help: '/maps/paths?from={cityOriginName}&to={cityDestinationName}',
			});
		} else {
			const { from, to } = req.query;
			const route = `${from}-${to}`;
			const dataFromMaps = RouteCache.getRoute(route);
			if (dataFromMaps) {
				res.status(200).json({ status: true, data: dataFromMaps });
			} else {
				res.status(404).json({ status: false, msg: 'Distance not available.' });
			}
		}
	},
	create: async (req, res, next) => {
		const { data } = req.body;
		const newRoute = `${data.from}-${data.to}`;
		const existsRoute = RouteCache.getRoute(newRoute);
		if (existsRoute) {
			res
				.status(200)
				.json({ status: false, msg: 'This route already exists!' });
		} else {
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
		}
	},
	update: async (req, res, next) => {
		const { data } = req.body;
		const newRoute = `${data.from}-${data.to}`;
		const existsRoute = RouteCache.getRoute(newRoute);
		if (existsRoute) {
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
					msg: 'Route updated!',
				});
			}
			res.status(404).json({
				status: false,
				msg: 'Error updating this Route!',
			});
		} else {
			res.status(404).json({
				status: false,
				msg: 'Route not found.',
			});
		}
	},
};
