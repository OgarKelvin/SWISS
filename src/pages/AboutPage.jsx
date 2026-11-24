import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import multimodalImg from '../assets/transport-i-logistyka-statku-container-cargo-i-samolotu-cargo-renderowania-3d-i-ilustracji.jpg';
import warehouseImg from '../assets/international_warehouse_logistics.jpg';

export default function AboutPage({ navigateTo, openFranchiseModal }) {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="relative w-full py-16 sm:py-24 overflow-hidden border-b border-slate-200 bg-slate-900">
        <img
          src={multimodalImg}
          alt="SWISSDARL integrated air, maritime, and road freight network"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/80 to-slate-900/55" />

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
              About SWISSDARL Freight & Logistics
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Precision Cargo Movement Across Nigeria & Global Corridors
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              We connect manufacturers, retailers, importers, and everyday shippers through reliable hub terminals, customs clearance expertise, and disciplined linehaul execution.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigateTo && navigateTo('shipments', { shipmentsTab: 'ship' })}
                className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Dispatch a Shipment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => openFranchiseModal && openFranchiseModal()}
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Franchise Opportunities
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-14 sm:py-20 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
            <img
              src={warehouseImg}
              alt="Logistics operations managing palletized freight in warehouse"
              className="w-full h-72 sm:h-96 object-cover object-center"
            />
          </div>

          <div className="space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              Operational Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Built for Speed, Safety & Supply Chain Visibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From high-bay terminal sorting to interstate truck dispatches and customs documentation, every shipment follows clear HSEQ and waybill verification protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Licensed Customs & Port Brokerage',
                '6 Regional Nigerian Hub Terminals',
                'Interstate & Last-Mile Fleet',
                'Real-Time Waybill Tracking'
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}