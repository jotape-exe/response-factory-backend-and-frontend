import cors from 'cors'
import express from 'express'
import { createSchema } from './app/config/schema'
import { errorMiddleware } from './app/middlewares/error-middleware'
import { productRoutes } from './app/routes/product.routes'

async function bootstrap() {
    await createSchema()

    const app = express()

    app.use(cors())

    app.use(express.json())
    app.use(productRoutes)
    app.use(errorMiddleware)

    app.listen(3025, () => {
        console.log('🚀 Server is running at 3025')
    })
}

bootstrap()
