CREATE TABLE Orders (
    order_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    order_date DATETIME DEFAULT GETDATE(),
    total_price FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

SELECT * FROM Orders