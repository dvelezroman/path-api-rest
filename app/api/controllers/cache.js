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

	getPath(from, to) {
		const tempRoutes = { ...this.ROUTES };
		// delete tempRoutes[from];
		// delete tempRoutes[to];
		const graph = {
			[from]: this.ROUTES[from],
			[to]: {},
			...tempRoutes,
		};
		const weights = Object.assign({}, graph[from], { [to]: Infinity });
		const parents = { finish: null };
		for (let child in graph[from]) {
			parents[child] = from;
		}
		// track nodes that have already been processed
		const processed = [];
		//Next, we’ll set the initial value of the node being processed
		//using the lowestCostNode function. Then, we’ll begin a while loop,
		//which will continuously look for the cheapest node.
		let node = helpers.findLowestWeightNode(weights, processed);
		while (node) {
			//Get the weight of the current node

			let weight = weights[node];

			//Get all the neighbors of current node
			let children = graph[node];

			//Loop through each of the children, and calculate the weight to reach that child node. We'll update the weight of that node in the weights object if it is lowest or the ONLY weight available
			for (let n in children) {
				let newWeight = weight + children[n];
				if (n !== from) {
					if (!weights[n]) {
						weights[n] = newWeight;
						parents[n] = node;
					}
					if (weights[n] > newWeight) {
						weights[n] = newWeight;
						parents[n] = node;
					}
				}
				//console.log({ parents });
			}

			//push processed data into its data structure
			processed.push(node);
			// repeat until we processed all of our nodes.
			node = helpers.findLowestWeightNode(weights, processed);
		}

		let optimalPath = [to];

		let parent = parents[to];
		while (parent) {
			optimalPath.push(parent);
			parent = parents[parent]; // add parent to start of path array
		}
		optimalPath.reverse(); // reverse array to get correct order

		const results = {
			distance: weights[to],
			path: optimalPath,
		};

		return results;
	}
}

module.exports = CacheService;
