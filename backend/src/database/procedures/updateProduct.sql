    CREATE OR ALTER PROCEDURE updateProduct(
            @product_id VARCHAR(255),
            @product_name VARCHAR(255),
            @product_description VARCHAR(255),
            @product_image VARCHAR(255),
            @product_price DECIMAL(10,2),
            @product_quantity INT,
            @product_category VARCHAR(255)
    )
AS
BEGIN
    UPDATE Products SET product_name = @product_name, product_description = @product_description, product_image = @product_image, product_price = @product_price, product_quantity = @product_quantity, product_category = @product_category WHERE product_id = @product_id
END