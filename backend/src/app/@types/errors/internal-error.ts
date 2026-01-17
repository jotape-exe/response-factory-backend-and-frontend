import { ApiError } from "../api/ApiError";
import { internalErrorCodes } from "./internal-error-codes";

export class InternalError extends ApiError {
    constructor() {
        super(
            "Erro inesperado. Tente novamente mais tarde",
            500,
            internalErrorCodes.INTERNAL_ERROR,
        )
    }
}
