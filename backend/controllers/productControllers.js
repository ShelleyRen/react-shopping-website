const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Fetch all products
// @route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Fetch single product
// @route GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Create a product
//route POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;
  const product = new Product({
    name: name,
    price: price,
    image: image,
    category: category,
    countInStock: countInStock,
    description: description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Update a product
//route PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.countInStock = countInStock;
    product.category = category;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status.apply(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
