const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare } = require("../middleware/authMiddleWare");

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)


module.exports = router