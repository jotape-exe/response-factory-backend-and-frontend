import { Request, Response } from "express";
import { ApiResponseFactory } from "../../../@types/api/reponse.factory";
import { ConflictError } from "../../../@types/errors/conflict-error";
import { FindProductByIdUseCase } from "./find-product-by-id.use-case";

class FindProductByIdController {
    constructor(
        private findProductByIdUseCase: FindProductByIdUseCase,
    ) { }
    async handler(request: Request, response: Response) {
        const idParam = request.params?.id

        if (!idParam) {
            throw new ConflictError("Informe um produto valido")
        }

        const data = await this.findProductByIdUseCase.execute(idParam)
        return response
            .status(200)
            .json(
                ApiResponseFactory.success(
                    data,
                    "Produto com id encontrado com sucesso!",
                )
            )
    }
}

export { FindProductByIdController };

