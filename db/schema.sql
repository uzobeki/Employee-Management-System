DROP DATABASE EmployeeSystem_DB;

CREATE DATABASE EmployeeSystem_DB;

USE EmployeeSystem_DB;

-- Department Table
DROP TABLE if exists department;

CREATE TABLE department(
    id INT auto_increment KEY NOT NULL,
    name VARCHAR(40)
);

-- Role Table
DROP TABLE if exists role;

CREATE TABLE role(
    id INT auto_increment PRIMARY KEY NOT NULL,
    title VARCHAR(40),
    salary DECIMAL(6,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Employee Table
DROP TABLE if exists employee;

CREATE TABLE employee(
    id INT auto_increment PRIMARY KEY NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES manager(id) ON SET NULL
);