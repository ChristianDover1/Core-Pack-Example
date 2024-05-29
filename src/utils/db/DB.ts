import { db } from "@vercel/postgres";
import exp from "constants";

// export default async function getUsers() {

export async function getEmployee(email: string) {
    const client = await db.connect();
    const result = await client.query(`SELECT * FROM employees WHERE email='${email}'`);
    client.release();
    console.log(result.rows);
    return result.rows;
    }

export async function insertUser(id: string) {
    const client = await db.connect();
    const result = await client.query(`INSERT INTO users (id) VALUES (${id})`);
    client.release();
    console.log(result.rows);
    return result.rows;
    }

export async function getUsers() {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    console.log(result.rows);
    return result.rows;
    }

export async function getEmployeeJobs(employeeId: number) {
    return [
        {
          id: 3,
          name: 'Job3',
          total_items: 150,
          finished_items: 75,
          expected_finish_date: "2023-10-31T06:00:00.000Z",
          actual_finish_date: null,
          date_created: "2024-05-22T06:29:25.803Z"
        },
        {
          id: 5,
          name: 'Job5',
          total_items: 400,
          finished_items: 200,
          expected_finish_date: "2023-08-31T06:00:00.000Z",
          actual_finish_date: null,
          date_created: "2024-05-22T06:29:25.803Z"
        }
      ]

    const client = await db.connect();
    const result = await client.query(`SELECT 
            jobs.job_id as id,
            jobs.job_name as name,
            jobs.total_items,
            jobs.finished_items,
            jobs.expected_finish_date,
            jobs.actual_finish_date,
            jobs.date_created
        FROM 
            jobs
        JOIN 
            employee_jobs ON jobs.job_id = employee_jobs.job_id
        JOIN 
            employees ON employee_jobs.employee_id = employees.employee_id
        WHERE 
            employees.employee_id = '${employeeId}';`);
    client.release();
    // console.log(result.rows);
    return result.rows;
    }

export async function getJobWithNotes(jobId: number){
    const client = await db.connect();

    const jobPromise = client.query(`
    SELECT 
        job_id,
        job_name,
        total_items,
        finished_items,
        expected_finish_date,
        actual_finish_date,
        date_created
    FROM 
        jobs
    WHERE 
        job_id = '${jobId}';`);
        
    const notesPromise = client.query(`
    SELECT 
        n.note_id,
        n.note,
        n.photo_url,
        n.user_type,
        n.user_id,
        n.date_created,
    CASE 
        WHEN n.user_type = 'customer' THEN c.name
        WHEN n.user_type = 'employee' THEN e.name
        END AS user_name
    FROM 
        notes n
        LEFT JOIN 
        customers c ON n.user_type = 'customer' AND n.user_id = c.customer_id
        LEFT JOIN 
        employees e ON n.user_type = 'employee' AND n.user_id = e.employee_id
    WHERE 
        job_id = '${jobId}';`);
        
    const [jobResult, notesResult] = await Promise.all([jobPromise, notesPromise]);
    
    client.release();
    return { job: jobResult.rows[0], notes: notesResult.rows };
};



//     SELECT 
//     nj.note_job_id,
//     j.job_name,
//     COALESCE(cn.note, en.note) AS note,
//     COALESCE(cn.photo_url, en.photo_url) AS photo_url,
//     CASE 
//         WHEN nj.customer_note_id IS NOT NULL THEN 'Customer Note'
//         WHEN nj.employee_note_id IS NOT NULL THEN 'Employee Note'
//     END AS note_type
// FROM 
//     note_jobs nj
// LEFT JOIN 
//     customer_notes cn ON nj.customer_note_id = cn.customer_notes_id
// LEFT JOIN 
//     employee_notes en ON nj.employee_note_id = en.employee_notes_id
// JOIN 
//     jobs j ON nj.job_id = j.job_id
// WHERE 
//     nj.job_id = 3;