'use client'
import { useAuth, UserButton } from '@clerk/nextjs';
import { showToast } from 'nextjs-toast-notify';
import React, { FormEvent, useEffect, useState } from 'react';
import Navbar from '../component/Navbar';


const PostJobPage = () => {
  const { userId, isSignedIn } = useAuth();

  useEffect(()=>{
    const fetchdata=async()=>{
     if(isSignedIn){
      await fetch('api/sync-user',{method:'POST'})
    }
    }
    fetchdata()
  },[isSignedIn,userId])
  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    if (!userId || !isSignedIn) return
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('job-title'),
      company: formData.get('company-name'),
      salary: formData.get('salary'),
      location: formData.get('location'),
      type: formData.get('job-type'),
      discription: formData.get('job-description'),

    }

    try {
      await fetch('/api/jobs/post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      showToast.success("your post successfully created", {
        duration: 4000,
        progress: false,
        position: "top-center",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
     

   setTimeout(() => (window.location.href = "/"), 400);
    } catch (error) {
      console.log('error in posting data ', error)
    }

  }
  return (
    <div className="flex flex-col min-h-screen">



      <Navbar/>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]">
                    Post a Job
                  </h1>
                  <p className="mt-2 text-base text-[var(--text-secondary)] leading-relaxed">
                    Fill out the form below to publish your job opening.
                  </p>
                </div>
                <form onSubmit={handleSumbit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="job-title">Job Title*</label>
                      <input className="form-input" id="job-title" name="job-title" placeholder="e.g., Senior Frontend Developer" required type="text" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="company-name">Company Name*</label>
                      <input className="form-input" id="company-name" name="company-name" placeholder="e.g., Tech Solutions LLC" required type="text" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="salary">Salary Range</label>
                      <input className="form-input" id="salary" name="salary" placeholder="e.g., $100,000 - $140,000" type="text" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="location">Location*</label>
                      <input className="form-input" id="location" name="location" placeholder="e.g., New York, NY or Remote" required type="text" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="job-type">Job Type*</label>
                    <select className="form-input" id="job-type" name="job-type" required>
                      <option value="">Select a job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="job-description">Job Description*</label>
                    <textarea className="form-input" id="job-description" name="job-description" placeholder="Provide a detailed description of the role, responsibilities, and qualifications." required ></textarea>
                  </div>
                  <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
                    <button className="bg-white text-[var(--text-secondary)] px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200" type="button">
                      Save Draft
                    </button>
                    <button type='submit' className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 font-semibold" >
                      Publish Job Posting
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJobPage;