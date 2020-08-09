const express = require('express');
const router = express.Router();
const mapsController = require('../app/api/controllers/maps');

router.get('/routes', mapsController.get);
router.get('/paths', mapsController.getPath);
router.post('/route', mapsController.create);
router.put('/route', mapsController.update);
module.exports = router;
