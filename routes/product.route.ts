import express from "express";
import ProductController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {productSchema} from "../validation/product.validation.js";

const router = express.Router();

const productController = new ProductController();

router.post("/",
    authMiddleware,
    validate(productSchema),
    productController.createProduct,
);

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);


export default router;
