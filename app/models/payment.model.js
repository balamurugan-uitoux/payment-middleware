module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    orderId: {
      type: Sequelize.STRING
    },
    payment_authorized :{
      type: Sequelize.BOOLEAN
    },
    payment_captured: {
      type: Sequelize.BOOLEAN
    },
    order_paid :{
      type: Sequelize.BOOLEAN
    },
    payment_id :{
      type: Sequelize.BOOLEAN
    }
    
  });

  return Payment;
};
