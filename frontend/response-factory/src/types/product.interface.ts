export interface Product {
  id: number
  nome: string
  descricao: string
  sku: string
  valor: number
  isDeleted: boolean
}

export interface CreateProductDTO {
  nome: string
  descricao?: string
  sku: string
  valor: number
}

export interface ProductReponse extends Product {}
