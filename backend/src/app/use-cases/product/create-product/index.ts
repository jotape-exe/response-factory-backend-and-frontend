import { ProductRepository } from "../product.repository";
import { CreateProductController } from "./create-product.controller";
import { CreateProductUseCase } from "./create-product.use-case";


const repository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(repository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController };

