var router = require('express').Router();

const ICEServerController = require('../controllers/ICEServer.Controller');

router.get('/', ICEServerController.getICEServer)


module.exports = router;