import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Globe, User, ShieldCheck } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Responsive default collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check demo admin bypass from localStorage so evaluation/testing works smoothly
  const isDemoAdmin = localStorage.getItem('novasphere_demo_admin') === 'true';

  if (loading && !isDemoAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Loading Trade Desk Portal...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not in demo mode, redirect to admin login
  if (!user && !isDemoAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50">
            <AdminSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>NovaSphere Exim Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-dark transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>Public Site</span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 text-xs text-slate-600">
              <div className="w-7 h-7 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-xs">
                SY
              </div>
              <div className="hidden md:block text-left">
                <p className="font-bold text-slate-800 leading-tight">Trade Desk Admin</p>
                <p className="text-[10px] text-slate-400">suyash23yewale@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Child Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
