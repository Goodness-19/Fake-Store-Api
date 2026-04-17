import {Request, Response, NextFunction} from "express"
import Productservice from "../services/product.service.js"
import asyncHandler from "../middlewares/asyncHandler.js"

class ProductController{
    service = new Productservice();

    createProduct = asyncHandler(async(req: Request, res:Response)=>{
        const product = await this.service.createProduct(req.body);
        res.status(201).json({
            success:true,
            data: product,
        });
    });

    getProduct = asyncHandler(async(req: Request, res:Response)=> {
        const product = await this.service.getProduct();
        res.json({
            success: true,
            data: product,
        });
    });

    getProductById = asyncHandler(async(req: Request, res:Response)=> {
        const product = await this.service.getProductById(req.body);
        res.json({
            success: true,
            data: product,
        });
    });
}

export default ProductController;
