import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    orderTotal: {},
    orderDate:{type: String},
    orderNumber: {type: String},
    products: [{}],
    suppliers:[]
});

module.exports = mongoose.model('Order', OrderSchema)