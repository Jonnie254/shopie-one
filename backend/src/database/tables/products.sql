CREATE TABLE Products(product_id VARCHAR(255) PRIMARY KEY NOT NULL, product_name VARCHAR(255) NOT NULL,
product_description VARCHAR(255) NOT NULL, product_image VARCHAR(255) NOT NULL, product_price FLOAT NOT NULL)

ALTER TABLE Products
ADD product_quantity INT NOT NULL DEFAULT 0, 
    product_category VARCHAR(255) NOT NULL;


SELECT * FROM Products