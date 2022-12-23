const express = require('express')
require('express-async-errors')
require('dotenv').config()
const connectDB = require('./db/connect')
const app = express()
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req, res) => console.log('home page'))
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening on ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()
