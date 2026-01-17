import { z } from 'zod';

const createProductSchema = z.object({
    nome: z.string().min(3, "Nome deve ter ao menos 3 letras"),
    descricao: z.string().min(3, "Descrição deve ter ao menos 3 letras").optional(),
    sku: z.string().min(5, "SKU deve ter ao menos 5 caracteres"),
    valor: z.number().positive("Valor deve ser positivo"),
})


export { createProductSchema };

