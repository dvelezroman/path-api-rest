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

const switchRoute = route => {
	const splittedRoute = route.split('-');
	return [splittedRoute[1], splittedRoute[0]].join('-');
};

module.exports = {
	getDataFromFile,
	setDataToFile,
	switchRoute,
};
