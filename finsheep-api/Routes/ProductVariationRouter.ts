import express from "express";
const productVariationRouter=express.Router();
import { DeleteProductVariation } from "../Controllers/ProductVariationController";

productVariationRouter.delete('/:id',DeleteProductVariation)

export default productVariationRouter