const db = require("../models");
const Payment = db.payment
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
const Op = db.Sequelize.Op;

const razorpay = new Razorpay({
    key_id: 'rzp_test_7kfin28anNhbks',
    key_secret: 'FXMCneK4nNjfkmUTDQ0HJImR'
})

exports.verification = (req, res) => {
    const secret = 'Bala@0514'

    if (req.body.status) {
        require('fs').writeFileSync('order_created.json', JSON.stringify(req.body, null, 4))
    }

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    let data = {};

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        if (req.body.event == "payment.authorized") {

            data['payment_authorized'] = JSON.stringify(req.body, null, 4)

        } else if (req.body.event == "payment.captured") {

            data['payment_captured'] = JSON.stringify(req.body, null, 4)

        } else if (req.body.event == "order.paid") {

            data['order_paid'] = JSON.stringify(req.body, null, 4)
        }
        
        data['payment_id'] = req.body.payload['payment']['entity']['id'];

        Payment.update(data, {
                where: { orderId: req.body.payload['payment']['entity']['order_id'] }
            }).then(teacher => {
                console.log('order updated!');
            })
            .catch(err => {
                console.log('order update failed!');
            });

    } else {
        console.log('request is not legit!');
    }
    res.json({ status: 'ok' })
};

exports.razorpay = async (req, res) => {
    const payment_capture = 1
    const amount = 499
    const currency = 'INR'

    const shortId = shortid.generate();

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortId,
        payment_capture,
    }

    try {
        const response = await razorpay.orders.create(options)
        Payment.create({
                orderId: response.id
            }).then(teacher => {
                res.status(200).send({
                    id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                })
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    } catch (error) {
        console.log(error)
    }
};