const path = require('path')
const payment = require("../controllers/payment.controller");
const express = require('express');

const paymentRoutes = express.Router();

// Razorpay Webhook
paymentRoutes.post("/verification", payment.verification);
paymentRoutes.post("/razorpay", payment.razorpay);

module.exports = paymentRoutes;