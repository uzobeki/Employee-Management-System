const inquirer = require("inquirer");
const db = require("./db");
const table = require("console.table");
const { allowedNodeEnvironmentFlags } = require("node:process");
const { endianness } = require("node:os");

begin();

function begin() {
    InquirerPrompts();
}

async function InquirerPrompts() {
    const {choice} = await prompt([
        {
            type: "list",
            name: "choice",
            message: "Hello. What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
                {
                    name: "View All Employees by Department",
                    value: "VIEW_ALL_EMPLOYEES_DEPARTMENT"
                },
                {
                    name: "View All Employees by Manager",
                    value: "VIEW_ALL_EMPLOYEES_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEES_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALL_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_ALL_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_ALL_EMPLOYEES":
            return viewEmployees();
        case "VIEW_ALL_EMPLOYEES_DEPARTMENT":
            return viewEmployeesDept();
        case "VIEW_ALL_EMPLOYEES_MANAGER":
            return viewEmployeesMngr();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return rmvEmployee();
        case "UPDATE_EMPLOYEES_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeMngr();
        case "VIEW_ALL_ROLES":
            return viewAllRoles();
        case "ADD_ROLE":
            return addRole();
        case "VIEW_ALL_DEPARTMENTS":
            return viewAllDept();
        case "ADD_DEPARTMENT":
            return addDept();
        case "REMOVE_DEPARTMENT":
            return rmvDept();
        default:
            return end();
    }
}
