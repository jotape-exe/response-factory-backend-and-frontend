import type { ApiResponse } from '@/types/api.interface'
import type { CreateProductDTO, ProductReponse } from '@/types/product.interface'
import type { AxiosInstance } from 'axios'

const RESOURCE = '/products'

export class ProductService {
  private httpClient: AxiosInstance

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient
  }

  insert(payload: CreateProductDTO): Promise<ApiResponse<{ id: number }>> {
    return this.httpClient.post(RESOURCE, payload)
  }

  getAll(): Promise<ApiResponse<ProductReponse[]>> {
    return this.httpClient.get(RESOURCE) || []
  }

  getById(id: number | string): Promise<ApiResponse<ProductReponse>> {
    return this.httpClient.get(`${RESOURCE}/${id}`)
  }

  delete(id: number | string): Promise<ApiResponse<null>> {
    return this.httpClient.delete(`${RESOURCE}/${id}/delete`)
  }

  seed(): Promise<ApiResponse<{ total: number; inserted: number }>> {
    return this.httpClient.post(`${RESOURCE}/seed`)
  }

  /** endpoint só pra teste de erro */
  forceError500(): Promise<ApiResponse<null>> {
    return this.httpClient.get(`${RESOURCE}/error/500`)
  }
}
