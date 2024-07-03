import express from 'express';
import { OrderController } from '../controllers/order.controller';

const order_router = express.Router();

let controller = new OrderController();

order_router.post('/place-order', controller.placeOrder);

export default order_router;
