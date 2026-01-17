import { ApiError } from "../api/ApiError";
import { internalErrorCodes } from "./internal-error-codes";

export class NotFoundError extends ApiError {
    constructor(resource: string) {
        super(
            `${resource} não encontrado`,
            404,
            internalErrorCodes.NOT_FOUND_ERROR,
        )
    }
}
