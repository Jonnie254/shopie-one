import { Request, Response } from "express";
import { orderService } from "../services/order.service";

let orderServiceInstance = new orderService();

export class OrderController {
    async placeOrder(req: Request, res: Response) {
        try {
            let { user_id, order_id, order_items, total_price } = req.body;

            let result = await orderServiceInstance.placeOrder({
                user_id,
                order_id,
                order_items,
                total_price
            });
            return res.status(201).json(result);
        } catch (error) {
            return res.json({
                error: "Error placing order"
            });
        }
    }

    async getAllOrders(req: Request, res: Response) {
        try {
            let orders = await orderServiceInstance.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
            return res.json({
                error: "Error fetching orders"
            });
        }
    }

    async getOrdersByUserId(req: Request, res: Response) {
        try {
            let user_id = req.params.user_id;
            let orders = await orderServiceInstance.getOrdersByUserId(user_id);
            return res.status(200).json(orders);
        } catch (error) {
            return res.json({
                error: "Error fetching user orders"
            });
        }
    }
}
