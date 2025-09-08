

import Navbar from "@/app/component/Navbar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function EachJobPage({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!job) notFound();

  return (
   <>

   <Navbar/>
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">{job.title}</h1>
        <p className="text-lg text-[var(--text-secondary)] mt-1">{job.company}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {job.salary && (
            <span className="flex items-center gap-1">
              <i className="material-icons text-[var(--accent-color)]">attach_money</i>
              {job.salary}
            </span>
          )}
          <span className="flex items-center gap-1">
            <i className="material-icons text-[var(--accent-color)]">location_on</i>
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <i className="material-icons text-[var(--accent-color)]">work</i>
            {job.type}
          </span>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-wrap text-[var(--text-secondary)]">{job.discription}</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">Posted by {job.author.name}</p>
          <button className="bg-[var(--primary-color)] text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </main>   
   </>
  );
}