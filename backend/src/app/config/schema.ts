import { db } from "./database";

export async function createSchema() {
    const hasProductsTable = await db.schema.hasTable("products");

    if (!hasProductsTable) {
        await db.schema.createTable("products", (table) => {
            table.increments("id").primary();
            table.string("nome").notNullable();
            table.string("descricao");
            table.string("sku").notNullable().unique();
            table.decimal("valor", 10, 2).notNullable();
            table.boolean("isDeleted").defaultTo(false);

            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at");
        });
    }
}
