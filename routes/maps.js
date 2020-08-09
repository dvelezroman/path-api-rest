const express = require('express');
const router = express.Router();
const mapsController = require('../app/api/controllers/maps');

router.get('/:route', mapsController.get);
router.get('/', mapsController.getAll);
router.post('/', mapsController.create);
module.exports = router;
