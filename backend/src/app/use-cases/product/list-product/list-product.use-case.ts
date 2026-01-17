
import { ProductRepository } from "../product.repository";
import { ProductReponse } from "./list-product.dto";

class ListProductUseCase {
    constructor(
        private repository: ProductRepository,
    ) { }

    async execute(): Promise<ProductReponse[]> {
        return await this.repository.findAll();
    }
}

export { ListProductUseCase };

