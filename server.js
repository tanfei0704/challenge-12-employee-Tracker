const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'company_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the company_db database.`);
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Delete a Department',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View All Departments':
          db.query('SELECT * FROM department', (err, results) => {
            if (err) throw err;
            console.log('Viewing all departments:');
            console.table(results);
            init();
          });
          break;
        case 'View All Roles':
          db.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;
            console.log('Viewing all roles:');
            console.table(results);
            init();
          });
          break;
        case 'View All Employees':
          db.query('SELECT * FROM employee', (err, results) => {
            if (err) throw err;
            console.log('Viewing all employees:');
            console.table(results);
            init();
          });
          break;
        case 'Add a Department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: (departmentInput) => {
                  if (departmentInput) {
                    return true;
                  } else {
                    console.log('Please add a department!');
                    return false;
                  }
                },
              },
            ])
            .then((answers) => {
              db.query(
                'INSERT INTO department (name) VALUES (?)',
                answers.department,
                (err) => {
                  if (err) throw err;
                  console.log(`Added ${answers.department} to the database.`);
                  init();
                }
              );
            });
          break;

        case 'Add a Role':
          // Query the database to get department names
          db.query('SELECT * FROM department', (err, departments) => {
            if (err) throw err;
            // Create an array of department names for Inquirer choices
            const departmentChoices = departments.map(department => department.name);
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'role',
                  message: 'What is the name of the role?',
                  validate: roleInput => {
                    if (roleInput) {
                      return true;
                    } else {
                      console.log('Please add a role!');
                      return false;
                    }
                  },
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'What is the salary of the role?',
                  validate: salaryInput => {
                    if (!isNaN(salaryInput)) {
                      return true;
                    } else {
                      console.log('Please add a valid salary!');
                      return false;
                    }
                  },
                },
                {
                  type: 'list',
                  name: 'department',
                  message: 'Which department does the role belong to?',
                  choices: departmentChoices,
                },
              ])
              .then(answers => {
                // Find the department ID based on the chosen department name
                const selectedDepartment = departments.find(department => department.name === answers.department);
                // Insert the new role into the database
                db.query(
                  'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                  [answers.role, parseFloat(answers.salary), selectedDepartment.id],
                  err => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`);
                    init();
                  }
                );
              });
          });
          break;
        case 'Add an Employee':
          db.query('SELECT * FROM role', (err, roles) => {
            if (err) throw err;
            const roleChoices = roles.map(role => role.title);
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: "Enter the employee's first name:",
                  validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log("Please enter the employee's first name!");
                      return false;
                    }
                  },
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: "Enter the employee's last name:",
                  validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log("Please enter the employee's last name!");
                      return false;
                    }
                  },
                },
                {
                  type: 'list',
                  name: 'role',
                  message: "Select the employee's role:",
                  choices: roleChoices,
                },
                {
                  type: 'input',
                  name: 'manager',
                  message: "Enter the employee's manager's ID (if applicable):",
                },
              ])
              .then(employeeAnswers => {
                // Find the role ID based on the chosen role name
                const selectedRole = roles.find(role => role.title === employeeAnswers.role);
                // Insert the new employee into the database
                db.query(
                  'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                  [employeeAnswers.firstName, employeeAnswers.lastName, selectedRole.id, employeeAnswers.manager || null],
                  err => {
                    if (err) throw err;
                    console.log(`Added ${employeeAnswers.firstName} ${employeeAnswers.lastName} to the database.`);
                    init();
                  }
                );
              });
          });
          break;
        case 'Delete a Department':
          // Implement the code for deleting a department
          db.query('SELECT * FROM department', (err, departments) => {
            if (err) throw err;
            const departmentChoices = departments.map(department => department.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'department',
                  message: 'Which department would you like to delete?',
                  choices: departmentChoices,
                },
              ])
              .then(departmentAnswer => {
                const departmentName = departmentAnswer.department;
                const department = departments.find(d => d.name === departmentName);
                db.query('DELETE FROM department WHERE id = ?', [department.id],
                  (err,result) => {
                    if (err) {
                      console.log(err);
                    };
                    console.log(`Deleted department: ${departmentName}`);
                    console.log(result);
                    init();
                  }
                );
              });
          });
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit();
          break;
      }
    });
}
