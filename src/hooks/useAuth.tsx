import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface Profile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  full_name: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any; success?: boolean }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Master Admin single credential definition
export const MASTER_ADMIN = {
  email: 'info@novasphereexim.com',
  aliases: ['admin@novasphereexim.com', 'suyash@novasphereexim.com'],
  passwords: ['NovaSphere@2026', 'admin123', 'novasphere2026']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === 'admin' || user?.email === MASTER_ADMIN.email;

  useEffect(() => {
    // 1. Check for stored local admin session
    try {
      const storedLocalAdmin = localStorage.getItem('novasphere_admin_session');
      if (storedLocalAdmin) {
        const parsed = JSON.parse(storedLocalAdmin);
        setUser({
          id: 'admin-local',
          email: parsed.email || MASTER_ADMIN.email,
          user_metadata: { full_name: parsed.full_name || 'Trade Desk Administrator' }
        } as any);
        setProfile({
          id: 'admin-local',
          email: parsed.email || MASTER_ADMIN.email,
          role: 'admin',
          full_name: parsed.full_name || 'Trade Desk Administrator'
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      // Continue to Supabase check
    }

    // 2. Set up Supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profileData) {
                setProfile({
                  ...profileData,
                  role: profileData.role as 'user' | 'admin'
                });
              } else {
                setProfile({
                  id: session.user.id,
                  email: session.user.email || '',
                  role: 'admin',
                  full_name: session.user.user_metadata?.full_name || 'Admin'
                });
              }
            } catch (error) {
              setProfile({
                id: session.user.id,
                email: session.user.email || '',
                role: 'admin',
                full_name: 'Trade Desk Admin'
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // 3. Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Check Master Admin single credential match
      const isMasterEmail = cleanEmail === MASTER_ADMIN.email || MASTER_ADMIN.aliases.includes(cleanEmail);
      const isMasterPass = MASTER_ADMIN.passwords.includes(cleanPassword);

      if (isMasterEmail && isMasterPass) {
        const adminSession = {
          email: MASTER_ADMIN.email,
          role: 'admin',
          full_name: 'Suyash Yewale (Director)'
        };
        localStorage.setItem('novasphere_admin_session', JSON.stringify(adminSession));
        setUser({
          id: 'admin-local',
          email: MASTER_ADMIN.email,
          user_metadata: { full_name: adminSession.full_name }
        } as any);
        setProfile({
          id: 'admin-local',
          email: MASTER_ADMIN.email,
          role: 'admin',
          full_name: adminSession.full_name
        });
        toast.success('Signed in successfully as Trade Desk Administrator');
        return { success: true };
      }

      // Try Supabase Auth as secondary/fallback
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });
      
      if (error) {
        toast.error('Invalid credentials. Please enter valid Trade Desk admin email and password.');
        return { error };
      }
      
      toast.success('Signed in successfully');
      return { success: true };
    } catch (error: any) {
      toast.error('Authentication error occurred: ' + (error.message || 'Please check credentials'));
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success('Check your email to confirm your account');
      return {};
    } catch (error) {
      toast.error('An unexpected error occurred');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('novasphere_admin_session');
      localStorage.removeItem('novasphere_demo_admin');
      setUser(null);
      setProfile(null);
      setSession(null);
      try {
        await supabase.auth.signOut();
      } catch (e) {}
      
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Signed out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/admin/login`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success('Password reset email sent');
      return {};
    } catch (error) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}