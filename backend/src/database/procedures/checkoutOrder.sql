CREATE PROCEDURE spCheckout (
    @user_id VARCHAR(255),
    @order_id VARCHAR(255),
    @order_items OrderItemType READONLY,
    @total_price FLOAT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert into Orders table
        INSERT INTO Orders (order_id, user_id, total_price)
        VALUES (@order_id, @user_id, @total_price);

        -- Insert into OrderItems table and update product quantity
        DECLARE @product_id VARCHAR(255);
        DECLARE @quantity INT;
        DECLARE @price FLOAT;

        DECLARE order_cursor CURSOR FOR
        SELECT product_id, quantity, price
        FROM @order_items;

        OPEN order_cursor;
        FETCH NEXT FROM order_cursor INTO @product_id, @quantity, @price;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Insert into OrderItems table
            INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, price)
            VALUES (NEWID(), @order_id, @product_id, @quantity, @price);

            -- Update product quantity in Products table
            UPDATE Products
            SET product_quantity = product_quantity - @quantity
            WHERE product_id = @product_id;

            FETCH NEXT FROM order_cursor INTO @product_id, @quantity, @price;
        END;

        CLOSE order_cursor;
        DEALLOCATE order_cursor;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
