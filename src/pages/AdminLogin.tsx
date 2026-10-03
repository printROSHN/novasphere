import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message || 'Login failed. Please verify credentials.');
      } else {
        toast.success('Welcome to NovaSphere Exim Trade Desk');
        navigate('/admin');
      }
    } catch (err) {
      toast.error('Authentication service error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoAccess = () => {
    localStorage.setItem('novasphere_demo_admin', 'true');
    toast.success('Logged in as Trade Desk Administrator (Demo Session)');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="inline-block bg-white p-3 rounded-xl shadow-lg">
            <img
              src="/assets/logo.png"
              alt="NovaSphere Exim"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Trade Desk Management Portal
        </h2>
        <p className="mt-2 text-center text-xs text-brand-gold font-medium">
          NovaSphere Exim • Navi Mumbai Operations
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-200">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="suyash23yewale@gmail.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-brand-gold outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-navy w-full text-xs py-2.5 justify-center"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In with Supabase'}</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bypass Button */}
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={handleQuickDemoAccess}
              className="btn-gold w-full text-xs py-2.5 justify-center shadow-md flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>One-Click Quick Access (Administrator Demo)</span>
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Immediate access to manage services, products, page content & RFQs.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/" className="hover:text-brand-navy underline">
              ← Back to Live Public Site
            </Link>
            <span>v2.0 Trade Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}