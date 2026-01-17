import { Request, Response } from "express";
import { ApiResponseFactory } from "../../../@types/api/reponse.factory";
import { ListProductUseCase } from "./list-product.use-case";
;

class ListProductController {
    constructor(
        private listProductUseCase: ListProductUseCase,
    ) { }
    async handler(request: Request, response: Response) {
        const data = await this.listProductUseCase.execute()

        return response
            .status(200)
            .json(
                ApiResponseFactory.success(
                    data,
                    "Consulta realizada com sucesso!",
                )
            );
    }
}

export { ListProductController };

