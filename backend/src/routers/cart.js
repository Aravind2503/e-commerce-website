const auth = require("../middleware/auth");
const router = require("express").Router();
const Cart = require("../models/cart");

router.get("/cart", auth, async (req, res) => {
    const { email } = req.user;

    const cart = await Cart.findOne({
        email,
    });

    if (!cart) {
        const newCart = new Cart({
            email,
        });
        await newCart.save();
        res.json(newCart.products);
    }

    res.json(cart.products);
});

router.patch("/cart", auth, async (req, res) => {
    const { email } = req.user;

    const cart = await Cart.findOne({
        email,
    });

    if (req.body) {
        cart.products = req.body;

        try {
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
});

module.exports = router;
