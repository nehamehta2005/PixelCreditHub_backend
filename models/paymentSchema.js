import {Schema, model} from "mongoose";

const PaymentSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: String,
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    price: Number,

});

const Payment = model("Payment", PaymentSchema);

export default Payment;