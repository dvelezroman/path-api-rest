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

const findLowestWeightNode = (costs, processed) => {
	return Object.keys(costs).reduce((lowest, node) => {
		if (lowest === null || costs[node] < costs[lowest]) {
			if (!processed.includes(node)) {
				lowest = node;
			}
		}
		return lowest;
	}, null);
};

module.exports = {
	getDataFromFile,
	setDataToFile,
	findLowestWeightNode,
};
