const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })
const upload = multer({ storage:storage })

router.post("/product", upload.single('img'), async (req, res) => {
    const img = req.file
    const imgname= img?.filename;
    console.log(imgname);
  const { title, desc, price } = req.body;
  const newProduct = new Product({
    title,
    desc,
    price,
    img:imgname
  });
  try {
    const saveproduct = await newProduct.save();
    console.log(saveproduct);
    res.status(200).json(saveproduct);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
