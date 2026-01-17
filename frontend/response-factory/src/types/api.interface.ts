export interface ApiErrorBody {
    code: string
    details?: unknown
}

export interface ApiSuccess<T> {
    success: true
    status: number
    message: string
    body: T
}

export interface ApiError<E = ApiErrorBody> {
    success: false
    status: number
    message: string
    error: E
}


export type ApiResponse<T, E = ApiErrorBody> =
    | ApiSuccess<T>
    | ApiError<E>
