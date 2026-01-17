import { useAxiosClient } from "@/services/axios-client"
import { ProductService } from "./product.service"



export interface Services {
    product: ProductService
}

export const useAPI = () => {

    const client = useAxiosClient()

    const services: Services = {
        product: new ProductService(client),
    }

    return {
        services,
    }

}