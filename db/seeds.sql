USE EmployeeSystem_DB;

INSERT INTO department (name)
VALUES ("IT"),
("Marketing"),
("Accounting"),
("Sales"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES("Manager", 70000, 2),
("Marketing Associate", 50000, 2),
("Project Manager", 80000, 1),
("Junior Developer", 65000, 1),
("Senior Accountant", 90000, 3),
("Accountant Level I", 55000, 3),
("Sales Manager", 70000, 4),
("Sales Team Member", 55000, 4),
("Manager", 75000, 5),
("Technical Recruiter", 50000, 5);

USE EmployeeSystem_DB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Montana", "Cole", 1, NULL),
("Uzo", "Obeki", 2, 1),
("Zeynab", "Hassan", 3, NULL),
("Dilorah", "Nwegbo", 4, 3),
("Dakota", "Dawson", 5, NULL),
("Denzel", "Deloach", 6, 5),
("Najeeah", "Perryman", 7, NULL),
("Tierney","Waiters", 8, 7),
("Anita", "Reuben-Lartney", 9, NULL),
("Jasmine", "Nicole", 10, 9);



