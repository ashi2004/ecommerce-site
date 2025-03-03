import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductComtroller,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/product/:pid", deleteProductController);

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//products per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search',searchProductController)

//similar products
router.get('/related-product/:pid/:id',relatedProductComtroller)

//category wise product
router.get('/product-category/:slug',productCategoryController)
export default router;

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);