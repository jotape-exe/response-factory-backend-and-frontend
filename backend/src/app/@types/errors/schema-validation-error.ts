
import { ApiError } from "../api/ApiError";
import { internalErrorCodes } from "./internal-error-codes";


export class SchemaValidationError extends ApiError {
    constructor(message: string) {
        super(message, 409, internalErrorCodes.SCHEMA_VALIDATION_ERROR);
    }
}
