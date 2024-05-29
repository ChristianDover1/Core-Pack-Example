import { db } from "@vercel/postgres";


export default async function populateDB(){
    const client = await db.connect();

    await client.query(`
    CREATE TABLE IF NOT EXISTS employees (
        employee_id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    await client.query(`
    CREATE TABLE IF NOT EXISTS customers (
        customer_id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        company_name VARCHAR(50) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    await client.query(`
    CREATE TABLE IF NOT EXISTS jobs (
        job_id SERIAL PRIMARY KEY,
        job_name VARCHAR(100) NOT NULL UNIQUE,
        total_items integer NOT NULL,
        finished_items integer NOT NULL,
        employee_id integer references employees(employee_id),
        customer_id integer references customers(customer_id),        
        company_name VARCHAR(50) NOT NULL,
        expected_finish_date TIMESTAMP Null,
        actual_finish_date TIMESTAMP Null,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );

    await client.query(`CREATE TABLE IF NOT EXISTS notes (
        note_id SERIAL PRIMARY KEY,
        job_id INTEGER NOT NULL,
        note TEXT NOT NULL,
        photo_url VARCHAR(255) NOT NULL,
        user_type VARCHAR(50) NOT NULL,
        user_id INTEGER NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs(job_id),
        CHECK (user_type IN ('customer', 'employee'))
    );`
    );

    //Join tables
    
    await client.query(`CREATE TABLE IF NOT EXISTS employee_jobs (
        employee_id integer references employees(employee_id),
        job_id integer references jobs(job_id),
        PRIMARY KEY (employee_id, job_id));`
    );

    await client.query(`CREATE TABLE IF NOT EXISTS note_jobs (
        note_job_id SERIAL PRIMARY KEY,
        job_id INTEGER NOT NULL,
        customer_note_id INTEGER,
        employee_note_id INTEGER,
        FOREIGN KEY (job_id) REFERENCES jobs(job_id),
        FOREIGN KEY (customer_note_id) REFERENCES customer_notes(customer_notes_id),
        FOREIGN KEY (employee_note_id) REFERENCES employee_notes(employee_notes_id),
        CHECK (
            (customer_note_id IS NOT NULL AND employee_note_id IS NULL) OR 
            (customer_note_id IS NULL AND employee_note_id IS NOT NULL)
        )
    );`
    );

    //Insert data

    await client.query(`
    INSERT INTO employees (email, password, name, type) VALUES
        ('employee1@example.com', 'password123', 'Alice Johnson', 'Manager'),
        ('employee2@example.com', 'password123', 'Bob Smith', 'Technician'),
        ('employee3@example.com', 'password123', 'Charlie Davis', 'Technician'),
        ('employee4@example.com', 'password123', 'Dana Lee', 'Manager'),
        ('employee5@example.com', 'password123', 'Evan Brown', 'Technician'),
        ('employee6@example.com', 'password123', 'Fiona Clark', 'Manager'),
        ('employee7@example.com', 'password123', 'George Martinez', 'Technician'),
        ('employee8@example.com', 'password123', 'Hannah Wilson', 'Technician'),
        ('employee9@example.com', 'password123', 'Ian Thompson', 'Manager'),
        ('employee10@example.com', 'password123', 'Jack White', 'Technician');`
    );

    await client.query(`
    INSERT INTO customers (email, password, name, company_name) VALUES
        ('customer1@example.com', 'password123', 'James Miller', 'ABC Corp'),
        ('customer2@example.com', 'password123', 'Lily Evans', 'XYZ Inc'),
        ('customer3@example.com', 'password123', 'Michael Scott', 'Dunder Mifflin'),
        ('customer4@example.com', 'password123', 'Pam Beesly', 'Dunder Mifflin'),
        ('customer5@example.com', 'password123', 'Dwight Schrute', 'Schrute Farms'),
        ('customer6@example.com', 'password123', 'Jim Halpert', 'Athlead'),
        ('customer7@example.com', 'password123', 'Andy Bernard', 'Cornell'),
        ('customer8@example.com', 'password123', 'Stanley Hudson', 'Pretzel Day'),
        ('customer9@example.com', 'password123', 'Kevin Malone', 'M&Ms'),
        ('customer10@example.com', 'password123', 'Angela Martin', 'Cats & Dogs');`
    );

    await client.query(`
    INSERT INTO jobs (job_name, total_items, finished_items, employee_id, customer_id, expected_finish_date, actual_finish_date) VALUES
        ('Job1', 100, 50, 1, 1, '2023-12-31', NULL),
        ('Job2', 200, 100, 2, 2, '2023-11-30', NULL),
        ('Job3', 150, 75, 3, 3, '2023-10-31', NULL),
        ('Job4', 300, 150, 4, 4, '2023-09-30', NULL),
        ('Job5', 400, 200, 5, 5, '2023-08-31', NULL),
        ('Job6', 250, 125, 6, 6, '2023-07-31', NULL),
        ('Job7', 350, 175, 7, 7, '2023-06-30', NULL),
        ('Job8', 450, 225, 8, 8, '2023-05-31', NULL),
        ('Job9', 500, 250, 9, 9, '2023-04-30', NULL),
        ('Job10', 550, 275, 10, 10, '2023-03-31', NULL);`
    );

    await client.query(`
    INSERT INTO customer_notes (job_id, customer_id, note, photo_url) VALUES
        (1, 1, 'Initial consultation completed.', 'http://example.com/photo1.jpg'),
        (2, 2, 'Specifications approved.', 'http://example.com/photo2.jpg'),
        (3, 3, 'Materials ordered.', 'http://example.com/photo3.jpg'),
        (4, 4, 'Work in progress.', 'http://example.com/photo4.jpg'),
        (5, 5, 'Inspection scheduled.', 'http://example.com/photo5.jpg'),
        (6, 6, 'Final approval received.', 'http://example.com/photo6.jpg'),
        (7, 7, 'Job completed successfully.', 'http://example.com/photo7.jpg'),
        (8, 8, 'Follow-up scheduled.', 'http://example.com/photo8.jpg'),
        (9, 9, 'Feedback collected.', 'http://example.com/photo9.jpg'),
        (10, 10, 'Warranty information provided.', 'http://example.com/photo10.jpg');`
    );

    await client.query(`
    INSERT INTO employee_notes (job_id, employee_id, note, photo_url) VALUES
        (1, 1, 'Started initial setup.', 'http://example.com/photo11.jpg'),
        (2, 2, 'Completed phase 1.', 'http://example.com/photo12.jpg'),
        (3, 3, 'Phase 2 in progress.', 'http://example.com/photo13.jpg'),
        (4, 4, 'Final phase started.', 'http://example.com/photo14.jpg'),
        (5, 5, 'Inspection passed.', 'http://example.com/photo15.jpg'),
        (6, 6, 'Job completed ahead of schedule.', 'http://example.com/photo16.jpg'),
        (7, 7, 'Additional tasks added.', 'http://example.com/photo17.jpg'),
        (8, 8, 'Maintenance scheduled.', 'http://example.com/photo18.jpg'),
        (9, 9, 'Review meeting set.', 'http://example.com/photo19.jpg'),
        (10, 10, 'Project closure in progress.', 'http://example.com/photo20.jpg');`
    );

    await client.query(`
    INSERT INTO employee_jobs (employee_id, job_id) VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10);`
    );

    await client.query(`
    INSERT INTO note_jobs (job_id, customer_note_id) VALUES (3, 1);
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10);`
    );

    await client.query(`
    INSERT INTO note_jobs (job_id, employee_note_id) VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10)
    
    (3, 1);`
    );
    

    client.release();
}