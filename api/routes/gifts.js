const express = require('express');
const router = express.Router();
const giftController = require('../controllers/gifts');

router.post('/', giftController.create_gift);

router.get('/get-top-gifts', giftController.gettop_gifts)

router.get('/', giftController.getall_gifts)

router.get('/:id', giftController.getbyid_gift)

router.post('/:id', giftController.update_gifts)

module.exports = router;