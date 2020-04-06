drop database if exists elixia_dispatch;
create database elixia_dispatch;

\c elixia_dispatch;


CREATE TABLE users (
user_id VARCHAR(6) NOT NULL PRIMARY KEY, user_name VARCHAR(30),user_email VARCHAR(30),user_address VARCHAR(30),user_password VARCHAR(30)
);

CREATE TABLE table_seq (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE destination_table_seq (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE source_master (
source_id VARCHAR(7) NOT NULL PRIMARY KEY DEFAULT '0', source_name VARCHAR(30)
);

DROP TRIGGER IF EXISTS tg_source_master_BEFORE_INSERT;

DELIMITER $$
CREATE TRIGGER tg_source_master_BEFORE_INSERT
BEFORE INSERT ON source_master
FOR EACH ROW
BEGIN
  INSERT INTO table_seq VALUES (NULL);
  SET NEW.source_id = CONCAT('S', LPAD(LAST_INSERT_ID(), 3, '0'));
END$$
DELIMITER ;


CREATE TABLE destination_master (
destn_code VARCHAR(7) NOT NULL PRIMARY KEY DEFAULT '0', destn_name VARCHAR(30)
);

DROP TRIGGER IF EXISTS tg_destination_master_BEFORE_INSERT;
DELIMITER $$
CREATE TRIGGER tg_destination_master_BEFORE_INSERT
BEFORE INSERT ON destination_master
FOR EACH ROW
BEGIN
  INSERT INTO destination_table_seq VALUES (NULL);
  SET NEW.destn_code = CONCAT('D', LPAD(LAST_INSERT_ID(), 3, '0'));
END$$
DELIMITER ;



CREATE TABLE transporter_table_seq(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
)

CREATE TABLE transporter_master
(
  transporter_code VARCHAR(7) NOT NULL PRIMARY KEY DEFAULT '0', transporter_name VARCHAR(30)
);

DROP TRIGGER IF EXISTS tg_transporter_master_BEFORE_INSERT;
DELIMITER $$
CREATE TRIGGER tg_transporter_master_BEFORE_INSERT
BEFORE INSERT ON transporter_master
FOR EACH ROW
BEGIN
  INSERT INTO transporter_table_seq VALUES (NULL);
  SET NEW.transporter_code = CONCAT('T', LPAD(LAST_INSERT_ID(), 3, '0'));
END$$
DELIMITER ;


CREATE TABLE dispatch (
delivery_number INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
source_code VARCHAR(10),
    CONSTRAINT fk_source_code
    FOREIGN KEY (source_code) 
        REFERENCES source_master(source_id),
destination_code VARCHAR(10),
    CONSTRAINT fk_destination_code
    FOREIGN KEY (destination_code) 
        REFERENCES destination_master(destn_code),
transporter_code VARCHAR(10),
    CONSTRAINT fk_transporter_code
    FOREIGN KEY (transporter_code) 
        REFERENCES transporter_master(transporter_code),
vehicle_number VARCHAR(15),
start_date DATE,
end_date DATE
);