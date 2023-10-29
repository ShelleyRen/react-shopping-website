const express = require("express");
const router = require("express").Router();
const { protect, admin } = require("../middlewares/authMiddelware");

const {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
