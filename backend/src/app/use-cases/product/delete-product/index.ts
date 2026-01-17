import { ProductRepository } from "../product.repository";
import { DeleteProductController } from "./delete-product.controller";
import { DeleteProductUseCase } from "./delete-product.use-case";


const repository = new ProductRepository();
const deleteProductUseCase = new DeleteProductUseCase(repository);
const deleteProductController = new DeleteProductController(deleteProductUseCase);

export { deleteProductController };

