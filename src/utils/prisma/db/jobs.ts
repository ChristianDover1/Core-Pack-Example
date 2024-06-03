import prisma from "../prisma";

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
        try {
            const jobs = await prisma.job.findMany({
                where: {
                    employee_id: employeeId,
                },
                select: {
                    job_id: true,
                    job_name: true,
                    total_items: true,
                    finished_items: true,
                    expected_finish_date: true,
                    actual_finish_date: true,
                    dateCreated: true,
                },
            });
            return jobs;
        } catch (error) {
            console.error('Error fetching employee jobs:', error);
            throw error;
        }
    }

export async function getJobWithNotes(jobId: number) {
  try {
      const job = await prisma.job.findUnique({
          where: { job_id: jobId },
          select: {
              job_id: true,
              job_name: true,
              total_items: true,
              finished_items: true,
              expected_finish_date: true,
              actual_finish_date: true,
              dateCreated: true,
          },
      });

      const notes = await prisma.note.findMany({
          where: { job_id: jobId },
          select: {
              note_id: true,
              note: true,
              photo_url: true,
              isEmployee: true,
              user_id: true,
              dateCreated: true,
          },
      });

      const notesWithUserNames = await Promise.all(
          notes.map(async (note) => {
              let userName = '';
              if (note.isEmployee) {
                  const employee = await prisma.employee.findUnique({
                      where: { employee_id: note.user_id },
                      select: { name: true },
                  });
                  userName = employee?.name || '';
              } else {
                  const customer = await prisma.customer.findUnique({
                      where: { customer_id: note.user_id },
                      select: { name: true },
                  });
                  userName = customer?.name || '';
              }
              return { ...note, user_name: userName };
          })
      );

      return { job, notes: notesWithUserNames };
  } catch (error) {
      console.error('Error fetching job with notes:', error);
      throw error;
  }
}