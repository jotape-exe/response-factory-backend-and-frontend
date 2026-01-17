import { ProductRepository } from "../product.repository";
import { FindProductByIdController } from "./find-product-by-id.controller";
import { FindProductByIdUseCase } from "./find-product-by-id.use-case";

const repository = new ProductRepository();
const findProductByIdUseCase = new FindProductByIdUseCase(repository);
const findProductByIdController = new FindProductByIdController(findProductByIdUseCase);

export { findProductByIdController };

