import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.employee.createMany({
        data: [
            { email: 'employee1@example.com', password: 'password123', name: 'Alice Johnson', admin: false },
            { email: 'employee2@example.com', password: 'password123', name: 'Bob Smith', admin: false },
            { email: 'employee3@example.com', password: 'password123', name: 'Charlie Davis', admin: false },
            { email: 'employee4@example.com', password: 'password123', name: 'Dana Lee', admin: false },
            { email: 'employee5@example.com', password: 'password123', name: 'Evan Brown', admin: false },
            { email: 'employee6@example.com', password: 'password123', name: 'Fiona Clark', admin: false },
            { email: 'employee7@example.com', password: 'password123', name: 'George Martinez', admin: false },
            { email: 'employee8@example.com', password: 'password123', name: 'Hannah Wilson', admin: false },
            { email: 'employee9@example.com', password: 'password123', name: 'Ian Thompson', admin: false },
            { email: 'employee10@example.com', password: 'password123', name: 'Jack White', admin: false },
        ],
    });

    await prisma.customer.createMany({
        data: [
            { email: 'customer1@example.com', password: 'password123', name: 'James Miller', companyName: 'ABC Corp' },
            { email: 'customer2@example.com', password: 'password123', name: 'Lily Evans', companyName: 'XYZ Inc' },
            { email: 'customer3@example.com', password: 'password123', name: 'Michael Scott', companyName: 'Dunder Mifflin' },
            { email: 'customer4@example.com', password: 'password123', name: 'Pam Beesly', companyName: 'Dunder Mifflin' },
            { email: 'customer5@example.com', password: 'password123', name: 'Dwight Schrute', companyName: 'Schrute Farms' },
            { email: 'customer6@example.com', password: 'password123', name: 'Jim Halpert', companyName: 'Athlead' },
            { email: 'customer7@example.com', password: 'password123', name: 'Andy Bernard', companyName: 'Cornell' },
            { email: 'customer8@example.com', password: 'password123', name: 'Stanley Hudson', companyName: 'Pretzel Day' },
            { email: 'customer9@example.com', password: 'password123', name: 'Kevin Malone', companyName: 'M&Ms' },
            { email: 'customer10@example.com', password: 'password123', name: 'Angela Martin', companyName: 'Cats & Dogs' },
        ],
    });

    await prisma.job.createMany({
        data: [
            { job_name: 'Job1', total_items: 100, finished_items: 50, customer_id: 1, expected_finish_date: new Date('2023-12-31') },
            { job_name: 'Job2', total_items: 200, finished_items: 100, customer_id: 2, expected_finish_date: new Date('2023-11-30') },
            { job_name: 'Job3', total_items: 150, finished_items: 75, customer_id: 3, expected_finish_date: new Date('2023-10-31') },
            { job_name: 'Job4', total_items: 300, finished_items: 150, customer_id: 4, expected_finish_date: new Date('2023-09-30') },
            { job_name: 'Job5', total_items: 400, finished_items: 200, customer_id: 5, expected_finish_date: new Date('2023-08-31') },
            { job_name: 'Job6', total_items: 250, finished_items: 125, customer_id: 6, expected_finish_date: new Date('2023-07-31') },
            { job_name: 'Job7', total_items: 350, finished_items: 175, customer_id: 7, expected_finish_date: new Date('2023-06-30') },
            { job_name: 'Job8', total_items: 450, finished_items: 225, customer_id: 8, expected_finish_date: new Date('2023-05-31') },
            { job_name: 'Job9', total_items: 500, finished_items: 250, customer_id: 9, expected_finish_date: new Date('2023-04-30') },
            { job_name: 'Job10', total_items: 550, finished_items: 275, customer_id: 10, expected_finish_date: new Date('2023-03-31') },
        ],
    });

    await prisma.note.createMany({
        data: [
            { job_id: 1, user_id: 1, isEmployee: false, note: 'Initial consultation completed.', photo_url: 'http://example.com/photo1.jpg' },
            { job_id: 2, user_id: 2, isEmployee: false, note: 'Specifications approved.', photo_url: 'http://example.com/photo2.jpg' },
            { job_id: 3, user_id: 3, isEmployee: false, note: 'Materials ordered.', photo_url: 'http://example.com/photo3.jpg' },
            { job_id: 4, user_id: 4, isEmployee: false, note: 'Work in progress.', photo_url: 'http://example.com/photo4.jpg' },
            { job_id: 5, user_id: 5, isEmployee: false, note: 'Inspection scheduled.', photo_url: 'http://example.com/photo5.jpg' },
            { job_id: 6, user_id: 6, isEmployee: false, note: 'Final approval received.', photo_url: 'http://example.com/photo6.jpg' },
            { job_id: 7, user_id: 7, isEmployee: false, note: 'Job completed successfully.', photo_url: 'http://example.com/photo7.jpg' },
            { job_id: 8, user_id: 8, isEmployee: false, note: 'Follow-up scheduled.', photo_url: 'http://example.com/photo8.jpg' },
            { job_id: 9, user_id: 9, isEmployee: false, note: 'Feedback collected.', photo_url: 'http://example.com/photo9.jpg' },
            { job_id: 10, user_id: 10, isEmployee: false, note: 'Warranty information provided.', photo_url: 'http://example.com/photo10.jpg' },
        ],
    });

    await prisma.note.createMany({
        data: [
            { job_id: 1, user_id: 1, isEmployee: true, note: 'Started initial setup.', photo_url: 'http://example.com/photo11.jpg' },
            { job_id: 2, user_id: 2, isEmployee: true, note: 'Completed phase 1.', photo_url: 'http://example.com/photo12.jpg' },
            { job_id: 3, user_id: 3, isEmployee: true, note: 'Phase 2 in progress.', photo_url: 'http://example.com/photo13.jpg' },
            { job_id: 4, user_id: 4, isEmployee: true, note: 'Final phase started.', photo_url: 'http://example.com/photo14.jpg' },
            { job_id: 5, user_id: 5, isEmployee: true, note: 'Inspection passed.', photo_url: 'http://example.com/photo15.jpg' },
            { job_id: 6, user_id: 6, isEmployee: true, note: 'Job completed ahead of schedule.', photo_url: 'http://example.com/photo16.jpg' },
            { job_id: 7, user_id: 7, isEmployee: true, note: 'Additional tasks added.', photo_url: 'http://example.com/photo17.jpg' },
            { job_id: 8, user_id: 8, isEmployee: true, note: 'Maintenance scheduled.', photo_url: 'http://example.com/photo18.jpg' },
            { job_id: 9, user_id: 9, isEmployee: true, note: 'Review meeting set.', photo_url: 'http://example.com/photo19.jpg' },
            { job_id: 10, user_id: 10, isEmployee: true, note: 'Project closure in progress.', photo_url: 'http://example.com/photo20.jpg' },
        ],
    });

    await prisma.employeeJob.createMany({
        data: [
            { employee_id: 1, job_id: 1 },
            { employee_id: 2, job_id: 2 },
            { employee_id: 3, job_id: 3 },
            { employee_id: 4, job_id: 4 },
            { employee_id: 5, job_id: 5 },
            { employee_id: 6, job_id: 6 },
            { employee_id: 7, job_id: 7 },
            { employee_id: 8, job_id: 8 },
            { employee_id: 9, job_id: 9 },
            { employee_id: 10, job_id: 10 },
        ],
    });

    await prisma.noteJob.createMany({
        data: [
            { job_id: 1, note_id: 1 },
            { job_id: 2, note_id: 2 },
            { job_id: 3, note_id: 3 },
            { job_id: 4, note_id: 4 },
            { job_id: 5, note_id: 5 },
            { job_id: 6, note_id: 6 },
            { job_id: 7, note_id: 7 },
            { job_id: 8, note_id: 8 },
            { job_id: 9, note_id: 9 },
            { job_id: 10, note_id: 10 },
        ],
    });
// adding additional Data

    // Adding 50 new unique notes for jobs

    const jobNames = [
        "Project Apollo", "Redwood Expansion", "Skyline Build", "Horizon Initiative",
        "Quantum Leap", "Apex Construction", "Summit Project", "Cascade Development",
        "Phoenix Rise", "Sierra Peak", "Evergreen Plan", "Orion Project",
        "Vanguard Mission", "Pioneer Quest", "Nova Construction", "Galactic Build",
        "Zenith Construction", "Voyager Project", "Atlas Expansion", "Nautilus Initiative"
    ];
    
    const newJobs = Array.from({ length: 50 }, (_, i) => ({
        job_name: `${jobNames[i % jobNames.length]} Phase ${Math.floor(i / jobNames.length) + 1}`,
        total_items: Math.floor(Math.random() * 500) + 100,
        finished_items: Math.floor(Math.random() * 100),
        customer_id: (i % 10) + 1,
        expected_finish_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    }));
    
    await prisma.job.createMany({
        data: newJobs,
    });

    // ( Chat gpt generated )
    
    const employeeNoteDescriptions = [
        "Initial planning phase started.",
        "Design phase completed.",
        "Site inspection completed.",
        "Permit applications submitted.",
        "Materials procured.",
        "Construction phase started.",
        "Quality check in progress.",
        "Safety protocols established.",
        "Final touches and review.",
        "Project completion report filed.",
        "Budget review and adjustment.",
        "Team meeting conducted.",
        "Milestone achieved.",
        "Additional resources allocated.",
        "Risk assessment completed.",
        "Project timeline revised.",
        "Stakeholder approval received.",
        "Quality assurance phase started."
    ];

    const customerNoteDescriptions = [
        "How is my order going?",
        "Did the shipment of food arrive yet?",
        "When is the first shipment ready?",
        "Can I get an update on my order status?",
        "I need to know the estimated delivery time.",
        "Have the materials been delivered?",
        "Is there any delay in the schedule?",
        "Can you provide more details on the current progress?",
        "I am concerned about the quality of the items.",
        "Can we reschedule our next meeting?",
        "I need to review the project budget.",
        "Please send me a detailed report.",
        "I have not received the latest update.",
        "When can we have a site visit?",
        "I approved the final project plan.",
        "Is there a possibility to extend the timeline?",
        "We need more resources for the project.",
        "Please provide a status update.",
        "Are the safety protocols being followed?",
        "Can we change the project scope?"
    ];



    // Adding 200 new unique notes for jobs
    const totalNewNotes = 200;
    const newJobNotes = Array.from({ length: totalNewNotes }, (_, i) => {
        const isEmployee = Math.random() > 0.5;
        const noteDescriptions = isEmployee ? employeeNoteDescriptions : customerNoteDescriptions;
        const noteDescription = noteDescriptions[Math.floor(Math.random() * noteDescriptions.length)];
        const jobId = (i % 10) + 1; // Assuming job IDs range from 1 to 10
        const userId = isEmployee ? (i % 10) + 1 : Math.floor(Math.random() * 10) + 1; // Employee IDs range from 1 to 10, Customer IDs range from 1 to 10
        return {
            job_id: jobId,
            user_id: userId,
            isEmployee,
            note: `${noteDescription} Additional details for note ${i + 51}.`,
            photo_url: `http://example.com/photo${51 + i}.jpg`,
        };
    });

    // Create notes in the note table
    const createdNotes = await prisma.note.createMany({
        data: newJobNotes,
    });
     // Create entries in the noteJob join table
     const noteJobEntries = newJobNotes.map((note, index) => ({
        job_id: note.job_id,
        note_id: index + 1 + 20, // Adjust index to follow existing notes IDs (assuming previous notes had IDs 1-20)
    }));

    await prisma.noteJob.createMany({
        data: noteJobEntries,
    });

    await prisma.$disconnect();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });