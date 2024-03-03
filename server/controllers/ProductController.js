const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const ErrorRespond = require("../helpers/ErrorRespond");

class ProductController {
  /**
   * ROUTE - POST - /api/auth/products
   * @access - PRIVATE
   * @param {} req
   * @returns {}
   */

  static addProduct = asyncHandler(async (req, res) => {
    const { productName, price, category } = req.body;

    // Check if required fields are present
    if (!productName) {
      return ErrorRespond(res, 400, "Product name required.");
    }
    if (!price) {
      return ErrorRespond(res, 400, "Price required.");
    }
    if (!category) {
      return ErrorRespond(res, 400, "Please provide category.");
    }

    try {
      const product = new Product({
        productName,
        price,
        category,
        userId: req.user.id, // Assuming user authentication middleware sets req.user
      });
      await product.save();
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      ErrorRespond(res, 500, error.message);
    }
  });

  /**
   * ROUTE - GET - /api/auth/products
   * @access - PUBLIC
   * @param {} req
   * @returns {}
   */
  static getProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      ErrorRespond(res, 500, "Server Error");
    }
  });

  /**
   * ROUTE - PUT - /api/auth/products/update/:id
   * @access - PRIVATE
   * @param {} req
   * @returns {}
   */
  static updateProduct = asyncHandler(async (req, res) => {
    const { productName, price, category } = req.body;
    const productId = req.params.id;

    try {
      // Check if product exists
      let product = await Product.findById(productId);
      if (!product) {
        return ErrorRespond(res, 404, "Product not found");
      }

      product.productName = productName;
      product.price = price;
      product.category = category;

      await product.save();

      res.status(200).json({ success: true, data: product });
    } catch (error) {
      ErrorRespond(res, 500, "Server Error");
    }
  });

  /**
   * ROUTE - DELETE - /api/auth/products/delete/:id
   * @access - PRIVATE
   * @param {} req
   * @returns {}
   */
  static deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
      // Check if product exists
      let product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return ErrorRespond(res, 404, "Product not found");
      }

      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      ErrorRespond(res, 500, error.message);
    }
  });
}

module.exports = ProductController;
