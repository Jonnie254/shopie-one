import express from 'express'
import { ProductController} from '../controllers/product.controller'

const product_router = express.Router();

let controller = new ProductController();

product_router.post('/create', controller.createItem);
product_router.get('/all-products', controller.fetchAllItems);
product_router.get('/:product_id', controller.fetchSingleItem);
product_router.put('/:product_id', controller.updateItem);
product_router.delete('/:product_id', controller.deleteItem)

export default product_router;