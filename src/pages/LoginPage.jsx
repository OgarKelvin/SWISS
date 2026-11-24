import React, { useState } from 'react';

export default function LoginPage({ setUser, navigateTo, triggerToast }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: loginEmail.split('@')[0] || 'Enterprise Client',
      email: loginEmail || 'client@company.com',
      accountType: 'SME Business'
    });
    triggerToast('Logged in successfully! Welcome back.');
    navigateTo('home');
  };

  return (
    <main className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl">
          {/* LEFT BRAND PROMO */}
          <div className="md:col-span-5 bg-linear-to-br from-rose-950 via-slate-950 to-slate-900 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-white text-base">
                S
              </div>
              <span className="font-extrabold text-white text-sm">SWISSDARL PORTAL</span>
            </div>

            <div className="my-6 md:my-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Access Your Freight Dashboard</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to download official waybill manifests, monitor corporate billing, and access live driver telemetry.
              </p>
            </div>

            <div className="text-[11px] text-slate-500">
              Need help? Contact Client Desk: +234 803 488 2668
            </div>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Client Sign In</h2>
              <p className="text-xs text-slate-400 mt-1">Enter your registered email and account password.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email / Customer ID</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. client@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-400">Password</label>
                  <button
                    type="button"
                    onClick={() => triggerToast('Password reset link sent to email.')}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition text-xs shadow-lg"
              >
                Sign In to Account
              </button>
            </form>

            {/* DEMO QUICK LOGIN */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setUser({
                    name: 'GlobaTech Logistics Manager',
                    email: 'corporate@swissdarl-client.com',
                    accountType: 'Corporate'
                  });
                  triggerToast('Demo Quick Login Successful!');
                  navigateTo('home');
                }}
                className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl border border-slate-800 text-xs transition"
              >
                Quick Demo Sign In (Corporate Client)
              </button>

              <p className="text-center text-xs text-slate-400 mt-2">
                Don&apos;t have a SWISSDARL account?{' '}
                <button
                  onClick={() => navigateTo('register')}
                  className="text-rose-400 font-bold hover:underline"
                >
                  Register Now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
