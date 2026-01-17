
import { ApiError } from "../api/ApiError";
import { internalErrorCodes } from "./internal-error-codes";


export class SchemaValidationError extends ApiError {
    constructor(message: string, details: any | null = null) {
        super(message, 409, internalErrorCodes.SCHEMA_VALIDATION_ERROR, details);
    }
}
