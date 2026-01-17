import { ProductRepository } from "../product.repository";
import { ListProductController } from "./list-product.controller";
import { ListProductUseCase } from "./list-product.use-case";


const repository = new ProductRepository();
const listProductUseCase = new ListProductUseCase(repository);
const listProductController = new ListProductController(listProductUseCase);

export { listProductController };

