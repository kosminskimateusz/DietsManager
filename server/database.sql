CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_kcal NUMERIC NOT NULL
);