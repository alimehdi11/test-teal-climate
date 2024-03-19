CREATE TABLE  activatedata(
    id INT AUTO_INCREMENT PRIMARY KEY,
    scope VARCHAR(255),
    business_unit VARCHAR(100),
    fuel_category VARCHAR(100),
    level_1 VARCHAR(100),
    level_2 VARCHAR(100),
    level_3 VARCHAR(100),
    level_4 VARCHAR(100),
    level_5 VARCHAR(100),
    uom VARCHAR(50),
    quantity DECIMAL(10, 2),
    kg_co2e DECIMAL(10, 2),
    kg_co2e_of_co2e DECIMAL(10, 2),
    kg_co2e_of_ch4 DECIMAL(10, 2),
    kg_co2e_of_n2o DECIMAL(10, 2)
);
