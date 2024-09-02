import express from "express";
const productVariationRouter=express.Router();
import { DeleteProductVariation } from "../Controllers/ProductVariationController";

productVariationRouter.delete('/variation/:id',DeleteProductVariation)

export default productVariationRouter