const { prompt } = require("inquirer");
const db = require("db");
const table = require("console.table");
const connection = require("./config/connection");

begin();

function begin() {
    InquirerPrompts();
}

async function InquirerPrompts() {
    const { choice } = await prompt([
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
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return rmvEmployee();
        case "UPDATE_EMPLOYEES_ROLE":
            return updateEmployeeRole();
        case "VIEW_ALL_ROLES":
            return viewAllRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return rmvRole();
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
async function viewEmployees() {
    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);

        InquirerPrompts();
    })
}

async function viewEmployeesDept() {

    var query =
        `SELECT d.id, d.name
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  GROUP BY d.id, d.name`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const deptChoices = res.map(data => ({
            name: data.name,
            value: data.id
        }));

        console.log("\n");
        console.table(res);

        deptPrompt(deptChoices);
    });
}

async function deptPrompt(deptChoices) {
    prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department were you looking for?",
            choices: deptChoices
        }
    ])
        .then(function (answer) {
            console.log("answer ", answer.departmentId);

            var query =
                `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`

            connection.query(query, answer.departmentId, function (err, res) {
                if (err) throw err;

                console.table("response ", res);
                console.log("Here are the employees!\n");

                InquirerPrompts();
            });
        });
}



async function rmvEmployee() {
    var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);

    promptDelete(deleteEmployeeChoices);

    })
}

function promptDelete(deleteEmployeeChoices) {

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
  
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
  
          console.table(res);  
          InquirerPrompts();
        });
      });
  }

async function updateEmployeeRole() {
    employeeArray();
}
async function employeeArray() {
    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);

    roleArray(employeeChoices);
  });
}

async function roleArray(employeeChoices) {
    var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {
  
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to set with the role?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to update?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        connection.query(query,
          [ answer.roleId,  
            answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
  
            InquirerPrompts();
          });
      });
  }

async function viewAllRoles() {

    InquirerPrompts();
}

async function addRole() {
    var query =
        `SELECT d.id, d.name
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const deptChoices = res.map(({ id, name }) => ({
            value: id, name: `${id} ${name}`
        }));

        console.table(res);

        promptAddRole(deptChoices);
    });

}

async function promptAddRole(deptChoices) {
    prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "Role title?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Role Salary"
        },
        {
            type: "list",
            name: "departmentId",
            message: "Department?",
            choices: deptChoices
        },
    ])
        .then(function (answer) {

            var query = `INSERT INTO role SET ?`

            connection.query(query, {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);

                    InquirerPrompts();
                });

        });

}

async function rmvRole() {

    InquirerPrompts();
}

async function viewAllDept() {
 

    InquirerPrompts();
}

async function addDept() {

    InquirerPrompts();
}

async function rmvDept() {

    InquirerPrompts();
}

async function addEmployee() {
    console.log("Inserting an employee!")

    var query =
        `SELECT r.id, r.title, r.salary 
        FROM role r`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res);
        console.log("RoleToInsert!");

        promptAddRole(roleChoices);
    });
    InquirerPrompts();
}

async function promptAddRole(roleChoices) {
    prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
        },
    ])
        .then(function (answer) {
            console.log(answer);

            var query = `INSERT INTO employee SET ?`
            connection.query(query,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log(res.insertedRows + "Inserted successfully!\n");

                    InquirerPrompts();
                });
        });
}

function end() {
    console.log("Goodbye!");
    process.exit();
}


