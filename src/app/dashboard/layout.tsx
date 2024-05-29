"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
// import JobsFeed from "@/components/jobs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>
    {/* <JobsFeed /> */}
    {children}
    </SessionProvider>;
}