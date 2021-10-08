import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../backend/config/db.config.js'
import routes from './app/routes/routes.js'
import ErrorHandler from './app/middleware/error.js'

dotenv.config()
const app               = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectDB();
routes(app)

app.use(ErrorHandler);

const PORT      = process.env.APP_PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))