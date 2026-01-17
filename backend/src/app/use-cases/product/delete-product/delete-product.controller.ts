import { Request, Response } from "express";
import { ApiResponseFactory } from "../../../@types/api/reponse.factory";
import { ConflictError } from "../../../@types/errors/conflict-error";
import { DeleteProductUseCase } from "./delete-product.use-case";


class DeleteProductController {
    constructor(
        private deleteProductUseCase: DeleteProductUseCase,
    ) { }
    async handler(request: Request, response: Response) {

        const idParam = request.params?.id

        if (!idParam) {
            throw new ConflictError("Informe um produto valido")
        }

        const data = await this.deleteProductUseCase.execute(idParam)
        
        return response
            .status(200)
            .json(
                ApiResponseFactory.success(
                    data,
                    "Produto excluido com sucesso!",
                )
            );
    }
}

export { DeleteProductController };

