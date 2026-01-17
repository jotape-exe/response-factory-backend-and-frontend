
import { ConflictError } from "../../../@types/errors/conflict-error";
import { ProductRepository } from "../product.repository";
import { CreateProductDTO } from "./create-product.dto";


class CreateProductUseCase {
  constructor(
    private repository: ProductRepository,
  ) { }

  async execute(data: CreateProductDTO) {
    const productAlreadyExists = await this.repository.findBySku(data.sku);

    if (productAlreadyExists) {
      throw new ConflictError("SKU já está em uso.");
    }

    const product = await this.repository.createProduct({
      ...data,
    });

    if (!product) {
      throw new Error("Erro ao criar produto.");
    }

    return product.id;
  }
}

export { CreateProductUseCase };

