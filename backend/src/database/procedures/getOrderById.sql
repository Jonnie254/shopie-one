CREATE PROCEDURE spGetOrdersByUserId
    @user_id VARCHAR(255)
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
    JOIN OrderItems oi ON o.order_id = oi.order_id
    WHERE o.user_id = @user_id;
END;
