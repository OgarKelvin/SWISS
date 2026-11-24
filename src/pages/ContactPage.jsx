import React, { useState } from 'react';
import { MapPin, Phone, Mail, Copy } from 'lucide-react';
import { HUB_LOCATIONS } from '../data/logisticsData';
import networkPhoto from '../assets/role-of-a-logistic-manager-scaled.jpg';

export default function ContactPage({ copyToClipboard, triggerToast }) {
  const [selectedHub, setSelectedHub] = useState(HUB_LOCATIONS[0]);

  return (
    <main className="py-8 sm:py-12 space-y-12 sm:space-y-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* TOP SUPPORT HEADER & INQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest">Get in Touch</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Contact SWISSDARL</h1>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Have questions about an active waybill, corporate haulage contract, or custom air charter? Our customer care desks operate 24/7.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Head Office Address</strong>
                  <span className="text-slate-700">
                    28 Funsho Williams Avenue (Formerly Western Avenue), Ojuelegba, Surulere, Lagos State
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Corporate Telephones</strong>
                  <span className="text-slate-700 block">+234 803 488 2668 (Headquarters Hotline)</span>
                  <span className="text-slate-600 block">+234 916 997 6717 (Abuja Desk)</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Email Desks</strong>
                  <span className="text-slate-700 block break-all">info@swissdarl.com | support@swissdarl.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* GENERAL INQUIRY FORM */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Send a Direct Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast('Message sent! Our support team will reply via email shortly.');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-rose-600"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-rose-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number (+234...)"
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-rose-600"
                />
                <select className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-rose-600">
                  <option>General Support Inquiry</option>
                  <option>Waybill / Tracking Dispute</option>
                  <option>Enterprise Haulage Quote</option>
                  <option>Franchise Partnership</option>
                </select>
              </div>

              <textarea
                rows="4"
                required
                placeholder="Write your message or parcel tracking details here..."
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-rose-600"
              />

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition text-xs shadow-xs"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>

        {/* HUB LOCATOR SECTION */}
        <div className="pt-12 border-t border-slate-200 mt-12">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest">Regional Network</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">SWISSDARL 6 Nigerian Hub Terminals</h2>
            <p className="text-xs text-slate-600 mt-2">
              Select a regional office below to inspect exact physical street addresses, manager contacts, and capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* HUB SELECTOR */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {HUB_LOCATIONS.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    selectedHub.id === hub.id
                      ? 'bg-rose-50/70 border-rose-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{hub.city}</span>
                    </h3>
                    <span className="text-[10px] bg-rose-100 border border-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                      {hub.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{hub.address}</p>
                </div>
              ))}
            </div>

            {/* SELECTED HUB DETAILS CARD */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ACTIVE TERMINAL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedHub.city}</h3>
                  <p className="text-xs text-rose-600 font-semibold">{selectedHub.type}</p>
                </div>

                <button
                  onClick={() => copyToClipboard(`${selectedHub.city}: ${selectedHub.address} | Tel: ${selectedHub.phone}`)}
                  className="bg-white border border-slate-300 text-slate-700 hover:text-slate-950 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Exact Address</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{selectedHub.address}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Terminal Telephone</span>
                  <p className="text-slate-900 font-mono font-bold text-sm flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <a href={`tel:${selectedHub.phone}`} className="hover:underline">{selectedHub.phone}</a>
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Working Hours</span>
                  <p className="text-slate-800 font-medium">{selectedHub.hours}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block mb-1">Terminal Throughput</span>
                  <p className="text-slate-800 font-medium">{selectedHub.capacity}</p>
                </div>
              </div>

              {/* INTER-STATE TRANSIT NETWORK VISUAL (REPLACING VECTOR SVG WITH ASSET PHOTO) */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                  Inter-State Transit Network & Live Dispatch Corridors
                </p>
                <div className="w-full h-48 sm:h-56 bg-slate-900 rounded-xl border border-slate-200 relative overflow-hidden">
                  <img
                    src={networkPhoto}
                    alt="SWISSDARL nationwide hub connectivity and dispatch operations"
                    className="w-full h-full object-cover object-center opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {HUB_LOCATIONS.map((h) => {
                      const isSel = h.id === selectedHub.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => setSelectedHub(h)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                            isSel
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-white/90 text-slate-900 hover:bg-white'
                          }`}
                        >
                          {h.city}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}