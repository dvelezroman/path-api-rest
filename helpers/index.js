const fs = require('fs');

const getDataFromFile = () =>
	new Promise((resolve, reject) => {
		try {
			fs.readFile('storage/maps.json', (err, data) => {
				if (err) {
					throw err;
				}
				resolve(JSON.parse(data));
			});
		} catch (error) {
			reject(error);
		}
	});

const setDataToFile = data =>
	new Promise((resolve, reject) => {
		try {
			fs.writeFile('storage/maps.json', JSON.stringify(data), err => {
				if (err) {
					throw err;
				}
				resolve(true);
			});
		} catch {
			reject(err);
		}
	});

const findLowestWeightNode = (weights, processed) => {
	const knownNodes = Object.keys(weights);
	const lowestWeightNode = knownNodes.reduce((lowest, node) => {
		if (lowest === null && !processed.includes(node)) {
			lowest = node;
		}
		if (weights[node] < weights[lowest] && !processed.includes(node)) {
			lowest = node;
		}
		return lowest;
	}, null);
	return lowestWeightNode;
};

const dijkstra = graph => {
	// track lowest cost to reach each node
	const weights = Object.assign({ finish: Infinity }, graph.start);

	// track paths
	const parents = { finish: null };
	for (let child in graph.start) {
		parents[child] = 'start';
	}

	// track nodes that have already been processed
	const processed = [];
	//Next, we’ll set the initial value of the node being processed //using the lowestCostNode function. Then, we’ll begin a while loop, //which will continuously look for the cheapest node.
	let node = findLowestWeightNode(weights, processed);

	while (node) {
		//Get the weight of the current node
		let weight = weights[node];
		//Get all the neighbors of current node
		let children = graph[node];
		//Loop through each of the children, and calculate the weight to reach that child node. We'll update the weight of that node in the weights object if it is lowest or the ONLY weight available
		for (let n in children) {
			let newWeight = weight + children[n];
			if (!weights[n] || weights[n] > newWeight) {
				weights[n] = newWeight;
				parents[n] = node;
			}
		}
		//push processed data into its data structure
		processed.push(node);
		// repeat until we processed all of our nodes.
		node = findLowestWeightNode(weights, processed);
		let optimalPath = ['finish'];
		let parent = parents.finish;
		while (parent) {
			optimalPath.unshift(parent);
			parent = parents[parent]; // add parent to start of path array
		}

		const results = {
			distance: weights.finish,
			path: optimalPath,
		};

		return results;
	}
};

module.exports = {
	getDataFromFile,
	setDataToFile,
	findLowestWeightNode,
};
