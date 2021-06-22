const mongoose = require("mongoose");
const { productSchema } = require("./product");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    products: [productSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
