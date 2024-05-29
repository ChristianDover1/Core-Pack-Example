import { getEmployee, getEmployeeJobs } from '@/utils/db/DB';
import React, { useEffect, useState } from 'react';

const JobsFeed: React.FC = async () => { 

    var jobs = await getEmployeeJobs(3) as any;
    if (jobs === undefined) {
        jobs = []
    }
    console.log(jobs);

    const Jobs = jobs.map((job:any ) => (
        <div key={job.id}>
          <h6>{job.name}</h6>
            <p>Finished Items: {job.finished_items  || "0"}</p>
            <p>Total Items: {job.total_items}</p>
            <p>Expected Finish Date: {Date.parse(job.expected_finish_date)}</p>
        </div>
      ))
    return (
      <div>
        <h1>Jobs Feed</h1>
        {Jobs}
      </div>
    );
  };


export default JobsFeed;