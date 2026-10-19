import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Trash2,
  ExternalLink,
  ChevronDown,
  Building,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useContent } from '../../contexts/ContentContext';

export default function InquiriesAdmin() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useContent();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.product_interest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'ALL' ||
      inq.inquiry_type?.toLowerCase().includes(selectedType.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' || inq.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateInquiryStatus(id, newStatus);
      if (res && res.success === false) {
        toast.error('Failed to update status in Supabase');
      } else {
        toast.success(`Inquiry status updated to ${newStatus} in Supabase`);
      }
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch {
      toast.error('Error updating inquiry status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this commercial lead?')) {
      try {
        const res = await deleteInquiry(id);
        if (res && res.success === false) {
          toast.error('Failed to delete inquiry from Supabase');
        } else {
          toast.success('Inquiry removed from Supabase');
        }
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      } catch {
        toast.error('Error deleting inquiry');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Trade Desk Inquiries & RFQs</h2>
          <p className="text-xs text-slate-500">
            Review commercial purchase requirements, buyer specifications, and international trade inquiries.
          </p>
        </div>
        <div className="text-xs font-bold text-brand-gold bg-brand-dark px-3 py-1.5 rounded-lg shadow-sm">
          Total Leads: {inquiries.length}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search buyer, company, GPC, or email..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-700 outline-none"
          >
            <option value="ALL">All Inquirer Types</option>
            <option value="Buyer">Buyers Looking for Products</option>
            <option value="Manufacturer">Manufacturers Seeking Representation</option>
            <option value="General">General Inquiries</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-700 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in discussion">In Discussion</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase">
              <tr>
                <th className="py-3 px-4">Inquirer & Company</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Product of Interest</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No inquiries found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
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
                      <select
                        value={inq.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none ${
                          inq.status === 'new'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : inq.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : inq.status === 'in discussion'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in discussion">In Discussion</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inq.id);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-brand-dark text-white p-6 flex items-start justify-between border-b border-brand-blue/50">
              <div className="space-y-1">
                <span className="badge-gold text-[10px]">{selectedInquiry.inquiry_type}</span>
                <h3 className="text-xl font-bold text-white">{selectedInquiry.full_name}</h3>
                <p className="text-xs text-brand-gold">{selectedInquiry.company_name || 'Individual Inquirer'}</p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-surface-light border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block">Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-brand-navy font-semibold hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Phone / WhatsApp:</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-slate-800 font-semibold">
                    {selectedInquiry.phone || 'N/A'}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Country / Region:</span>
                  <span className="text-slate-800 font-semibold">{selectedInquiry.country || 'India'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Product of Interest:</span>
                  <span className="text-brand-navy font-bold">{selectedInquiry.product_interest || 'General'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Full Customer Message & Specifications:
                </span>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600">Current Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in discussion">In Discussion</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  {selectedInquiry.phone && (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedInquiry.full_name)},%20thank%20you%20for%20contacting%20NovaSphere%20Exim.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-navy text-xs px-3 py-1.5"
                    >
                      WhatsApp
                    </a>
                  )}

                  <a
                    href={`mailto:${selectedInquiry.email}?subject=NovaSphere%20Exim%20Quote%20Follow-up%20-%20${encodeURIComponent(selectedInquiry.product_interest || '')}&body=Dear%20${encodeURIComponent(selectedInquiry.full_name)},%0A%0AThank%20you%20for%20contacting%20our%20international%20trade%20desk%20regarding%20${encodeURIComponent(selectedInquiry.product_interest || '')}.`}
                    className="btn-gold text-xs px-4 py-1.5"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
