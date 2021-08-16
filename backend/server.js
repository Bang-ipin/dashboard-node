import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './app/models/index.js'
import routes from './app/routes/routes.js'

dotenv.config()
const app               = express()
const dbConnect         = db

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

db.mongoose
.connect(dbConnect.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
.then(()        =>{
    console.log(`Database connected success!`)
}).catch((err)  =>{
    console.log(`Cannot Connect to the database!`,err)
    process.exit()
});

const PORT      = process.env.APP_PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

routes(app)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))