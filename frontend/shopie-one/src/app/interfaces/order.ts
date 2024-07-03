export interface OrderDetails {
  product_name: string;
  product_id?: string;
  quantity: number;
  price: number;
}
export interface CartItem {
  product: OrderDetails;
  quantity: number;
}
