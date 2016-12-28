import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    usersId: {
        type: String,
        required: true
    },
    orders: [{}]
});

module.exports = mongoose.model('Orders', OrderSchema)