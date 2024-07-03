export interface OrderDetails {
    product_id: string;
    quantity: number;
    price: number;
}

export interface CheckoutDetails {
    user_id: string;
    order_id: string;
    order_items: OrderDetails[];
    total_price: number;
}
