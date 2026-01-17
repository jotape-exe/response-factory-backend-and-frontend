import { ApiError } from "./ApiError"
import { ApiErrorPayload } from "./ApiErrorPayload"
import { ApiResponseError, ApiResponseSuccess } from "./ApiResponse"

export class ApiResponseFactory {

    static success<T>(
        body: T,
        message = 'Success',
        status = 200
    ): ApiResponseSuccess<T> {
        return {
            success: true,
            status,
            message,
            body
        }
    }

    static error(
        error: ApiError
    ): ApiResponseError<ApiErrorPayload> {
        return {
            success: false,
            status: error.statusCode,
            message: error.message,
            error: {
                code: error.internalCode,
                details: error.details
            }
        }
    }
}
