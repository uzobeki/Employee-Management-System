USE EmployeeSystem_DB;

INSERT INTO department (name)
VALUES ("IT"),
("Marketing"),
("Accounting"),
("Sales"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES("Manager", 70000, 2),
("Project Manager", 80000, 1),
("Junior Developer", 65000, 1)
("Accountant Level III", )
("Accountant Level I", 55000, 3),
("Sales Team Lead", 60000, 4)
("Manager", 75000, 5)
("Technical Recruiter", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)

