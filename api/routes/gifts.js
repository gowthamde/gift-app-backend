const express = require('express');
const router = express.Router();
const giftController = require('../controllers/gifts');
const { verifyToken } = require('../middleware/auth-verify');

router.post('/', verifyToken, giftController.create_gift);

router.get('/get-top-gifts', giftController.gettop_gifts)

router.get('/', giftController.getall_gifts)

router.get('/:id', verifyToken, giftController.getbyid_gift)

router.post('/:id', verifyToken, giftController.update_gifts)

module.exports = router;