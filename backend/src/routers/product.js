const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const sharp = require("sharp");

router.post("/products", async (req, res) => {
  const product = new Product(req.body);
  console.log(req.body);

  try {
    await product.save();

    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/product/images",
  upload.single("images"),
  async (req, res) => {
    // req.user.avatar= req.file.buffer

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post("/products/search", async (req, res) => {
  try {
    console.log(req.body);
    const obj = await Product.find(req.body);
    console.log(obj);
    res.status(201).send(obj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
