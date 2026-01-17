
import { NotFoundError } from "../../../@types/errors/not-found-error";
import { ProductRepository } from "../product.repository";

class DeleteProductUseCase {
    constructor(
        private repository: ProductRepository,
    ) { }

    async execute(id: string | string[]) {
        const product = await this.repository.findById(Number(id));

        if (!product) {
            throw new NotFoundError("Produto")
        }

        product.isDeleted = true
        this.repository.update(product)

        return true
    }
}

export { DeleteProductUseCase };

