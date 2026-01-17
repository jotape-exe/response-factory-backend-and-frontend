import { ApiError } from "../api/ApiError";
import { internalErrorCodes } from "./internal-error-codes";

class ConflictError extends ApiError {
    constructor(message: string) {
        super(
            message,
            409,
            internalErrorCodes.CONFLICT_ERROR,
        )
    }
}

export { ConflictError };

