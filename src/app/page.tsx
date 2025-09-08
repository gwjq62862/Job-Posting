"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [ourSearch] = useDebounce(search, 400);
  const { userId, isSignedIn } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const q = ourSearch.trim();
      const endpoint = q
        ? `/api/jobs?query=${encodeURIComponent(q)}`
        : "/api/jobs";
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setJobs(data);
        setFilter(data);
      } catch (error) {
        console.log("error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    if (isSignedIn) fetch("/api/sync-user", { method: "POST" });
  }, [isSignedIn, userId, ourSearch]);

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background-color)] overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2">
            Find Your Next Opportunity
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Search through thousands of jobs from top companies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-sm md:text-base"
              placeholder="Search by title, company, or keyword"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex flex-row gap-2 absolute left-1/2 top-1/2 -translate-x-[50%]">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          ) : filter.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-[var(--text-secondary)]">
                No jobs found
              </p>
            </div>
          ) : (
            filter.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition duration-200 ease-in-out"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--primary-color)] mb-1 truncate">
                    {job.title}
                  </h3>
                  <p className="text-base text-[var(--text-secondary)] mb-3 truncate">
                    {job.company}
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)] mb-4">
                    <span className="flex items-center">
                      <i className="material-icons text-[var(--accent-color)] text-sm mr-1">
                        {job.salary ? "attach_money" : ""}
                      </i>
                      {job.salary}
                    </span>
                    <span className="flex items-center">
                      <i className="material-icons text-[var(--accent-color)] text-sm mr-1">
                        location_on
                      </i>
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <i className="material-icons text-[var(--accent-color)] text-sm mr-1">
                        work
                      </i>
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/eachJob/${job.id}`}
                  className="inline-block bg-[var(--primary-color)] text-white py-2 px-6 rounded-md hover:bg-blue-700 transition text-center"
                >
                  Apply Now
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
