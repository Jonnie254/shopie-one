CREATE PROCEDURE spGetAllOrders
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        o.order_id,
        o.user_id,
        o.order_date,
        o.total_price,
        oi.order_item_id,
        oi.product_id,
        oi.quantity,
        oi.price
    FROM Orders o
    JOIN OrderItems oi ON o.order_id = oi.order_id;
END;
