import dbConfig from '../../config/db.config.js'
import mongoose from 'mongoose'
import ProductModel from './products/product.model.js'

mongoose.Promise    = global.Promise

const db = {}
db.mongoose         = mongoose
db.url              = dbConfig.url
db.products         = ProductModel(mongoose)

export default db