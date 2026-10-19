import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Globe,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Send,
  Factory
} from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

export default function AdminDashboard() {
  const { inquiries, products, company } = useContent();

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;
  const buyerInquiries = inquiries.filter(i => i.inquiry_type?.toLowerCase().includes('buyer')).length;
  const manufacturerInquiries = inquiries.filter(i => i.inquiry_type?.toLowerCase().includes('manufacturer')).length;

  const totalProducts = products.reduce((acc, cat) => acc + (cat.products?.length || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-brand-dark text-white rounded-2xl p-6 sm:p-8 border border-brand-blue/60 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-gold text-brand-dark">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Trade Desk Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            NovaSphere Exim Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Headquarters: {company.address} • Trade Desk Officer: {company.founder}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/inquiries"
            className="btn-gold text-xs px-4 py-2.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Manage Inquiries ({newInquiries} New)</span>
          </Link>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md font-semibold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-brand-gold" />
            <span>Products & Specs</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-1">{totalInquiries}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Live inquiries recorded</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Action Required</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{newInquiries}</h3>
            <p className="text-[11px] text-slate-500 mt-1">&lt;24 Hr SLA response window</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Products</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-1">{totalProducts}</h3>
            <p className="text-[11px] text-slate-500 mt-1">Across 3 industrial categories</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trade Corridors</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-1">7</h3>
            <p className="text-[11px] text-slate-500 mt-1">Active Global Trade Hubs</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Inquiries Desk Preview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Commercial Inquiries & RFQs</h3>
            <p className="text-xs text-slate-500">Incoming commercial requests, specifications, and trade inquiries</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-brand-navy hover:text-brand-gold flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase">
              <tr>
                <th className="py-3 px-4">Inquirer / Company</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Product of Interest</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{inq.full_name}</div>
                    <div className="text-[11px] text-slate-500">{inq.company_name || inq.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800">
                      {inq.inquiry_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-brand-navy">
                    {inq.product_interest || 'General'}
                  </td>
                  <td className="py-3 px-4">{inq.country || 'India'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'new'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/admin/inquiries"
                      className="text-brand-navy hover:text-brand-gold font-bold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/industries"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-gold shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-gold flex items-center justify-center mb-3">
            <Factory className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-navy">Industries Manager</h4>
          <p className="text-xs text-slate-500 mt-1">Manage industrial applications, sectors served, and technical materials.</p>
        </Link>

        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-gold shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-gold flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-navy">Products & Specs Manager</h4>
          <p className="text-xs text-slate-500 mt-1">Manage GPC, Carbon Raisers, specifications, chemical thresholds and mesh sizes.</p>
        </Link>

        <Link
          to="/admin/page-content"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-gold shadow-xs hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-gold flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-navy">Page Content Editor</h4>
          <p className="text-xs text-slate-500 mt-1">Change website copy, Hero headlines, 5-pill value strip, and why choose us points.</p>
        </Link>
      </div>
    </div>
  );
}
