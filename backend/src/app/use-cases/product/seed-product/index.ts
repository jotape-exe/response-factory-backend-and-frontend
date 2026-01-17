import { ProductRepository } from "../product.repository";
import { SeedProductsController } from "./seed-product.controller";
import { SeedProductsUseCase } from "./seed-product.use-case";

const productRepository = new ProductRepository();
const seedProductsUseCase = new SeedProductsUseCase(productRepository);
const seedProductsController = new SeedProductsController(seedProductsUseCase);

export { seedProductsController };

