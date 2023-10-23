-- Insert data into the 'department' table
INSERT INTO department (id, name)
VALUES
    (1, 'HR'),
    (2, 'Sales'),
    (3, 'Engineering'),
    (4, 'Marketing'),
    (5, 'Finance'),
    (6, 'IT');

-- Insert data into the 'role' table
INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'HR Manager', 60000.00, 1),
    (2, 'Sales Representative', 50000.00, 2),
    (3, 'Software Engineer', 75000.00, 3),
    (4, 'Marketing Specialist', 55000.00, 4),
    (5, 'Financial Analyst', 65000.00, 5),
    (6, 'Database Administrator', 70000.00, 6);

-- Insert data into the 'employee' table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, NULL),  -- HR Manager (No manager)
    (2, 'Alice', 'Smith', 2, 1),   -- Sales Rep, Managed by John Doe
    (3, 'Bob', 'Johnson', 3, NULL), -- Software Engineer (No manager)
    (4, 'Eva', 'Brown', 4, 1),     -- Marketing Specialist, Managed by John Doe
    (5, 'Sarah', 'Miller', 5, NULL),   -- Financial Analyst (No manager)
    (6, 'Michael', 'Clark', 6, 6);     -- Database Administrator, Managed by self
