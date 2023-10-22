-- Inserting sample values into the department table
INSERT INTO department (id, name)
VALUES
    (1, 'Human Resources'),
    (2, 'Information Technology'),
    (3, 'Finance'),
    (4, 'Marketing');

-- Inserting sample values into the role table
INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'HR Manager', 60000.00, 1),
    (2, 'IT Engineer', 75000.00, 2),
    (3, 'Financial Analyst', 55000.00, 3),
    (4, 'Marketing Specialist', 60000.00, 4);

-- Inserting sample values into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, NULL), -- John Doe is an HR Manager and has no manager
    (2, 'Alice', 'Smith', 2, 1), -- Alice Smith is an IT Engineer, and John Doe is her manager
    (3, 'David', 'Johnson', 3, NULL), -- David Johnson is a Financial Analyst and has no manager
    (4, 'Mary', 'Brown', 4, 1); -- Mary Brown is a Marketing Specialist, and John Doe is her manager
