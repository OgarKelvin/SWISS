import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ALL_SERVICES } from '../data/logisticsData';
import logisticsCoverImg from '../assets/Logistics-Cover.jpg';
import sunsetFleetImg from '../assets/global-transportation-logistics-sunset_23-2151989535.avif';
import portCraneImg from '../assets/images.jpg';
import deliveryVanImg from '../assets/open-rear-doors-white-commercial-delivery-van_912079-21324.avif';
import warehouseLogisticsImg from '../assets/international_warehouse_logistics.jpg';
import maxProductivityImg from '../assets/Maximum-productivity.png';
import warehouseFulfillmentImg from '../assets/Warehousing-and-Fulfillment-06.avif';
import courierDispatchImg from '../assets/logistics.jpg';

const SERVICE_PHOTOS = [
  logisticsCoverImg,
  sunsetFleetImg,
  portCraneImg,
  deliveryVanImg,
  warehouseLogisticsImg,
  maxProductivityImg,
  warehouseFulfillmentImg,
  courierDispatchImg
];

export default function ServicesPage({ navigateTo, onSelectServiceForRfp }) {
  return (
    <main className="w-full bg-white text-slate-900 py-12 sm:py-16">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              Complete Cargo Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Logistics & Freight Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
              Air express, customs & port clearance, interstate truck haulage, warehousing, and last-mile fulfillment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo && navigateTo('shipments', { shipmentsTab: 'rate' })}
            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition inline-flex items-center gap-2 self-start md:self-auto shadow-xs cursor-pointer"
          >
            <span>Calculate Freight Rate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ALL_SERVICES.map((service, idx) => {
            const IconComp = service.icon;
            const photo = SERVICE_PHOTOS[idx % SERVICE_PHOTOS.length];
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-rose-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden border-b border-slate-200">
                    <img
                      src={photo}
                      alt={service.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/95 border border-slate-200 text-rose-600 shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h2>
                    <p className="text-xs font-mono text-rose-600 font-semibold mb-2">{service.sla}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{service.tagline}</p>
                    {Array.isArray(service.features) && (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {service.features.slice(0, 3).map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => navigateTo && navigateTo('shipments', { shipmentsTab: 'ship' })}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition cursor-pointer"
                  >
                    Book This Service
                  </button>
                  {onSelectServiceForRfp && (
                    <button
                      type="button"
                      onClick={() => onSelectServiceForRfp(service)}
                      className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
                    >
                      Request Corporate Quote
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}