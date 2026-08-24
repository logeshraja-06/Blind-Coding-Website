import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Menu, Bell, Shield, Search, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') return 'Event Overview';
    if (location.pathname.includes('/participants')) return 'Participants Management';
    if (location.pathname.includes('/results')) return 'Results & Leaderboard';
    if (location.pathname.includes('/questions')) return 'Questions Bank';
    if (location.pathname.includes('/exports')) return 'Reports & Data Export';
    if (location.pathname.includes('/settings')) return 'Event Configuration';
    return 'Admin Dashboard';
  };

  return (
    <div className="min-h-screen bg-ivory text-drabDark flex">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-teaGreen-300 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-drabDark hover:bg-teaGreen-100 transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-comfortaa text-drabDark">
                {getPageTitle()}
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-drabDark/60 block -mt-0.5">
                BLINDCODE 2026 Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teaGreen-100 border border-teaGreen-300 text-drabDark text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teaGreen-600 animate-pulse" />
              Live Assessment Session
            </span>

            <Link
              to="/"
              className="text-xs font-semibold text-celticBlue hover:text-celticBlue-700 bg-celticBlue-50 hover:bg-celticBlue-100 px-3 py-1.5 rounded-xl border border-celticBlue-200 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
