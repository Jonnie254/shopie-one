CREATE OR ALTER PROCEDURE createProduct(
    @product_id VARCHAR(255),
    @product_name VARCHAR(255),
    @product_description VARCHAR(255),
    @product_image VARCHAR(255),
    @product_price DECIMAL(10,2),
    @product_quantity INT,
    @product_category VARCHAR(255)
)AS
BEGIN
    INSERT INTO Products(product_id, product_name, product_description, product_image, product_price, product_quantity, product_category)
    VALUES(@product_id, @product_name, @product_description, @product_image, @product_price, @product_quantity, @product_category)
END