import express from 'express';
import { OrderController } from '../controllers/order.controller';

const order_router = express.Router();

let controller = new OrderController();

order_router.post('/place-order', controller.placeOrder);
order_router.get('/all-orders', controller.getAllOrders);
order_router.get('/user-orders/:user_id', controller.getOrdersByUserId);

export default order_router;
