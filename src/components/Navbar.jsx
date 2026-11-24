import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Truck,
  Calculator,
  Search,
  ShieldCheck,
  UserPlus,
  LogIn
} from 'lucide-react';
import logoImg from '../assets/Logo.png';

export default function Navbar({ activePage, navigateTo, openFranchiseModal, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shipmentsDropdownOpen, setShipmentsDropdownOpen] = useState(false);

  const handleNav = (page, params = {}) => {
    setMobileMenuOpen(false);
    setShipmentsDropdownOpen(false);
    navigateTo(page, params);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          aria-label="SWISSDARL Freight & Logistics Home"
          className="flex items-center shrink-0 rounded-lg overflow-hidden border border-slate-800/90 hover:border-slate-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/60"
        >
          <img
            src={logoImg}
            alt="SWISSDARL Freight & Logistics"
            className="h-9 sm:h-10 w-auto object-contain block"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Hubs & Contact' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-bold transition cursor-pointer ${
                activePage === item.id
                  ? 'bg-rose-600/15 text-rose-400 border border-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setShipmentsDropdownOpen(true)}
            onMouseLeave={() => setShipmentsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => handleNav('shipments', { shipmentsTab: 'track' })}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-bold transition flex items-center gap-1 cursor-pointer ${
                activePage === 'shipments'
                  ? 'bg-rose-600/15 text-rose-400 border border-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>Shipments</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {shipmentsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-60 z-50">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 space-y-1">
                  <button
                    type="button"
                    onClick={() => handleNav('shipments', { shipmentsTab: 'track' })}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <p className="font-bold">Track Waybill</p>
                      <p className="text-[11px] text-slate-400">Live milestone status</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('shipments', { shipmentsTab: 'ship' })}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold">Book Shipment</p>
                      <p className="text-[11px] text-slate-400">Dispatch parcel or cargo</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('shipments', { shipmentsTab: 'rate' })}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold">Rate Calculator</p>
                      <p className="text-[11px] text-slate-400">Instant freight tariff estimate</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={openFranchiseModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-700/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Franchise</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                {currentUser.name || currentUser.email}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNav('login')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-800 transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => handleNav('register')}
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-950/60 transition flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services Catalog' },
            { id: 'about', label: 'About SWISSDARL' },
            { id: 'contact', label: 'Hubs & Contact' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-900 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleNav('shipments', { shipmentsTab: 'track' })}
              className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-rose-400 text-center cursor-pointer"
            >
              Track
            </button>
            <button
              type="button"
              onClick={() => handleNav('shipments', { shipmentsTab: 'ship' })}
              className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 text-center cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => handleNav('shipments', { shipmentsTab: 'rate' })}
              className="py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 text-center cursor-pointer"
            >
              Rate Calc
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openFranchiseModal();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-bold cursor-pointer"
            >
              Apply for Franchise
            </button>
            <button
              type="button"
              onClick={() => handleNav('register')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs font-extrabold cursor-pointer"
            >
              Open Client Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}