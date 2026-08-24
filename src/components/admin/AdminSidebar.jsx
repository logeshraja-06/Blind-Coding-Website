import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Trophy,
  HelpCircle,
  Download,
  Settings,
  Code2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Participants', path: '/admin/participants', icon: Users },
    { name: 'Results & Ranks', path: '/admin/results', icon: Trophy },
    { name: 'Questions Bank', path: '/admin/questions', icon: HelpCircle },
    { name: 'Reports & Export', path: '/admin/exports', icon: Download },
    { name: 'Event Settings', path: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-drabDark text-ivory/80 border-r border-drabDark-700">
      {/* Brand Header */}
      <div className="p-6 border-b border-drabDark-700">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-celticBlue text-white flex items-center justify-center shadow-md">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-comfortaa font-bold text-lg text-ivory block leading-tight">
              BLIND<span className="text-teaGreen">CODE</span>
            </span>
            <span className="text-[10px] font-semibold text-teaGreen uppercase tracking-widest block">
              ADMIN CONSOLE
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ivory/40">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-celticBlue text-white shadow-md'
                    : 'text-ivory/70 hover:bg-drabDark-700 hover:text-ivory'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>
          );
        })}
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-drabDark-700 bg-drabDark-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teaGreen-300 text-drabDark font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div>
              <div className="text-xs font-bold text-ivory leading-tight">Event Convenor</div>
              <div className="text-[10px] text-ivory/50">Tech Fest Admin</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-teaGreen" title="System Live" />
        </div>

        <Link
          to="/"
          className="w-full py-2 px-3 rounded-lg bg-drabDark-700 hover:bg-drabDark-600 text-ivory/80 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Exit to Student Site</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
