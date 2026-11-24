import {
  Truck,
  Plane,
  Ship,
  Zap,
  Warehouse,
  Factory,
  Box,
  ShieldCheck
} from 'lucide-react';

export const HUB_LOCATIONS = [
  {
    id: 'lagos',
    city: 'Lagos (Head Office)',
    type: 'Corporate HQ & Primary Sorting Hub',
    address: '28 Funsho Williams Avenue (Formerly Western Avenue), Ojuelegba, Surulere, Lagos State',
    phone: '+234 803 488 2668',
    email: 'lagoshub@swissdarl.com',
    hours: '24 Hours / 7 Days Dispatch Operations',
    capacity: '50,000 Cargo Units/Day',
    manager: 'Oluwaseun Bakare',
    coordinates: { x: 25, y: 75 },
    badge: 'Head Office & Gateway'
  },
  {
    id: 'benin',
    city: 'Benin City',
    type: 'Mid-West Regional Transit Terminal',
    address: 'OKAI HOUSE No 37 Forestry Road, by Ehondor Junction, Benin City, Edo State',
    phone: '+234 916 997 5996',
    email: 'beninhub@swissdarl.com',
    hours: 'Mon - Sat: 7:30 AM - 8:00 PM',
    capacity: '15,000 Units/Day',
    manager: 'Osagie Ehiemua',
    coordinates: { x: 38, y: 70 },
    badge: 'Interstate Cross-Dock'
  },
  {
    id: 'ph',
    city: 'Port Harcourt',
    type: 'South-South Marine & Oil Cargo Terminal',
    address: '73, Stadium Road Ken Saro Wiwa, Beside Trust Fund Pensions, Rumuomasi, Port Harcourt, Rivers State',
    phone: '+234 906 000 3029',
    email: 'phhub@swissdarl.com',
    hours: '24 Hours Marine Clearance',
    capacity: '35,000 Tons Energy Freight',
    manager: 'Tariye Briggs',
    coordinates: { x: 58, y: 82 },
    badge: 'Heavy Energy Hub'
  },
  {
    id: 'abuja',
    city: 'Abuja (FCT)',
    type: 'Northern Operational Hub & Air Gateway',
    address: '45B Ajose Adeogun Street, Opposite DSS Quarter Utako District, FCT, Abuja',
    phone: '+234 916 997 6717',
    email: 'abujahub@swissdarl.com',
    hours: 'Mon - Sat: 7:00 AM - 9:00 PM',
    capacity: '22,000 Cargo Units/Day',
    manager: 'Aminu Bello',
    coordinates: { x: 52, y: 42 },
    badge: 'Diplomatic Air Express'
  },
  {
    id: 'enugu',
    city: 'Enugu',
    type: 'South-East Commercial & Agro Terminal',
    address: '39, Chime Avenue, Opposite First Bank, New Haven, Enugu State',
    phone: '+234 906 000 3028',
    email: 'enuguhub@swissdarl.com',
    hours: 'Mon - Sat: 8:00 AM - 7:30 PM',
    capacity: '18,000 Units/Day',
    manager: 'Nnamdi Okeke',
    coordinates: { x: 65, y: 71 },
    badge: 'Regional Distribution'
  },
  {
    id: 'kano',
    city: 'Kano',
    type: 'Trans-Saharan & Far-North Commercial Hub',
    address: '1 Pompai Road, Off Audu Bako Way, Opposite A.A RANO Filling Station, Kano, Kano State',
    phone: '+234 803 493 3868',
    email: 'kanohub@swissdarl.com',
    hours: 'Mon - Sat: 7:30 AM - 8:30 PM',
    capacity: '28,000 Cargo Units/Day',
    manager: 'Ibrahim Danlami',
    coordinates: { x: 55, y: 18 },
    badge: 'Cross-Border Gateway'
  }
];

export const INITIAL_TRACKING_DATABASE = {
  'SWD-884920-NG': {
    id: 'SWD-884920-NG',
    type: 'Interstate Express Road Cargo',
    sender: 'GlobaTech Nigeria Ltd (Lagos Hub)',
    receiver: 'Chief Emeka Okafor (Port Harcourt)',
    origin: 'Lagos Head Office Hub',
    destination: 'Port Harcourt Stadium Rd Hub',
    weight: '14.50 Kg',
    pieces: 2,
    serviceLevel: 'Guaranteed 24-Hour Interstate Express',
    estDelivery: 'Tomorrow, 2:30 PM',
    currentStatus: 'In Transit - Approaching Destination Hub',
    statusCode: 'IN_TRANSIT',
    progress: 75,
    events: [
      { time: 'Nov 21, 09:15 AM', location: 'Surulere Lagos HQ Hub', status: 'Waybill Generated & Cargo Received', completed: true },
      { time: 'Nov 21, 01:30 PM', location: 'Lagos Main Sorting Hub', status: 'Passed HSEQ Security X-Ray & Barcode Scanned', completed: true },
      { time: 'Nov 21, 05:45 PM', location: 'Interstate Trucking Line #FL-402', status: 'Departed Lagos Gateway (En route South-South)', completed: true },
      { time: 'Nov 22, 06:10 AM', location: 'Benin Transit Cross-Dock', status: 'Mid-Way Scanned & Truck Crew Swap', completed: true },
      { time: 'Nov 22, 10:45 AM', location: 'En route Port Harcourt', status: 'Driver Telemetry Active - On Schedule', completed: true },
      { time: 'Nov 22, 02:30 PM (Est)', location: 'Rumuomasi PH Hub', status: 'Out for Final Doorstep Delivery', completed: false }
    ]
  },
  'SWD-301944-INT': {
    id: 'SWD-301944-INT',
    type: 'International Air Freight',
    sender: 'Biomedical Instruments UK (London)',
    receiver: 'Federal Medical Centre (Abuja FCT)',
    origin: 'London Heathrow Airport (LHR)',
    destination: 'Nnamdi Azikiwe Int. Airport (ABV)',
    weight: '185.00 Kg (3 Cold-Chain Crates)',
    pieces: 3,
    serviceLevel: 'Temperature-Controlled Priority Air Cargo',
    estDelivery: 'Nov 24, 2026',
    currentStatus: 'Undergoing Nigerian Customs Clearance',
    statusCode: 'CUSTOMS',
    progress: 55,
    events: [
      { time: 'Nov 19, 11:00 AM', location: 'SWISSDARL UK Air Terminal', status: 'Waybill Issued & Temperature Loggers Primed', completed: true },
      { time: 'Nov 20, 04:20 AM', location: 'Heathrow Cargo Apron', status: 'Boarded Cargo Flight SWD-AF701', completed: true },
      { time: 'Nov 20, 06:15 PM', location: 'Murtala Muhammed Int Airport (LOS)', status: 'Landed Lagos Cargo Wing & Transfer to Domestic Air Shuttle', completed: true },
      { time: 'Nov 21, 08:30 AM', location: 'Abuja Air Cargo Terminal', status: 'Undergoing NDLEA & Customs Physical Verification', completed: false },
      { time: 'Nov 22, 09:00 AM (Est)', location: 'Abuja Utako Central Hub', status: 'Final Dispatch to FMC Abuja', completed: false }
    ]
  },
  'SWD-512091-LG': {
    id: 'SWD-512091-LG',
    type: 'Same-Day Metro Dispatch',
    sender: 'Supreme Fashion Boutique (Ikeja)',
    receiver: 'Victoria Bay Capital (VI, Lagos)',
    origin: 'Ikeja Commercial Hub',
    destination: 'Victoria Island, Lagos',
    weight: '3.20 Kg',
    pieces: 1,
    serviceLevel: 'Hyperlocal Same-Day Bike Express',
    estDelivery: 'Delivered Today at 1:15 PM',
    currentStatus: 'Delivered & Signed',
    statusCode: 'DELIVERED',
    progress: 100,
    events: [
      { time: 'Today, 09:30 AM', location: 'Ikeja Outlet', status: 'Rider Picked Up Package', completed: true },
      { time: 'Today, 11:15 AM', location: 'Third Mainland Bridge Transit', status: 'In Transit via Express Dispatch Rider #DR-88', completed: true },
      { time: 'Today, 01:15 PM', location: 'Victoria Island Office', status: 'Delivered. Signed by Funke A. (Proof of Delivery Uploaded)', completed: true }
    ]
  }
};

export const ALL_SERVICES = [
  {
    id: 'air-freight',
    category: 'international',
    categoryLabel: 'International Freight',
    title: 'Air Freight Charter & Express',
    icon: Plane,
    sla: '24 - 48 Hours SLA',
    tagline: 'Rapid global & domestic air charters with temperature control.',
    description: 'Swissdarl Air Cargo provides express priority freight across all commercial Nigerian airports and direct international cargo charters from London, Guangzhou, Dubai, and Houston.',
    features: ['Customs Clearance Included', 'Cold Chain Temperature Logs', 'Door-to-Airport & Door-to-Door', 'Flight Telemetry Tracking']
  },
  {
    id: 'land-freight',
    category: 'domestic',
    categoryLabel: 'Domestic & Express',
    title: 'Interstate Haulage & Cross-Border',
    icon: Truck,
    sla: '12 - 72 Hours SLA',
    tagline: 'Heavy trucks, reefer units, and less-than-truckload (LTL).',
    description: 'Connecting all 36 Nigerian states and ECOWAS trade corridors. Our modern heavy fleet of over 150 GPS-monitored trucks operates 24/7 with armed escort options.',
    features: ['10T, 15T, 30T & 45T Trucks', 'Hydraulic Liftgate Fleet', 'ECOWAS Transit Manifests', 'Comprehensive Transit Insurance']
  },
  {
    id: 'sea-freight',
    category: 'international',
    categoryLabel: 'International Freight',
    title: 'Ocean & Maritime Shipping',
    icon: Ship,
    sla: 'Global Sea Freight',
    tagline: 'FCL & LCL container clearance into Lagos, Onne, & Lekki ports.',
    description: 'End-to-end maritime logistics covering customs brokerage, port clearance, barge evacuation, and bonded warehouse transfers to minimize demurrage.',
    features: ['Full Container Load (FCL)', 'Less Container Load (LCL)', 'Barge Evacuation Options', 'Bonded Terminal Storage']
  },
  {
    id: 'express-ecommerce',
    category: 'domestic',
    categoryLabel: 'Domestic & Express',
    title: 'Express Courier & SME Logistics',
    icon: Zap,
    sla: 'Same-Day / Next-Day',
    tagline: 'Fulfillment, cash-on-delivery, and express dispatch for SMEs.',
    description: 'Powering Nigerian e-commerce merchants with API order syncing, nationwide Cash-on-Delivery (COD) collections, and dedicated hub pickups.',
    features: ['Nationwide Cash-on-Delivery', 'Automated Webstore API Sync', 'Free Branded Packaging', 'Instant SMS Customer Alert']
  },
  {
    id: 'warehousing',
    category: 'supplychain',
    categoryLabel: 'Supply Chain & Specialty',
    title: 'Warehousing & Bonded Storage',
    icon: Warehouse,
    sla: '24/7 Monitored',
    tagline: 'Secure distribution centers in Lagos, Abuja, Port Harcourt & Kano.',
    description: 'Over 200,000 sq ft of modern, climate-controlled warehousing with WMS inventory tracking, pick-and-pack fulfillment, and pallet storage.',
    features: ['WMS Stock Dashboard', '24/7 CCTV & Fire Security', 'Pallet & Rack Storage Ratios', 'Cross-Docking Operations']
  },
  {
    id: 'project-cargo',
    category: 'supplychain',
    categoryLabel: 'Supply Chain & Specialty',
    title: 'Project Cargo & Heavy Lift',
    icon: Factory,
    sla: 'Custom Engineering SLA',
    tagline: 'Specialized out-of-gauge transport for oil rigs & infrastructure.',
    description: 'Engineering-led transport for oversized turbines, transformers, heavy construction machinery, and energy infrastructure nationwide.',
    features: ['Route Surveys & Bridge Permits', 'Heavy Crane & Rigging Crews', 'Hazmat & HSEQ Certified Teams', 'Turnkey EPC Project Execution']
  },
  {
    id: 'packaging-solutions',
    category: 'supplychain',
    categoryLabel: 'Supply Chain & Specialty',
    title: 'Custom Packaging & Crating',
    icon: Box,
    sla: 'On-Demand Crating',
    tagline: 'Industrial wooden crating, bubble wrapping & hazmat boxes.',
    description: 'Custom-built ISPM-15 heat-treated wooden crates, shock-proof foam insulation, and dangerous goods certified packaging materials.',
    features: ['ISPM-15 Export Certified Crates', 'Vacuum Packaging for Electronics', 'Reefer Insulated Boxes', 'Tamper-Evident Security Seals']
  },
  {
    id: 'marine-insurance',
    category: 'supplychain',
    categoryLabel: 'Supply Chain & Specialty',
    title: 'Comprehensive Transit Insurance',
    icon: ShieldCheck,
    sla: 'Instant Risk Cover',
    tagline: 'Full-value cargo insurance against theft, damage & transit perils.',
    description: 'Underwritten by top Nigerian insurers, guaranteeing 100% declared value coverage for high-value machinery, electronics, and commercial cargo.',
    features: ['All-Risks Transit Coverage', 'Fast Track Claim Settlement', 'Domestic & Global Coverage', 'Zero Deductible Options']
  }
];
