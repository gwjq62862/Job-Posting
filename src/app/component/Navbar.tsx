'use client'
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {
      const pathName=usePathname()
     const [mobileOpen, setMobileOpen] = React.useState(false);
     const linkClass = (path: string) =>
         `text-sm font-medium transition-colors ${
           pathName === path
             ? 'text-blue-400'                       // active
             : 'text-[var(--text-secondary)] hover:text-[var(--primary-color)]'
         }`;
  return (
   <header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 lg:px-10 py-4">
    <div className="flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/" className="flex items-center gap-3">
          <svg className="h-8 w-8 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 48 48">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold">JobTracker</h1>
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/findJob" className={linkClass('/findJob')}>BrowseJob</Link>
        </nav>
      </div>

      {/* right side */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/jobcreate"
          className="hidden sm:inline-block bg-[var(--primary-color)] text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-semibold"
        >
          Post a Job
        </Link>
        <UserButton />

        {/* =====  mobile hamburger  ===== */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>

  
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ${
        mobileOpen ? 'max-h-64' : 'max-h-0'
      }`}
    >
      <nav className="flex flex-col gap-4 pt-4 pb-2">
        <Link href="/" className={linkClass('/')} onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/findJob" className={linkClass('/findJob')} onClick={() => setMobileOpen(false)}>BrowseJob</Link>
        <Link
          href="/jobcreate"
          className=" inline-block bg-[var(--primary-color)] text-white py-2 px-2 rounded-md hover:bg-blue-700 text-sm font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          Post a Job
        </Link>
      </nav>
    </div>
  </div>
</header>
  )
}

export default Navbar