const inquirer = require("inquirer");
// const db = require("./db");
const table = require("console.table");

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

    async function viewEmployees() {
        const employees = await db.findAllEmployees();

        console.log("\n");
        console.table(employees);

        InquirerPrompts();
    }

    async function viewEmployeesDept() {
        const department = await db.findAllDepartments();

        const deptChoices = department.map(({id, name}) => ({
            name: name,
            value: id
        }));

        const {departmentId} = await prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Which department were you looking for?",
                choices: deptChoices
            }
        ]);

        const employees = await db.findAllEmployeesbyDepartment(departmentId);

        console.log("\n");
        console.table(employees);

        InquirerPrompts();
    }

    async function viewEmployeesMngr(){
        const managers = await db.findAllEmployees();

        const mngrChoices = managers.map(({id, first_name, last_name})=> ({
            name: `${first_name} ${last_name}`,
            value: id
        }))

        const {managerId} = await prompt ([
            {
                type: "list",
                name: "managerId",
                message: "Which employee do you want to see direct reports for?",
                choices: mngrChoices
            }
        ]);

        const employees = await db.findAllEmployeesbyManager(managerId);

        console.log("\n");

        if (employees.length === 0) {
            console.log("The selected employee has no direct reports.");
        } else {
            console.table(employees);
        }

        InquirerPrompts();
    }

    async function rmvEmployee() {
        const employees = await db.findAllEmployees();
      
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee do you want to remove?",
            choices: employeeChoices
          }
        ]);
      
        await db.rmvEmployee(employeeId);
      
        console.log("Removed employee from the database");
      
        InquirerPrompts();
    }

    async function updateEmployeeRole() {
        const employees = await db.findAllEmployees();
      
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
          }
        ]);
      
        const roles = await db.findAllRoles();
      
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = await prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
          }
        ]);
      
        await db.updateEmployeeRole(employeeId, roleId);
      
        console.log("Updated employee's role");
      
        InquirerPrompts();
    }

    async function updateEmployeeMngr() {
        const employees = await db.findAllEmployees();
      
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's manager do you want to update?",
            choices: employeeChoices
          }
        ]);
      
        const managers = await db.findAllPossibleManagers(employeeId);
      
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { managerId } = await prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices
          }
        ]);
      
        await db.updateEmployeeMngr(employeeId, managerId);
      
        console.log("Updated employee's manager");
      
        InquirerPrompts();
    }

    async function viewAllRoles() {
        const roles = await db.findAllRoles();
      
        console.log("\n");
        console.table(roles);
      
        InquirerPrompts();
      }
      
      async function addRole() {
        const departments = await db.findAllDepartments();
      
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const role = await prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
          }
        ]);
      
        await db.createRole(role);
      
        console.log(`Added ${role.title} to the database`);
      
        InquirerPrompts();
      }
}
