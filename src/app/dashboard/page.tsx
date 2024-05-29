
import React from 'react';
import { getServerSession } from 'next-auth';
import JobsFeed from '@/components/jobsFeed';
import { Joti_One } from 'next/font/google';


const DashboardPage: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <JobsFeed />
            {}
        </div>
    );
};

export default DashboardPage;