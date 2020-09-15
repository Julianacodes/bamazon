CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name,department_name,price,stock_quantity) 
VALUES ("chapstick","cosmetics", 2.50, 10),
("hat", "clothing", 10, 20),
("mug", "household", 8, 30),
("pen", "office", 1, 25),
("lotion", "cosmetics", 4,15 ),
("cookbook", "household", 12, 10),
("notebook", "office", 3, 18),
("waterbottle", "hosehold", 9, 23),
("shirt", "clothing", 20, 40),
("socks", "clothing", 2, 16);


