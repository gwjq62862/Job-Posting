# Job-Posting

[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-blueviolet?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Description

This project is a job posting application built with Next.js 14, Prisma, and PostgreSQL. It allows users to browse job listings, search for specific jobs, and post new job openings. The application uses Clerk for authentication and provides a user-friendly interface for managing job postings.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features

- **User Authentication:** Utilizes Clerk for secure user authentication and management. 🔑
- **Job Posting:** Allows authenticated users to create and post new job listings. ✍️
- **Job Browsing:** Enables users to browse existing job postings. 🔍
- **Job Searching:** Provides search functionality to find jobs by title, company, or keyword. 🎯
- **Filtering:** Supports filtering jobs by type, salary range, and location. ⚙️
- **Detailed Job View:** Displays detailed information about each job, including description and application instructions. 📃
- **Database Integration:** Uses Prisma as an ORM to interact with a PostgreSQL database. 🗄️
- **Real-time updates:** Implements real-time job search updates using `useDebounce`. ⏰

## Tech Stack

- **Framework:** Next.js 14 💻
- **ORM:** Prisma ⚙️
- **Database:** PostgreSQL 🐘
- **Authentication:** Clerk 🛡️
- **UI Library:** React.js ⚛️
- **Styling:** Tailwind CSS 🎨
- **Language:** TypeScript 🌐

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gwjq62862/Job-Posting.git
   cd Job-Posting
   ```

2. **Install dependencies:**

   ```bash
   npm install # or yarn install or pnpm install or bun install
   ```

3. **Set up environment variables:**

   - Create a `.env.local` file in the root directory.
   - Copy the contents from `.env.example` and update the values with your actual credentials.

     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_********************************
     CLERK_SECRET_KEY=sk_test_********************************
     DATABASE_URL=postgres://user:password@host:5432/dbname
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
     ```

4. **Configure Prisma:**

   - Generate the Prisma client:

     ```bash
     npx prisma generate
     ```

   - Push the Prisma schema to the database:

     ```bash
     npx prisma db push
     ```

5. **Start the development server:**

   ```bash
   npm run dev # or yarn dev or pnpm dev or bun dev
   ```

## Usage

1.  **Running the Application:**

    Open your browser and navigate to `http://localhost:3000` to view the application.

2.  **Authentication:**

    -   Use the Sign-in and Sign-up pages to manage user authentication.

        ```
        /sign-in
        /sign-up
        ```

    -   Clerk handles the authentication process.

3.  **Browsing Jobs:**

    -   Navigate to the `/findJob` route to view available job listings.

        ```
        <Link href="/findJob" className={linkClass('/findJob')}>BrowseJob</Link>
        ```

4.  **Posting a Job:**

    -   Click on the "Post a Job" button in the navigation bar.

    -   Fill out the job posting form with the required details and submit it.

        ```
        <Link href="/jobcreate"
          className="hidden sm:inline-block bg-[var(--primary-color)] text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-semibold">
          Post a Job
        </Link>
        ```

5.  **Searching Jobs:**

    -   Use the search bar on the home page or the `/findJob` page to search for jobs by title, company, or keyword.

        ```
         <input
              className="block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-sm md:text-base"
              placeholder="Search by title, company, or keyword"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
        ```

6. **Filtering Jobs:**
   - On the `/findJob` page, use the filter options to filter jobs by type, salary range, and location.
   ```
   <select value={filters.type} onChange={update('type')} className="w-full px-4 py-3 border border-gray-300 rounded-md">
      <option value="">All Job Types</option>
      <option value="full-time">Full-time</option>
      <option value="part-time">Part-time</option>
      <option value="contract">Contract</option>
      <option value="internship">Internship</option>
   </select>
   ```

7.  **View a specific Job:**

    -   Click on a job listing to view the full details of the job.

        ```
        <Link
                  href={`/eachJob/${job.id}`}
                  className="inline-block bg-[var(--primary-color)] text-white py-2 px-6 rounded-md hover:bg-blue-700 transition text-center"
                >
                  Apply Now
                </Link>
        ```

## Project Structure

```
Job-Posting/
├── .env.example                  # Example environment variables
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Project documentation
├── next.config.mjs                # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── .eslintrc.json                 # ESLint configuration
├── prisma/
│   ├── migrations/               # Prisma migrations
│   ├── schema.prisma              # Prisma schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── jobs/
│   │   │   │   ├── post/
│   │   │   │   │   └── route.ts   # API route to post a job
│   │   │   │   └── route.ts       # API route to get jobs
│   │   │   ├── sync-user/
│   │   │   │   └── route.ts       # API route to sync user data
│   │   ├── component/
│   │   │   └── Navbar.tsx         # Navigation bar component
│   │   ├── eachJob/
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Page to display individual job details
│   │   ├── findJob/
│   │   │   └── page.tsx           # Page to find jobs with filtering options
│   │   ├── jobcreate/
│   │   │   └── page.tsx           # Page to create a job posting
│   │   ├── page.tsx               # Home page
│   │   ├── layout.tsx             # Root layout component
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx       # Sign-in page
│   │   └── sign-up/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx       # Sign-up page
│   │   ├── globals.css              # Global CSS styles
│   ├── lib/
│   │   └── prisma.ts              # Prisma client initialization
│   ├── middleware.ts              # Middleware configuration
```

## API Reference

### `/api/jobs`

-   **Method:** `GET`
-   **Description:** Fetches job listings with optional filtering.
-   **Query Parameters:**
    -   `query`: Search term for job title or company (optional). 🔎
    -   `type`: Job type (optional). 🏢
    -   `salary`: Salary range (optional). 💰
    -   `location`: Job location (optional). 📍
-   **Example:**

    ```
    /api/jobs?query=frontend&type=full-time&location=remote
    ```

### `/api/jobs/post`

-   **Method:** `POST`
-   **Description:** Creates a new job posting.
-   **Request Body:**

    ```json
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "salary": "$120,000 - $150,000",
      "location": "San Francisco, CA",
      "type": "full-time",
      "discription": "We are looking for a skilled software engineer..."
    }
    ```

-   **Authentication:** Requires a valid Clerk user ID.

### `/api/sync-user`

-   **Method:** `POST`
-   **Description:** Syncs user data from Clerk to the database.
-   **Authentication:** Requires a valid Clerk user ID.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository. 🍴
2.  Create a new branch for your feature or bug fix. 🌳
3.  Make your changes and commit them with clear, concise messages. ✍️
4.  Submit a pull request. 🚀

## License

This project has no specified license. All rights reserved.

## Important Links

-   **Repository:** [https://github.com/gwjq62862/Job-Posting](https://github.com/gwjq62862/Job-Posting)

## Footer

Job-Posting - [https://github.com/gwjq62862/Job-Posting](https://github.com/gwjq62862/Job-Posting) by [gwjq62862](https://github.com/gwjq62862). 🌟 Feel free to fork, like, and raise issues! Contact: [Your Email/Contact].


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
