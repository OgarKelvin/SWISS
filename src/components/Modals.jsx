import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export function ToastBanner({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-auto sm:top-5 sm:right-5 left-4 sm:left-auto z-50 bg-rose-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
}

export function ServiceRfpModal({ service, onClose, triggerToast }) {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-950"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold text-white pr-8">Quote Request: {service.title}</h3>
        <p className="text-xs text-slate-400">Fill in details for a custom commercial contract quote.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
            triggerToast(`Quote request for ${service.title} received!`);
          }}
          className="space-y-3"
        >
          <input
            type="text"
            required
            placeholder="Company / Contact Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />
          <input
            type="email"
            required
            placeholder="Work Email"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />
          <textarea
            rows="3"
            required
            placeholder="Route and quantity requirements..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition text-xs"
          >
            Submit Custom Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}

export function FranchiseModal({ isOpen, onClose, triggerToast }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-950"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold text-white pr-8">SWISSDARL Hub Franchise</h3>
        <p className="text-xs text-slate-400">Apply to operate a SWISSDARL terminal outlet in your city.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
            triggerToast('Franchise inquiry submitted! Expansion team will contact you.');
          }}
          className="space-y-3"
        >
          <input
            type="text"
            required
            placeholder="Applicant Full Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />
          <input
            type="tel"
            required
            placeholder="Phone Number (+234...)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />
          <input
            type="text"
            required
            placeholder="Proposed State / City"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
          />

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition text-xs"
          >
            Submit Franchise Application
          </button>
        </form>
      </div>
    </div>
  );
}
