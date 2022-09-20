DROP DATABASE IF EXISTS tailgate_db;
CREATE DATABASE tailgate_db;

use tailgate_db

CREATE TABLE users (
  id INT AUTO_INCREMENT ,
  first_name CHAR(120) NOT NULL,
  last_name CHAR(120) NOT NULL,
  email_address CHAR(120) NOT NULL,
  password CHAR NOT NULL,
  PRIMARY KEY (id)
);
		
CREATE TABLE events (
  id INT AUTO_INCREMENT,
  event_name CHAR NOT NULL,
  event_location CHAR NOT NULL,
  event_date DATE NOT NULL,
  host_id INT DEFAULT NULL,
  PRIMARY KEY (id)
);
		
CREATE TABLE meals (
  id INT AUTO_INCREMENT,
  item_name CHAR NOT NULL,
  item_type CHAR NOT NULL,
  dietary CHAR,
  event_id INT,
  user_id INT,
  PRIMARY KEY (id)
);

ALTER TABLE events ADD FOREIGN KEY (host_id) REFERENCES users (id);
ALTER TABLE meals ADD FOREIGN KEY (event_id) REFERENCES events (id);
ALTER TABLE meals ADD FOREIGN KEY (user_id) REFERENCES users (id);
