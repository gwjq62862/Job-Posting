'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import { useDebounce } from 'use-debounce';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../component/Navbar';

type Job = {
  id: string;
  title: string;
  company: string;
  salary: string | null;
  location: string;
  type: string;
  author: { name: string };
};

export default function JobListingPage() {
  const { isSignedIn } = useAuth();

  /* ---------- filter state (controlled) ---------- */
  const [filters, setFilters] = useState({
    q: '',
    type: '',
    salary: '',
    location: '',
  });

  /* ---------- debounce typing ---------- */
  const [debounced] = useDebounce(filters, 400);

  /* ---------- build query-string ---------- */
  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    Object.entries(debounced).forEach(([k, v]) => {
      if (v) p.set(k, v);
    });
    return p.toString();
  }, [debounced]);

  /* ---------- fetch when string changes ---------- */
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const endpoint = queryString ? `/api/jobs?${queryString}` : '/api/jobs';
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  }, [queryString]);

  /* ---------- sync user once ---------- */
  useEffect(() => {
    if (isSignedIn) fetch('/api/sync-user', { method: 'POST' });
  }, [isSignedIn]);

  /* ---------- tiny helper ---------- */
  const update =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      {/* ------- header (unchanged) ------- */}
    <Navbar/>

      {/* ------- hero ------- */}
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-[var(--text-primary)]">Find Your Next Opportunity</h2>
          <p className="text-[var(--text-secondary)] mt-2">Search through thousands of jobs from top companies.</p>
        </div>

        {/* ------- filters ------- */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Search for a job</label>
            <input
              value={filters.q}
              onChange={update('q')}
              placeholder="Title, company, or keyword"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Job Type</label>
            <select value={filters.type} onChange={update('type')} className="w-full px-4 py-3 border border-gray-300 rounded-md">
              <option value="">All Job Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Salary Range</label>
            <select value={filters.salary} onChange={update('salary')} className="w-full px-4 py-3 border border-gray-300 rounded-md">
              <option value="">Any Salary</option>
              <option value="50000">$50k+</option>
              <option value="80000">$80k+</option>
              <option value="100000">$100k+</option>
              <option value="120000">$120k+</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Location</label>
            <input
              value={filters.location}
              onChange={update('location')}
              placeholder="City, state, or remote"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
            />
          </div>
        </div>

        {/* ------- job cards ------- */}
        {loading ? (
          <div className="text-center text-gray-500">Loading jobs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-[var(--primary-color)] truncate">{job.title}</h3>
                <p className="text-[var(--text-secondary)] mb-3 truncate">{job.company}</p>
                <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary ?? 'Not specified'}</p>
                  <p>📝 {job.type}</p>
                  <p className="text-xs">👤 {job.author.name}</p>
                </div>
                <button className="mt-4 w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-2 rounded-md hover:bg-[var(--primary-color)] hover:text-white transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}