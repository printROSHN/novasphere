import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Layers,
  FileText,
  Building,
  Factory,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { title: 'Inquiries & Leads', href: '/admin/inquiries', icon: MessageSquare },
    { title: 'Products & Specs', href: '/admin/products', icon: Layers },
    { title: 'Page Content', href: '/admin/page-content', icon: FileText },
    { title: 'Company & Contact', href: '/admin/company-info', icon: Building },
    { title: 'Industries', href: '/admin/industries', icon: Factory },
  ];

  const isActive = (href) => {
    if (href === '/admin') return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {}
    navigate('/admin/login');
  };

  return (
    <aside
      className={`h-screen bg-brand-dark text-slate-300 border-r border-brand-blue/50 flex flex-col justify-between transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Top Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-brand-blue/40">
          {!collapsed ? (
            <Link to="/" className="flex items-center gap-2 bg-white/95 px-2 py-1 rounded">
              <img
                src="/assets/logo.png"
                alt="NovaSphere Exim"
                className="h-9 w-auto object-contain"
              />
            </Link>
          ) : (
            <div className="w-10 h-10 rounded bg-white p-1 flex items-center justify-center">
              <img src="/assets/logo.png" alt="NE" className="h-6 w-auto" />
            </div>
          )}

          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Trade Desk Badge */}
        {!collapsed && (
          <div className="px-4 py-3 bg-brand-navy/60 border-b border-brand-blue/30 text-xs">
            <div className="flex items-center gap-2 text-brand-gold font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>International Trade Desk</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Navi Mumbai, India</p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-brand-gold text-brand-dark shadow-sm'
                    : 'text-slate-300 hover:bg-brand-navy hover:text-white'
                }`}
                title={collapsed ? item.title : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-brand-dark' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-brand-blue/40 space-y-1.5">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-brand-gold hover:bg-brand-navy/50 transition-colors"
          title="View Live Public Website"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>View Live Site</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
