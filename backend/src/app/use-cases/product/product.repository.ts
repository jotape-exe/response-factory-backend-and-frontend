import { db } from "../../config/database";
import { Product } from "../../models/product/product.model";
import { CreateProductDTO } from "./create-product/create-product.dto";
import { ProductReponse } from "./list-product/list-product.dto";
import { UpdateProductDTO } from "./update-product/update-product.dto";

const TABLE_NAME = "products"

class ProductRepository {
    async findById(id: number): Promise<Product | null> {
        const Product = await db(TABLE_NAME)
            .where({ id })
            .first();

        return Product ?? null;
    }

    async findBySku(sku: string): Promise<Product | null> {
        const Product = await db(TABLE_NAME)
            .where("sku", sku)
            .first();

        return Product ?? null;
    }

    async createProduct(data: CreateProductDTO): Promise<Pick<Product, "id"> | null> {
        const [createdProduct] = await db(TABLE_NAME)
            .insert({
                nome: data.nome,
                descricao: data.descricao,
                valor: data.valor,
                sku: data.sku,
                isDeleted: false
            })
            .returning(["id"]);

        return createdProduct ?? null;
    }

    async update(data: UpdateProductDTO): Promise<Product> {
        const { id, ...fields } = data;

        await db(TABLE_NAME)
            .where({ id })
            .update({
                ...fields,
                updated_at: new Date(),
            });

        const updatedAdmin = await db(TABLE_NAME)
            .where({ id })
            .first();

        if (!updatedAdmin) {
            throw new Error("Erro ao atualizar administrador.");
        }

        return updatedAdmin;
    }

    async findAll(): Promise<ProductReponse[]> {
        const data = await db(TABLE_NAME)
            .select()
            .where("isDeleted", false);

        return data;
    }

}

export { ProductRepository };

