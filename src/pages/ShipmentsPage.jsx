import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Clock,
  Copy,
  ChevronRight
} from 'lucide-react';

export default function ShipmentsPage({
  trackingDatabase,
  setTrackingDatabase,
  initialTab = 'track',
  initialTrackingId = 'SWD-884920-NG',
  copyToClipboard,
  triggerToast
}) {
  const [shipmentsTab, setShipmentsTab] = useState(initialTab);
  const [trackingInput, setTrackingInput] = useState(initialTrackingId);
  const [activeTrackingResult, setActiveTrackingResult] = useState(
    trackingDatabase[initialTrackingId] || trackingDatabase['SWD-884920-NG']
  );
  const [trackingError, setTrackingError] = useState('');

  // Sync if navigated from Home Quick Track
  useEffect(() => {
    if (initialTab) setShipmentsTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (initialTrackingId) {
      setTrackingInput(initialTrackingId);
      if (trackingDatabase[initialTrackingId]) {
        setActiveTrackingResult(trackingDatabase[initialTrackingId]);
      }
    }
  }, [initialTrackingId, trackingDatabase]);

  // Rate Calculator State
  const [calcMode, setCalcMode] = useState('domestic');
  const [origin, setOrigin] = useState('Lagos');
  const [destination, setDestination] = useState('Port Harcourt');
  const [weight, setWeight] = useState(15);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [packageType, setPackageType] = useState('Parcel');
  const [rateEstimate, setRateEstimate] = useState(null);

  // Booking Shipment Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    senderName: '',
    senderPhone: '',
    senderCity: 'Lagos',
    receiverName: '',
    receiverPhone: '',
    receiverCity: 'Abuja',
    itemDescription: '',
    weight: '5.0',
    declaredValue: '50000',
    insuranceNeeded: true
  });
  const [generatedWaybill, setGeneratedWaybill] = useState(null);

  const handleTrackSubmit = (e) => {
    if (e) e.preventDefault();
    setTrackingError('');
    const cleanId = trackingInput.trim().toUpperCase();
    if (!cleanId) {
      setTrackingError('Please enter a valid tracking ID');
      return;
    }

    if (trackingDatabase[cleanId]) {
      setActiveTrackingResult(trackingDatabase[cleanId]);
    } else {
      const generatedMock = {
        id: cleanId,
        type: 'Express Consignment',
        sender: 'Registered Client (Standard Dispatch)',
        receiver: 'Verified Recipient',
        origin: origin || 'Lagos HQ Hub',
        destination: destination || 'Destination Hub',
        weight: '8.20 Kg',
        pieces: 1,
        serviceLevel: 'Standard Ground/Air Express',
        estDelivery: 'In 2 Business Days',
        currentStatus: 'In Transit - Batch Scanned',
        statusCode: 'IN_TRANSIT',
        progress: 45,
        events: [
          { time: 'Today, 08:00 AM', location: 'Origin Sorting Hub', status: 'Package Logged into SWISSDARL Network', completed: true },
          { time: 'Today, 11:30 AM', location: 'Interstate Hub', status: 'Security Scanned & Consigned to Driver', completed: true },
          { time: 'Tomorrow, 09:00 AM', location: 'Destination Hub', status: 'Arrival Inspection Pending', completed: false }
        ]
      };
      setActiveTrackingResult(generatedMock);
    }
  };

  const calculateShippingRate = (e) => {
    if (e) e.preventDefault();
    let numericWeight = parseFloat(weight) || 1;
    if (weightUnit === 'lb') numericWeight = numericWeight * 0.453592;

    let baseRate = calcMode === 'domestic' ? 2800 : 18500;
    let ratePerKg = calcMode === 'domestic' ? 450 : 3200;

    if (packageType === 'Document') baseRate *= 0.6;
    if (packageType === 'Heavy Freight') baseRate *= 1.4;

    const totalCost = baseRate + numericWeight * ratePerKg;

    setRateEstimate({
      currency: calcMode === 'domestic' ? '₦' : '$',
      express: {
        title: 'SWISSDARL Priority Air/Express',
        cost: Math.round(totalCost * 1.35).toLocaleString(),
        time: calcMode === 'domestic' ? '12 - 24 Hours' : '2 - 3 Days'
      },
      standard: {
        title: 'Standard Freight Logistics',
        cost: Math.round(totalCost).toLocaleString(),
        time: calcMode === 'domestic' ? '24 - 48 Hours' : '4 - 6 Days'
      },
      economy: {
        title: 'Economy Consolidated Haulage',
        cost: Math.round(totalCost * 0.75).toLocaleString(),
        time: calcMode === 'domestic' ? '3 - 4 Days' : '7 - 10 Days'
      }
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const waybillNum = `SWD-${Math.floor(100000 + Math.random() * 900000)}-NG`;
    const numericWt = parseFloat(bookingData.weight || 1);
    const estCostNum = 2500 + numericWt * 650;

    const newWaybill = {
      ...bookingData,
      waybillCode: waybillNum,
      createdAt: new Date().toLocaleString(),
      barcode: `||| |||||| | ||||| ${waybillNum} ||||`,
      estimatedCost: `₦ ${estCostNum.toLocaleString()}`
    };

    const newTrackingRecord = {
      id: waybillNum,
      type: `${bookingData.itemDescription || 'General Cargo'} (Dispatched)`,
      sender: `${bookingData.senderName} (${bookingData.senderCity})`,
      receiver: `${bookingData.receiverName} (${bookingData.receiverCity})`,
      origin: `${bookingData.senderCity} Hub`,
      destination: `${bookingData.receiverCity} Hub`,
      weight: `${numericWt} Kg`,
      pieces: 1,
      serviceLevel: 'Guaranteed SWISSDARL Express',
      estDelivery: 'Within 24 Hours',
      currentStatus: 'Waybill Issued - Awaiting Courier Pick-up',
      statusCode: 'BOOKED',
      progress: 15,
      events: [
        { time: 'Just now', location: `${bookingData.senderCity} Hub`, status: 'Waybill Manifest Generated Online', completed: true },
        { time: 'Pending', location: 'Courier Dispatch', status: 'Scheduled for Driver Pickup', completed: false }
      ]
    };

    setTrackingDatabase((prev) => ({ ...prev, [waybillNum]: newTrackingRecord }));
    setGeneratedWaybill(newWaybill);
    setBookingStep(3);
    triggerToast(`Waybill ${waybillNum} created & added to Live Tracking!`);
  };

  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* PAGE HEADER */}
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-extrabold text-rose-500 uppercase tracking-widest">Freight Operations</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Logistics Command Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track consignments, calculate instant shipping quotes, or dispatch new parcels nationwide.
          </p>
        </div>

        {/* TAB SELECTOR */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-800 bg-slate-950/60">
            <button
              onClick={() => setShipmentsTab('track')}
              className={`py-3.5 sm:py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition border-b sm:border-b-0 border-slate-800 ${
                shipmentsTab === 'track'
                  ? 'text-white bg-slate-900 border-l-4 sm:border-l-0 sm:border-t-2 border-rose-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4 text-rose-500 shrink-0" />
              <span>1. Track Shipment</span>
            </button>

            <button
              onClick={() => setShipmentsTab('rate')}
              className={`py-3.5 sm:py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition border-b sm:border-b-0 border-slate-800 ${
                shipmentsTab === 'rate'
                  ? 'text-white bg-slate-900 border-l-4 sm:border-l-0 sm:border-t-2 border-rose-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-rose-500 shrink-0" />
              <span>2. Rate Calculator</span>
            </button>

            <button
              onClick={() => setShipmentsTab('ship')}
              className={`py-3.5 sm:py-4 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                shipmentsTab === 'ship'
                  ? 'text-white bg-slate-900 border-l-4 sm:border-l-0 sm:border-t-2 border-rose-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 text-rose-500 shrink-0" />
              <span>3. Book / Send Shipment</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* TAB 1: TRACK SHIPMENT */}
            {shipmentsTab === 'track' && (
              <div className="space-y-6">
                <form onSubmit={handleTrackSubmit} className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Enter Waybill / Consignment Tracking Number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="e.g. SWD-884920-NG"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 font-mono text-sm focus:border-rose-500 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-7 py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Track Waybill</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* QUICK SAMPLE BUTTONS */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
                    <span className="font-semibold text-slate-500">Sample Live Demo IDs:</span>
                    {Object.keys(trackingDatabase).map((sampleId) => (
                      <button
                        key={sampleId}
                        type="button"
                        onClick={() => {
                          setTrackingInput(sampleId);
                          setActiveTrackingResult(trackingDatabase[sampleId]);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-rose-400 font-mono px-2.5 py-1 rounded-md border border-slate-800 transition"
                      >
                        {sampleId}
                      </button>
                    ))}
                  </div>

                  {trackingError && <p className="text-xs text-rose-400">{trackingError}</p>}
                </form>

                {/* TRACKING DISPLAY RESULT */}
                {activeTrackingResult && (
                  <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-lg sm:text-xl font-bold text-rose-400">
                            {activeTrackingResult.id}
                          </span>
                          <span className="bg-emerald-950 border border-emerald-800 text-emerald-400 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {activeTrackingResult.currentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Service Level: <span className="text-slate-200">{activeTrackingResult.serviceLevel}</span>
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs text-slate-400">Est. Arrival SLA</p>
                        <p className="text-sm font-bold text-slate-100">{activeTrackingResult.estDelivery}</p>
                      </div>
                    </div>

                    {/* DETAILS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Sender</span>
                        <span className="font-semibold text-slate-200">{activeTrackingResult.sender}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Receiver</span>
                        <span className="font-semibold text-slate-200">{activeTrackingResult.receiver}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Weight / Pieces</span>
                        <span className="font-semibold text-slate-200">
                          {activeTrackingResult.weight} ({activeTrackingResult.pieces} Pcs)
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Route Transit</span>
                        <span className="font-semibold text-slate-200">
                          {activeTrackingResult.origin} → {activeTrackingResult.destination}
                        </span>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                        <span>Origin Terminal</span>
                        <span>Destination Gateway</span>
                      </div>
                      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="bg-linear-to-r from-rose-600 to-emerald-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${activeTrackingResult.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scanned Checkpoint Log</p>
                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                        {activeTrackingResult.events.map((ev, idx) => (
                          <div key={idx} className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                            <div
                              className={`absolute -left-5.75 top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                                ev.completed
                                  ? 'bg-rose-600 border-slate-950 ring-2 ring-rose-900/50'
                                  : 'bg-slate-800 border-slate-600'
                              }`}
                            />
                            <div>
                              <p className={`font-semibold ${ev.completed ? 'text-slate-100' : 'text-slate-500'}`}>
                                {ev.status}
                              </p>
                              <p className="text-slate-400 text-[11px]">{ev.location}</p>
                            </div>
                            <span className="text-slate-500 font-mono text-[11px] shrink-0">{ev.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => copyToClipboard(activeTrackingResult.id)}
                        className="text-xs bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 px-3.5 py-2 rounded-lg flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Waybill Number</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RATE CALCULATOR */}
            {shipmentsTab === 'rate' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-950 p-1.5 rounded-xl border border-slate-800 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setCalcMode('domestic');
                      setOrigin('Lagos');
                      setDestination('Port Harcourt');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      calcMode === 'domestic' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Domestic Nigeria
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalcMode('international');
                      setOrigin('Lagos, Nigeria');
                      setDestination('London Heathrow, UK');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      calcMode === 'international' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    International Freight
                  </button>
                </div>

                <form onSubmit={calculateShippingRate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Origin Hub</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-rose-500"
                    >
                      {calcMode === 'domestic' ? (
                        <>
                          <option value="Lagos">Lagos (Head Office)</option>
                          <option value="Abuja">Abuja FCT</option>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Benin">Benin City</option>
                          <option value="Enugu">Enugu</option>
                          <option value="Kano">Kano</option>
                        </>
                      ) : (
                        <>
                          <option value="Lagos, Nigeria">Lagos, Nigeria (LOS)</option>
                          <option value="London Heathrow, UK">London Heathrow, UK (LHR)</option>
                          <option value="Guangzhou, China">Guangzhou, China (CAN)</option>
                          <option value="Houston TX, USA">Houston TX, USA (IAH)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Destination Hub</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-rose-500"
                    >
                      {calcMode === 'domestic' ? (
                        <>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Abuja">Abuja FCT</option>
                          <option value="Lagos">Lagos (Head Office)</option>
                          <option value="Benin">Benin City</option>
                          <option value="Enugu">Enugu</option>
                          <option value="Kano">Kano</option>
                        </>
                      ) : (
                        <>
                          <option value="London Heathrow, UK">London Heathrow, UK (LHR)</option>
                          <option value="Lagos, Nigeria">Lagos, Nigeria (LOS)</option>
                          <option value="Houston TX, USA">Houston TX, USA (IAH)</option>
                          <option value="Guangzhou, China">Guangzhou, China (CAN)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-slate-400">Weight</label>
                      <div className="flex gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setWeightUnit('kg')}
                          className={`px-1.5 py-0.5 rounded ${weightUnit === 'kg' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
                        >
                          Kg
                        </button>
                        <button
                          type="button"
                          onClick={() => setWeightUnit('lb')}
                          className={`px-1.5 py-0.5 rounded ${weightUnit === 'lb' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
                        >
                          Lb
                        </button>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Package Type</label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-rose-500"
                    >
                      <option value="Parcel">Parcel Box</option>
                      <option value="Document">Document Envelope</option>
                      <option value="Heavy Freight">Heavy Freight Pallet</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3 rounded-xl transition text-xs flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Rate Quote</span>
                    </button>
                  </div>
                </form>

                {/* RATE RESULTS */}
                {rateEstimate && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                    <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/50 relative">
                      <span className="absolute -top-2.5 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        FASTEST
                      </span>
                      <h4 className="text-xs text-slate-400 font-semibold">{rateEstimate.express.title}</h4>
                      <p className="text-2xl font-black text-white mt-2">
                        {rateEstimate.currency} {rateEstimate.express.cost}
                      </p>
                      <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{rateEstimate.express.time}</span>
                      </p>
                      <button
                        onClick={() => setShipmentsTab('ship')}
                        className="mt-4 w-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2 rounded-lg transition"
                      >
                        Book Express SLA
                      </button>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs text-slate-400 font-semibold">{rateEstimate.standard.title}</h4>
                      <p className="text-2xl font-black text-white mt-2">
                        {rateEstimate.currency} {rateEstimate.standard.cost}
                      </p>
                      <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{rateEstimate.standard.time}</span>
                      </p>
                      <button
                        onClick={() => setShipmentsTab('ship')}
                        className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-lg transition"
                      >
                        Book Standard SLA
                      </button>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs text-slate-400 font-semibold">{rateEstimate.economy.title}</h4>
                      <p className="text-2xl font-black text-white mt-2">
                        {rateEstimate.currency} {rateEstimate.economy.cost}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{rateEstimate.economy.time}</span>
                      </p>
                      <button
                        onClick={() => setShipmentsTab('ship')}
                        className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-lg transition"
                      >
                        Book Economy SLA
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: BOOK / SEND SHIPMENT */}
            {shipmentsTab === 'ship' && (
              <div>
                {bookingStep < 3 ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          bookingStep >= 1 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        1
                      </div>
                      <span className="text-xs text-slate-300 font-medium">Parties Info</span>
                      <div className="h-0.5 flex-1 bg-slate-800" />
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          bookingStep >= 2 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        2
                      </div>
                      <span className="text-xs text-slate-300 font-medium">Cargo Specs</span>
                    </div>

                    {bookingStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Sender Information</h4>
                          <input
                            type="text"
                            required
                            placeholder="Full Name / Business Name"
                            value={bookingData.senderName}
                            onChange={(e) => setBookingData({ ...bookingData, senderName: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Sender Phone (+234...)"
                            value={bookingData.senderPhone}
                            onChange={(e) => setBookingData({ ...bookingData, senderPhone: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          />
                          <select
                            value={bookingData.senderCity}
                            onChange={(e) => setBookingData({ ...bookingData, senderCity: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          >
                            <option value="Lagos">Lagos (Head Office)</option>
                            <option value="Abuja">Abuja FCT</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Benin">Benin City</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Kano">Kano</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Receiver Information</h4>
                          <input
                            type="text"
                            required
                            placeholder="Receiver Name / Firm"
                            value={bookingData.receiverName}
                            onChange={(e) => setBookingData({ ...bookingData, receiverName: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Receiver Phone Number"
                            value={bookingData.receiverPhone}
                            onChange={(e) => setBookingData({ ...bookingData, receiverPhone: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          />
                          <select
                            value={bookingData.receiverCity}
                            onChange={(e) => setBookingData({ ...bookingData, receiverCity: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                          >
                            <option value="Abuja">Abuja FCT</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Lagos">Lagos (Head Office)</option>
                            <option value="Benin">Benin City</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Kano">Kano</option>
                          </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (!bookingData.senderName || !bookingData.receiverName) {
                                triggerToast('Please provide Sender and Receiver names');
                                return;
                              }
                              setBookingStep(2);
                            }}
                            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                          >
                            <span>Next: Cargo Specs</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Parcel Details &amp; Insurance</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Item Description</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Spare Parts, Laptops, Medical Supplies"
                              value={bookingData.itemDescription}
                              onChange={(e) => setBookingData({ ...bookingData, itemDescription: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Weight (Kg)</label>
                            <input
                              type="number"
                              required
                              min="0.5"
                              step="0.5"
                              value={bookingData.weight}
                              onChange={(e) => setBookingData({ ...bookingData, weight: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Declared Item Value (₦ NGN)</label>
                            <input
                              type="number"
                              value={bookingData.declaredValue}
                              onChange={(e) => setBookingData({ ...bookingData, declaredValue: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                            />
                          </div>

                          <div className="flex items-center gap-3 md:pt-6">
                            <input
                              type="checkbox"
                              id="insuranceBox"
                              checked={bookingData.insuranceNeeded}
                              onChange={(e) => setBookingData({ ...bookingData, insuranceNeeded: e.target.checked })}
                              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-rose-600 focus:ring-rose-500"
                            />
                            <label htmlFor="insuranceBox" className="text-xs text-slate-300">
                              Include SWISSDARL Transit Insurance (+₦ 500)
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 gap-3">
                          <button
                            type="button"
                            onClick={() => setBookingStep(1)}
                            className="text-slate-400 text-xs font-semibold hover:text-white px-3 py-2"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 sm:px-8 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Generate Official Waybill</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  /* GENERATED RECEIPT DISPLAY */
                  <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                          WAYBILL DISPATCH MANIFEST GENERATED
                        </span>
                        <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                          {generatedWaybill.waybillCode}
                        </h3>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedWaybill.waybillCode)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Waybill</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-slate-500">Sender</p>
                        <p className="font-semibold text-slate-200">
                          {generatedWaybill.senderName} ({generatedWaybill.senderCity})
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Receiver</p>
                        <p className="font-semibold text-slate-200">
                          {generatedWaybill.receiverName} ({generatedWaybill.receiverCity})
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Item Description</p>
                        <p className="font-semibold text-slate-200">
                          {generatedWaybill.itemDescription} ({generatedWaybill.weight} Kg)
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Total Waybill Fee</p>
                        <p className="font-bold text-emerald-400 text-sm">{generatedWaybill.estimatedCost}</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg text-center my-4 overflow-x-auto">
                      <p className="font-mono text-black text-xs font-extrabold tracking-widest whitespace-nowrap">
                        {generatedWaybill.barcode}
                      </p>
                      <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                        SWISSDARL FREIGHT &amp; LOGISTICS NIGERIA
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => {
                          setBookingStep(1);
                          setGeneratedWaybill(null);
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
                      >
                        Dispatch Another Parcel
                      </button>
                      <button
                        onClick={() => {
                          setTrackingInput(generatedWaybill.waybillCode);
                          setShipmentsTab('track');
                          setActiveTrackingResult(trackingDatabase[generatedWaybill.waybillCode]);
                        }}
                        className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-bold"
                      >
                        Track New Shipment Live
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
