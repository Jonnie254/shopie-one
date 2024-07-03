import mssql from 'mssql';
import { v4 } from 'uuid';
import { sqlconfig } from '../config/sql.config';
import { OrderDetails, CheckoutDetails } from '../models/orders.interface';

export class orderService {

    async placeOrder(orderDetails: CheckoutDetails) {
        let pool = await mssql.connect(sqlconfig);
        let order_id = v4();

        // Create a table-valued parameter for order items
        const tvp = new mssql.Table();
        tvp.columns.add('product_id', mssql.NVarChar(255));
        tvp.columns.add('quantity', mssql.Int);
        tvp.columns.add('price', mssql.Float);

        orderDetails.order_items.forEach(item => {
            tvp.rows.add(item.product_id, item.quantity, item.price);
        });
        console.log('User ID:', orderDetails.user_id);
        try {
            await pool.request()
                .input('user_id', mssql.NVarChar(255), orderDetails.user_id)
                .input('order_id', mssql.NVarChar(255), order_id)
                .input('order_items', tvp)
                .input('total_price', mssql.Float, orderDetails.total_price)
                .execute('spCheckout');

            return {
                message: 'Order placed and checked out successfully.'
            };
        } catch (error) {
            console.error('SQL ERROR', error);
            throw error;
        }
    }
}
