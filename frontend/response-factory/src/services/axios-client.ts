import type { ApiResponse } from '@/types/api.interface'
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosResponse
} from 'axios'

export const useAxiosClient = () => {
    const api = axios.create({
        baseURL: 'http://localhost:3025'
    })

    api.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => Promise.reject(error)
    )

    api.interceptors.response.use(
        (response: AxiosResponse) => {
            return response.data;
        },
        (err: AxiosError<ApiResponse<unknown>>) => {
            if (err.response?.data) {
                return err.response.data
            }

            const errorResponse: ApiResponse<null> = {
                success: false,
                status: 0,
                message: 'Erro de conexão com o servidor',
                body: null
            }

            return errorResponse
        }
    )

    return api as AxiosInstance
}
