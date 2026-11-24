import React, { useState } from 'react';

export default function RegisterPage({ setUser, navigateTo, triggerToast }) {
  const [registerForm, setRegisterForm] = useState({
    accountType: 'sme',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    preferredHub: 'Lagos (Head Office)',
    password: ''
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: registerForm.fullName || 'Valued Partner',
      email: registerForm.email,
      company: registerForm.companyName,
      accountType: registerForm.accountType === 'corporate' ? 'Corporate Enterprise' : 'SME Business'
    });
    triggerToast('Account created successfully! Welcome to SWISSDARL.');
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
              <span className="font-extrabold text-white text-sm">SWISSDARL JOIN</span>
            </div>

            <div className="my-6 md:my-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">Create Your Logistics Account</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open an individual, SME, or corporate haulage account for instant credit limits, API integration, and discounted interstate rates.
              </p>
            </div>

            <div className="text-[11px] text-slate-500">
              SWISSDARL HSEQ &amp; Customs Verified
            </div>
          </div>

          {/* RIGHT REGISTER FORM */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Customer Registration</h2>
              <p className="text-xs text-slate-400 mt-1">Select account type and complete details.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* ACCOUNT TYPE TOGGLE */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {[
                  { id: 'individual', label: 'Individual' },
                  { id: 'sme', label: 'SME Business' },
                  { id: 'corporate', label: 'Corporate' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setRegisterForm({ ...registerForm, accountType: type.id })}
                    className={`py-2 text-[11px] font-bold rounded-lg transition ${
                      registerForm.accountType === type.id
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    placeholder="e.g. Babatunde Lawal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>

                {registerForm.accountType !== 'individual' && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company / Business Name</label>
                    <input
                      type="text"
                      required
                      value={registerForm.companyName}
                      onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })}
                      placeholder="e.g. Acme Tech Nigeria Ltd"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="e.g. babs@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Phone Number (+234)</label>
                  <input
                    type="tel"
                    required
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition text-xs shadow-lg"
              >
                Create Free Account
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 pt-2">
              Already have an account?{' '}
              <button
                onClick={() => navigateTo('login')}
                className="text-rose-400 font-bold hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
