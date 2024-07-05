CREATE PROCEDURE spGetAllOrders
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        o.order_id,
        o.user_id,
        u.username,
        o.order_date,
        o.total_price,
        oi.order_item_id,
        oi.product_id,
        p.product_name,
        oi.quantity,
        oi.price
    FROM Orders o
    JOIN OrderItems oi ON o.order_id = oi.order_id
    JOIN Users u ON o.user_id = u.user_id
    JOIN Products p ON oi.product_id = p.product_id;
END;

