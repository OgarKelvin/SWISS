import React from 'react';
import { MapPin, Mail, Globe, ShieldCheck } from 'lucide-react';
import { HUB_LOCATIONS } from '../data/logisticsData';
import logoImg from '../assets/Logo.png';
import multimodalImg from "../assets/Logistics-Cover.jpg";

export default function Footer({ navigateTo, openFranchiseModal }) {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/90 text-slate-300">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                aria-label="SWISSDARL Freight & Logistics Home"
                className="inline-flex items-center rounded-lg overflow-hidden border border-slate-800/90 hover:border-slate-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/60"
              >
                <img
                  src={logoImg}
                  alt="SWISSDARL Freight & Logistics"
                  className="h-10 sm:h-11 w-auto object-contain block"
                />
              </button>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Integrated Freight & Cargo Network
              </p>
            </div>

            <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-800">
              <img
                src={multimodalImg}
                alt="Air, sea container vessel, and highway freight fleet"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-[11px] font-mono text-rose-300 bg-slate-950/85 px-2.5 py-0.5 rounded border border-slate-800">
                6 NG Hubs • 180+ Global Lanes
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Delivering air express, ocean & air customs brokerage, dedicated road linehaul, and e-commerce fulfillment across Nigeria and international trade routes.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Platform</h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home Overview', page: 'home' },
                { label: 'Freight Services', page: 'services' },
                { label: 'About Company', page: 'about' },
                { label: 'Hub Terminals & Contact', page: 'contact' },
                { label: 'Client Sign In', page: 'login' },
                { label: 'Create Account', page: 'register' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigateTo(link.page)}
                    className="text-slate-400 hover:text-rose-400 transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Shipment Operations</h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigateTo('shipments', { shipmentsTab: 'track' })}
                className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
              >
                <p className="text-xs font-bold text-white">Live Waybill Tracking</p>
                <p className="text-[11px] text-slate-400">Trace parcels & containers in real time</p>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('shipments', { shipmentsTab: 'ship' })}
                className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
              >
                <p className="text-xs font-bold text-white">Book Cargo Dispatch</p>
                <p className="text-[11px] text-slate-400">Schedule pickup or terminal drop-off</p>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('shipments', { shipmentsTab: 'rate' })}
                className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
              >
                <p className="text-xs font-bold text-white">Freight Rate Calculator</p>
                <p className="text-[11px] text-slate-400">Estimate air, road & sea charges</p>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Regional Hubs</h3>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {HUB_LOCATIONS.map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="flex items-center gap-1.5 text-left px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-slate-300 truncate cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{hub.city}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={openFranchiseModal}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Partner / Franchise Inquiry</span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SWISSDARL Freight & Logistics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-rose-500" />
              Nigeria & Global Corridors
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              info@swissdarl.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}