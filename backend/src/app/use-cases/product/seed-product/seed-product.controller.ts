import { Request, Response } from "express";
import { ApiResponseFactory } from "../../../@types/api/reponse.factory";
import { SeedProductsUseCase } from "./seed-product.use-case";

export class SeedProductsController {
    constructor(
        private seedProductsUseCase: SeedProductsUseCase
    ) { }

    async handler(req: Request, res: Response) {
        const result = await this.seedProductsUseCase.execute();

        return res.status(201).json(
            ApiResponseFactory.success(
                result,
                "Carga inicial executada com sucesso",
                201
            )
        );
    }
}
