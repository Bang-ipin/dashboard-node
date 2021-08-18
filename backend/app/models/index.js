import mongoose from 'mongoose'
import ProductModel from './products/product.model.js'
import CategoryModel from './category/category.model.js'
import UserModel from './user/user.model.js'

mongoose.Promise    = global.Promise

const db = {}
db.products         = ProductModel(mongoose)
db.category         = CategoryModel(mongoose)
db.user             = UserModel(mongoose)

export default db