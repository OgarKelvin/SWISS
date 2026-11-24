import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Calculator,
  Truck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Navigation,
  ChevronRight,
  ChevronLeft,
  Ship,
  Globe,
  Clock,
  CheckCircle2,
  MapPin,
  Warehouse,
  Building2
} from 'lucide-react';
import { ALL_SERVICES, HUB_LOCATIONS } from '../data/logisticsData';

import multimodalImg from '../assets/transport-i-logistyka-statku-container-cargo-i-samolotu-cargo-renderowania-3d-i-ilustracji.jpg';
import logisticsCoverImg from '../assets/Logistics-Cover.jpg';
import sunsetFleetImg from '../assets/global-transportation-logistics-sunset_23-2151989535.avif';
import warehouseLogisticsImg from '../assets/international_warehouse_logistics.jpg';
import warehouseFulfillmentImg from '../assets/Warehousing-and-Fulfillment-06.avif';
import deliveryVanImg from '../assets/open-rear-doors-white-commercial-delivery-van_912079-21324.avif';
import courierDispatchImg from '../assets/logistics.jpg';
import managerTelemetryImg from '../assets/role-of-a-logistic-manager-scaled.jpg';
import portCraneImg from '../assets/images.jpg';

const HERO_SLIDES = [
  {
    id: 0,
    badge: "Africa's Premier Integrated Cargo Infrastructure",
    badgeIcon: Sparkles,
    titlePrefix: 'Welcome to SWISSDARL.',
    titleHighlight: 'Quality Drivers. Great Prices. Tracking. Stress-Free Deliveries.',
    description:
      'SWISSDARL Freight & Logistics powers fast, compliant, and tracked cargo deliveries across 6 major Nigerian hub terminals, 36 states, and 180+ global destinations.',
    primaryCta: {
      label: 'Book & Dispatch Parcel',
      tab: 'ship',
      icon: Package
    },
    secondaryCta: {
      label: 'Explore Services Catalog',
      page: 'services'
    },
    image: multimodalImg,
    imageAlt: 'Cargo aircraft, ocean container vessel, gantry crane, and highway freight trucks',
    captionTitle: 'Air, Ocean & Road Multimodal Cargo',
    captionSub: '24/7 Nationwide & 180+ Global Corridors'
  },
  {
    id: 1,
    badge: 'Licensed Customs Brokerage & Port Clearance',
    badgeIcon: Ship,
    titlePrefix: 'Full Sustainable Cargo Solutions.',
    titleHighlight: 'Zero Demurrage Delay.',
    description:
      'End-to-end Apapa, Tin Can, Onne, and MMIA air cargo clearance with HSEQ-certified handling, bonded warehousing, and real-time regulatory documentation.',
    primaryCta: {
      label: 'Calculate Freight Rate',
      tab: 'rate',
      icon: Calculator
    },
    secondaryCta: {
      label: 'View Hub Terminals',
      page: 'contact'
    },
    image: managerTelemetryImg,
    imageAlt: 'Logistics operations specialist monitoring connected global fleet routes',
    captionTitle: 'Connected Fleet & Customs Clearance',
    captionSub: 'Apapa • Tin Can • Onne • MMIA'
  },
  {
    id: 2,
    badge: 'Enterprise E-Commerce & Dedicated Haulage',
    badgeIcon: Truck,
    titlePrefix: 'Interstate Linehaul &',
    titleHighlight: 'Same-Day Last Mile.',
    description:
      'Scale your supply chain with GPS-monitored trucks, automated tracking milestones, and direct fulfillment across Lagos, Abuja, Port Harcourt, Kano, Enugu & Benin.',
    primaryCta: {
      label: 'Open Client Account',
      page: 'register',
      icon: Navigation
    },
    secondaryCta: {
      label: 'About SWISSDARL',
      page: 'about'
    },
    image: sunsetFleetImg,
    imageAlt: 'Heavy interstate freight semi-truck, air cargo, and container ship at sunset',
    captionTitle: 'Dedicated Interstate Linehaul Fleet',
    captionSub: 'Lagos • Abuja • PH • Kano • Enugu • Benin'
  }
];

const SERVICE_CARD_IMAGES = [
  logisticsCoverImg,
  sunsetFleetImg,
  portCraneImg,
  deliveryVanImg
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Calculate & Book Online',
    desc: 'Generate an instant freight quote, choose air, sea, or road express, and issue a digital waybill in seconds.',
    image: courierDispatchImg,
    alt: 'Courier specialist loading parcels for dispatch'
  },
  {
    step: '02',
    title: 'Hub Pickup & Customs Clearance',
    desc: 'Our dispatched fleet collects your cargo or receives it at any of our 6 Nigerian hub terminals with full HSEQ compliance.',
    image: warehouseLogisticsImg,
    alt: 'Warehouse logistics facility with automated pallet handling'
  },
  {
    step: '03',
    title: 'Live Telemetry to Proof of Delivery',
    desc: 'Monitor every scan milestone in real time until verified signature delivery at your recipient’s doorstep.',
    image: managerTelemetryImg,
    alt: 'Real-time route tracking and delivery coordination'
  }
];

const PILLAR_CARDS = [
  {
    icon: ShieldCheck,
    title: '100% HSEQ & Customs Licensed',
    desc: 'Licensed customs brokerage teams ensuring rapid port and air cargo clearance without costly terminal delays.',
    image: warehouseFulfillmentImg,
    alt: 'Warehouse forklift managing palletized cargo compliance'
  },
  {
    icon: Navigation,
    title: '6 Regional Hub Network',
    desc: 'Direct sorting and warehousing terminals in Lagos, Abuja, Port Harcourt, Benin City, Enugu, and Kano.',
    image: deliveryVanImg,
    alt: 'Delivery van loaded with sorted parcels at hub bay'
  },
  {
    icon: Warehouse,
    title: 'Bonded Warehousing & Last Mile',
    desc: 'High-bay storage, stock visibility, doorstep courier dispatch, and automated milestone notifications.',
    image: courierDispatchImg,
    alt: 'Last-mile parcel loading for doorstep delivery'
  }
];

export default function HomePage({ navigateTo, openFranchiseModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [trackingId, setTrackingId] = useState('SWD-884920-NG');
  const [shipOrigin, setShipOrigin] = useState('Lagos Hub');
  const [shipDestination, setShipDestination] = useState('Abuja Hub');
  const [shipMode, setShipMode] = useState('Express Road');

  const [calcOrigin, setCalcOrigin] = useState('Lagos');
  const [calcDest, setCalcDest] = useState('Port Harcourt');
  const [calcWeight, setCalcWeight] = useState('15');
  const [calcService, setCalcService] = useState('road');

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const activeSlide = HERO_SLIDES[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;
  const PrimaryIcon = activeSlide.primaryCta.icon;

  const numericWeight = Math.max(0.5, parseFloat(calcWeight) || 1);
  const perKgRate = calcService === 'air' ? 2400 : calcService === 'sea' ? 950 : 850;
  const baseFee = calcService === 'air' ? 8500 : calcService === 'sea' ? 12000 : 4500;
  const estimatedRate = Math.round(baseFee + numericWeight * perKgRate);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    navigateTo('shipments', { shipmentsTab: 'track', trackingId: trackingId.trim() || 'SWD-884920-NG' });
  };

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    navigateTo('shipments', {
      shipmentsTab: 'ship',
      origin: shipOrigin,
      destination: shipDestination,
      serviceType: shipMode
    });
  };

  const handleQuickRateSubmit = (e) => {
    e.preventDefault();
    navigateTo('shipments', {
      shipmentsTab: 'rate',
      origin: calcOrigin,
      destination: calcDest,
      weight: numericWeight,
      serviceType: calcService,
      estimatedRate
    });
  };

  return (
    <main className="w-full bg-white text-slate-900">
      {/* FULL-WIDTH HERO SLIDER */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full min-h-135min-h-[600px] lg:min-h-165 flex items-center overflow-hidden border-b border-slate-200 bg-slate-900"
      >
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/70 to-slate-900/35" />
        <div className="absolute inset-0 bg-linear-to-trom-slate-950/80 via-transparent to-slate-950/40" />

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="max-w-4xl space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600/95 border border-rose-500 text-white text-xs font-semibold shadow-sm">
                <BadgeIcon className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{activeSlide.badge}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200 text-slate-900 text-xs font-mono shadow-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{activeSlide.captionSub}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              {activeSlide.titlePrefix}{' '}
              <span className="text-rose-400">{activeSlide.titleHighlight}</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-100 leading-relaxed max-w-3xl">
              {activeSlide.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() =>
                  activeSlide.primaryCta.tab
                    ? navigateTo('shipments', { shipmentsTab: activeSlide.primaryCta.tab })
                    : navigateTo(activeSlide.primaryCta.page)
                }
                className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-lg transition inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <PrimaryIcon className="w-4 h-4 shrink-0" />
                <span>{activeSlide.primaryCta.label}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo(activeSlide.secondaryCta.page)}
                className="bg-white/95 hover:bg-white text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-200 shadow-md transition inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{activeSlide.secondaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 max-w-3xl">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200 text-slate-900 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200 text-slate-900 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 ml-2" role="tablist" aria-label="Hero slides">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}: ${slide.captionTitle}`}
                      aria-selected={currentSlide === idx}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx
                          ? 'w-10 bg-rose-500'
                          : 'w-2.5 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold text-white">{activeSlide.captionTitle}</p>
                <p className="text-[11px] font-mono text-rose-300">
                  Slide 0{currentSlide + 1} / 0{HERO_SLIDES.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK, BOOK SHIPMENT & RATE CALCULATOR */}
      <section className="w-full py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                Dispatch Command Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Track, Ship & Calculate Freight Rates
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('shipments', { shipmentsTab: 'track' })}
              className="text-xs font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Shipments Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* 1. TRACK WAYBILL */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-rose-600 shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900">Track Waybill</h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Status
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Enter your SWISSDARL tracking code to view hub scans, transit checkpoints, and delivery status.
                </p>

                <form onSubmit={handleTrackSubmit} className="space-y-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Waybill / Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. SWD-884920-NG"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-rose-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Track Shipment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span>Sample IDs:</span>
                {['SWD-884920-NG', 'SWD-301944-INT'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setTrackingId(sample)}
                    className="font-mono text-rose-600 font-semibold hover:underline cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. BOOK SHIPMENT */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900">Book Shipment</h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Dispatch
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Select your pickup hub, destination terminal, and transport mode to launch a waybill booking.
                </p>

                <form onSubmit={handleQuickBookSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Origin Hub
                      </label>
                      <select
                        value={shipOrigin}
                        onChange={(e) => setShipOrigin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                      >
                        <option>Lagos Hub</option>
                        <option>Abuja Hub</option>
                        <option>Port Harcourt Hub</option>
                        <option>Kano Hub</option>
                        <option>Enugu Hub</option>
                        <option>Benin Hub</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Destination
                      </label>
                      <select
                        value={shipDestination}
                        onChange={(e) => setShipDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                      >
                        <option>Abuja Hub</option>
                        <option>Lagos Hub</option>
                        <option>Port Harcourt Hub</option>
                        <option>Kano Hub</option>
                        <option>Enugu Hub</option>
                        <option>Benin Hub</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Service Mode
                    </label>
                    <select
                      value={shipMode}
                      onChange={(e) => setShipMode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                    >
                      <option>Express Road</option>
                      <option>Priority Air Cargo</option>
                      <option>Dedicated Haulage</option>
                      <option>Customs & Ocean Freight</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Continue to Booking</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </form>
              </div>
            </div>

            {/* 3. RATE CALCULATOR */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900">Rate Calculator</h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Instant Quote
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  Estimate freight tariff by route corridor, cargo weight, and shipping tier.
                </p>

                <form onSubmit={handleQuickRateSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        From
                      </label>
                      <input
                        type="text"
                        value={calcOrigin}
                        onChange={(e) => setCalcOrigin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        To
                      </label>
                      <input
                        type="text"
                        value={calcDest}
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Tier
                      </label>
                      <select
                        value={calcService}
                        onChange={(e) => setCalcService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-600"
                      >
                        <option value="road">Road Express</option>
                        <option value="air">Air Express</option>
                        <option value="sea">Sea / Cargo</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="text-xs text-slate-700 font-medium">Est. Tariff:</span>
                    <span className="text-sm sm:text-base font-black font-mono text-amber-800">
                      ₦{estimatedRate.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Full Rate Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FREIGHT SERVICES */}
      <section className="w-full py-14 sm:py-20 bg-white">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest">Core Operations</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Featured Freight Solutions</h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs px-5 py-3 rounded-xl transition inline-flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-4 h-4 text-rose-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {ALL_SERVICES.slice(0, 4).map((service, idx) => {
              const IconComp = service.icon;
              const imgSrc = SERVICE_CARD_IMAGES[idx % SERVICE_CARD_IMAGES.length];
              return (
                <div
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-rose-400 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden border-b border-slate-200">
                      <img
                        src={imgSrc}
                        alt={service.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-trom-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/95 border border-slate-200 text-rose-600 shadow-xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="absolute bottom-2.5 right-3 text-[11px] font-mono bg-white/95 text-rose-700 font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                        {service.sla}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.tagline}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() => navigateTo('services')}
                      className="text-xs text-rose-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Learn Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THREE-STEP LOGISTICS WORKFLOW */}
      <section className="w-full py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest">Streamlined Dispatch</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Ship in Three Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden border-b border-slate-200">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 border border-rose-200 text-xs font-black font-mono text-rose-600 shadow-xs">
                    STEP {item.step}
                  </span>
                </div>
                <div className="p-6 sm:p-7 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH SWISSDARL & REGIONAL HUBS */}
      <section className="w-full py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest">Engineered Reliability</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Why Businesses Partner with SWISSDARL</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PILLAR_CARDS.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden border-b border-slate-200">
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex-1">
                    <PillarIcon className="w-8 h-8 text-rose-600 mb-3" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* REGIONAL HUBS DIRECTORY */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-60 border-b lg:border-b-0 lg:border-r border-slate-200">
              <img
                src={managerTelemetryImg}
                alt="Connected Nigerian logistics hub terminals and supply corridors"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-trom-slate-950/85 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">
                  Nationwide Footprint
                </span>
                <p className="text-lg font-extrabold text-white">6 Nigerian Hub Terminals</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-rose-600 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">Active Nigerian Regional Terminals</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="text-xs font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Terminal Addresses & Contacts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HUB_LOCATIONS.map((hub) => (
                    <div
                      key={hub.id}
                      onClick={() => navigateTo('contact')}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-400 shadow-2xs transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{hub.city}</p>
                          <p className="text-[11px] text-slate-500 truncate">{hub.badge}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRANCHISE EXPANSION BANNER */}
      <section className="w-full py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
            <img
              src={sunsetFleetImg}
              alt="SWISSDARL franchise linehaul fleet expansion"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 pointer-events-none"
            />
            <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 bg-linear-to-r from-rose-950/90 via-slate-900/85 to-slate-900/80">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-300 uppercase tracking-widest">
                  <Building2 className="w-4 h-4" />
                  <span>Business Expansion</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Own a SWISSDARL Freight Franchise</h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Tap into West Africa's booming supply chain network. Operate a licensed regional hub outlet with freight dispatch access and operational support.
                </p>
              </div>
              <button
                type="button"
                onClick={openFranchiseModal}
                className="w-full md:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition text-xs sm:text-sm shrink-0 cursor-pointer"
              >
                Apply for Franchise Hub
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}