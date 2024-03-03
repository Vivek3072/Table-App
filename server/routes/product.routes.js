const express = require("express");
const ValidateToken = require("../middlewares/ValidateToken");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

/**
 * @description
 * Route for user to add products
 */

router.route("/add").post(ValidateToken, ProductController.addProduct);
router.route("/").get(ProductController.getProducts);
router.route("/update/:id").put(ValidateToken, ProductController.updateProduct);
router
  .route("/delete/:id")
  .delete(ValidateToken, ProductController.deleteProduct);

module.exports = router;
