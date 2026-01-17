import { Request, Response } from "express";
import { ApiResponseFactory } from "../../../@types/api/reponse.factory";
import { SchemaValidationError } from "../../../@types/errors/schema-validation-error";
import { createProductSchema } from "./create-product.schema";
import { CreateProductUseCase } from "./create-product.use-case";

class CreateProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
  ) { }

  async handler(request: Request, response: Response) {
    const payload = await createProductSchema
      .parseAsync(request.body)
      .catch((err) => {
        throw new SchemaValidationError(
          "Erro ao inserir, verifique os campos",
          JSON.parse(err.message)
        );
      });

    const productId = await this.createProductUseCase.execute(payload);

    return response
      .status(201)
      .json(
        ApiResponseFactory.success(
          { id: productId },
          "Produto criado com sucesso",
          201
        )
      );
  }
}

export { CreateProductController };

