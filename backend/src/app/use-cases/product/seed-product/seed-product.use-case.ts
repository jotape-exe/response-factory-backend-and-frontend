import { ProductRepository } from "../product.repository";

interface SeedProduct {
  nome: string;
  descricao: string;
  sku: string;
  valor: number;
}

export class SeedProductsUseCase {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute() {
    const products: SeedProduct[] = [
      {
        nome: "Notebook Dell",
        descricao: "Notebook para trabalho",
        sku: "NOTE-DELL-001",
        valor: 4500,
      },
      {
        nome: "Mouse Logitech",
        descricao: "Mouse sem fio",
        sku: "MOUSE-LOG-001",
        valor: 250,
      },
      {
        nome: "Teclado Mecânico",
        descricao: "Teclado gamer",
        sku: "KEY-MECH-001",
        valor: 600,
      },
    ];

    let inserted = 0;

    for (const product of products) {
      const exists = await this.productRepository.findBySku(product.sku);

      if (!exists) {
        await this.productRepository.createProduct(product);
        inserted++;
      }
    }

    return {
      total: products.length,
      inserted,
    };
  }
}
