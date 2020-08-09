const CacheService = require('./cache');

const RouteCache = new CacheService();

module.exports = {
	get: async (req, res, next) => {
		if (!req.query.from) {
			res.status(200).json(RouteCache.getAllRoutes());
		} else {
			const { from, to } = req.query;
			const distance = RouteCache.getRoute(
				from.replace(' ', '+').toLowerCase(),
				to.replace(' ', '+').toLowerCase()
			);
			if (distance) {
				res.status(200).json({
					status: true,
					data: {
						distance,
						from: from.split('+').join(' '),
						to: to.split('+').join(' '),
					},
				});
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
			const paths = RouteCache.getPath(
				from.replace(' ', '+').toLowerCase(),
				to.replace(' ', '+').toLowerCase()
			);
			if (paths) {
				res.status(200).json({ status: true, data: paths });
			} else {
				res.status(404).json({ status: false, msg: 'Distance not available.' });
			}
		}
	},
	create: async (req, res, next) => {
		const { from, to, distance } = req.body.data;
		const existsPath = RouteCache.getRoute(
			from.replace(' ', '+').toLowerCase(),
			to.replace(' ', '+').toLowerCase()
		);
		if (existsPath) {
			res.status(400).json({
				status: true,
				msg: 'This route already exists!',
			});
		} else {
			const newPathData = {
				from: from.replace(' ', '+').toLowerCase(),
				to: to.replace(' ', '+').toLowerCase(),
				distance,
			};
			const responseFromSavingNewRoute = await RouteCache.setRoute(newPathData);
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
		const { from, to, distance } = req.body.data;
		const existsPath = RouteCache.getRoute(
			from.replace(' ', '+').toLowerCase(),
			to.replace(' ', '+').toLowerCase()
		);

		if (existsPath) {
			const newPathData = {
				from: from.replace(' ', '+').toLowerCase(),
				to: to.replace(' ', '+').toLowerCase(),
				distance,
			};
			const responseFromSavingNewRoute = await RouteCache.setRoute(newPathData);
			if (responseFromSavingNewRoute) {
				res.status(201).json({
					status: true,
					msg: 'Route updated!',
				});
			}
			res.status(404).json({
				status: false,
				msg: 'Error saving new Route!',
			});
		} else {
			res.status(400).json({
				status: true,
				msg: 'Route not found!',
			});
		}
	},
};
