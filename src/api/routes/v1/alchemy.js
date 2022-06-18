var express = require('express');
var router = express.Router();
import alchemyController from '../../../controllers/alchemy';

router.get('/', alchemyController.health_check);

router.get('/nft-by-address/:address', alchemyController.fetch_nfts);

module.exports = router;
