import { Router } from "express";
import { createProductController } from "../use-cases/product/create-product";
import { deleteProductController } from "../use-cases/product/delete-product";
import { findProductByIdController } from "../use-cases/product/find-product-by-id";
import { listProductController } from "../use-cases/product/list-product";
import { seedProductsController } from "../use-cases/product/seed-product";

const RESOURCE = "/products"

const productRoutes = Router()

productRoutes.post(RESOURCE, (req, res) => {
  return createProductController.handler(req, res)
});

productRoutes.get(RESOURCE, (req, res) => {
  return listProductController.handler(req, res)
});

productRoutes.get(`${RESOURCE}/:id`, (req, res) => {
  return findProductByIdController.handler(req, res);
});

productRoutes.delete(`${RESOURCE}/:id/delete`, (req, res) => {
  return deleteProductController.handler(req, res);
});

productRoutes.post(`${RESOURCE}/seed`, (req, res) => {
  return seedProductsController.handler(req, res);
});

productRoutes.get(`${RESOURCE}/error/500`, (req, res) => {
  throw new Error();
});

export { productRoutes };

