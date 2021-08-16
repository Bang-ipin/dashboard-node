import express from 'express';
import ProductsController from '../controllers/products/products.controller.js';

const productrouter = express.Router();

const routes = (app) => {

    productrouter.get('/', ProductsController.findAll)
    productrouter.post('/', ProductsController.create)
    productrouter.get('/:id', ProductsController.findOne)
    productrouter.put('/:id', ProductsController.update)
    productrouter.delete('/:id', ProductsController.delete)

    app.use('/api/products', productrouter)
}
export default routes
