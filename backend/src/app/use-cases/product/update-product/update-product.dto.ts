import { CreateProductDTO } from "../create-product/create-product.dto";

export interface UpdateProductDTO extends CreateProductDTO {
    id: number
}