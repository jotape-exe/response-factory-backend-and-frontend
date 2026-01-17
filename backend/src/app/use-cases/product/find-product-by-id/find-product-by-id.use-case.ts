
import { NotFoundError } from "../../../@types/errors/not-found-error";
import { ProductRepository } from "../product.repository";

class FindProductByIdUseCase {
    constructor(
        private repository: ProductRepository,
    ) { }

    async execute(id: string | string[]) {
        const product = await this.repository.findById(Number(id));

        if (!product) {
            throw new NotFoundError(`Produto com id: ${id}`)
        }

        if (product.isDeleted) {
            throw new NotFoundError(`Produto com id: ${id}`)
        }

        return product
    }
}

export { FindProductByIdUseCase };

