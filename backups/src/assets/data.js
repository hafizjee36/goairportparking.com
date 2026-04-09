export const airportCode = [
  { level: "Aberdeen", value: "ABZ" },
  { level: "Belfast City", value: "BHD" },
  { level: "Birmingham", value: "BHX" },
  { level: "Bristol", value: "BRS" },
  { level: "Cardiff", value: "CWL" },
  { level: "Dubai", value: "DXB" },
  { level: "East Midlands", value: "EMA" },
  { level: "Edinburgh", value: "EDI" },
  { level: "Exeter", value: "EXT" },
  { level: "Gatwick", value: "LGW" },
  { level: "Glasgow", value: "GLA" },
  { level: "Heathrow", value: "LHR" },
  { level: "Humberside", value: "HUY" },
  { level: "Leeds Bradford", value: "LBA" },
  { level: "Liverpool", value: "LPL" },
  { level: "London City", value: "LCY" },
  { level: "Luton", value: "LTN" },
  { level: "Manchester", value: "MAN" },
  { level: "Newcastle", value: "NCL" },
  { level: "Southampton", value: "SOU" },
  { level: "Southampton Port", value: "SOP" },
  { level: "Southend", value: "SEN" },
  { level: "Stansted", value: "STN" },
];

export const parkingOptions = [
  // LHR - Heathrow (5 options)
  {
    id: 1,
    name: "Maple Parking - Meet and Greet",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Convenient Meet & Greet Service",
      "Photographic vehicle inspections on collection",
      "Fully Secure off-airport Parking with CCTV",
    ],
    price: 84.98,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Modern underground parking garage",
    rating: 4.8,
    reviews: 56,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "LHR",
  },
  {
    id: 2,
    name: "Purple Parking - Park and Ride",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Self park service with shuttle",
      "Regular shuttle transfers every 10 mins",
      "Secure parking with 24/7 monitoring",
    ],
    price: 72.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Multi-level parking structure",
    rating: 4.3,
    reviews: 91,
    distance: 10,
    distanceText: "10 min shuttle",
    airportCode: "LHR",
  },
  {
    id: 3,
    name: "Airport Parking Plus - Premium",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Premium covered parking spaces",
      "Express check-in and check-out",
      "Complimentary car wash service",
    ],
    price: 95.25,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium covered parking facility",
    rating: 4.6,
    reviews: 82,
    distance: 2,
    distanceText: "2 min walk",
    airportCode: "LHR",
  },
  {
    id: 5,
    name: "Elite Valet Services - Luxury",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Full valet meet and greet service",
      "Premium vehicle detailing included",
      "Priority customer service support",
    ],
    price: 125.0,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Luxury valet parking service",
    rating: 4.9,
    reviews: 48,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "LHR",
  },
  {
    id: 16,
    name: "Heathrow Express Parking",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Fast shuttle every 5 minutes",
      "Budget-friendly rates",
      "Online check-in available",
    ],
    price: 68.75,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Express parking facility",
    rating: 4.2,
    reviews: 127,
    distance: 8,
    distanceText: "8 min shuttle",
    airportCode: "LHR",
  },

  // LGW - Gatwick (3 options)
  {
    id: 30,
    name: "Gatwick Premium Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Premium covered parking spaces",
      "Express check-in and check-out",
      "Complimentary car wash service",
    ],
    price: 88.25,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium covered parking facility",
    rating: 4.5,
    reviews: 76,
    distance: 3,
    distanceText: "3 min walk",
    airportCode: "LGW",
  },
  {
    id: 31,
    name: "Gatwick Valet Elite",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Full valet meet and greet service",
      "Premium vehicle detailing included",
      "Priority customer service support",
    ],
    price: 118.0,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Luxury valet parking service",
    rating: 4.7,
    reviews: 54,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "LGW",
  },
  {
    id: 32,
    name: "Gatwick Express Parking",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Fast shuttle every 5 minutes",
      "Budget-friendly rates",
      "Online check-in available",
    ],
    price: 65.75,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Express parking facility",
    rating: 4.1,
    reviews: 98,
    distance: 7,
    distanceText: "7 min shuttle",
    airportCode: "LGW",
  },

  // STN - Stansted (2 options)
  {
    id: 4,
    name: "Quick Park Express - Economy",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Budget-friendly parking rates",
      "Quick shuttle service to terminal",
      "Online booking with instant confirmation",
    ],
    price: 58.75,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Economy parking structure",
    rating: 4.0,
    reviews: 64,
    distance: 5,
    distanceText: "5 min shuttle",
    airportCode: "STN",
  },
  {
    id: 17,
    name: "Stansted Premier Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Official airport parking",
      "Direct terminal access",
      "24/7 security patrol",
    ],
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Premier parking facility",
    rating: 4.5,
    reviews: 93,
    distance: 3,
    distanceText: "3 min walk",
    airportCode: "STN",
  },

  // MAN - Manchester (3 options)
  {
    id: 6,
    name: "Secure Park Solutions - Standard",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Standard secure parking facility",
      "Regular shuttle service included",
      "CCTV monitoring and security patrols",
    ],
    price: 65.5,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Standard secure parking facility",
    rating: 4.2,
    reviews: 73,
    distance: 3,
    distanceText: "3 min shuttle",
    airportCode: "MAN",
  },
  {
    id: 18,
    name: "Manchester Valet Premium",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Professional valet service",
      "Vehicle inspection reports",
      "Express departure service",
    ],
    price: 105.99,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Valet parking service",
    rating: 4.6,
    reviews: 88,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "MAN",
  },
  {
    id: 19,
    name: "Manchester Budget Park",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Most affordable rates",
      "Frequent shuttle service",
      "Simple booking process",
    ],
    price: 45.25,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Budget parking facility",
    rating: 3.8,
    reviews: 156,
    distance: 12,
    distanceText: "12 min shuttle",
    airportCode: "MAN",
  },

  // BHX - Birmingham (2 options)
  {
    id: 7,
    name: "Birmingham Premium Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Direct airport terminal access",
      "Covered parking spaces",
      "24/7 security surveillance",
    ],
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Airport terminal parking",
    rating: 4.5,
    reviews: 67,
    distance: 1,
    distanceText: "1 min walk",
    airportCode: "BHX",
  },
  {
    id: 20,
    name: "Birmingham Express Park & Ride",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Quick shuttle service",
      "Competitive pricing",
      "Easy online booking",
    ],
    price: 62.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Express parking facility",
    rating: 4.1,
    reviews: 94,
    distance: 6,
    distanceText: "6 min shuttle",
    airportCode: "BHX",
  },

  // EDI - Edinburgh (2 options)
  {
    id: 8,
    name: "Edinburgh Valet Plus",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Professional valet service",
      "Car care and maintenance check",
      "Express pickup and drop-off",
    ],
    price: 110.75,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Valet parking service",
    rating: 4.7,
    reviews: 39,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "EDI",
  },
  {
    id: 21,
    name: "Edinburgh Park & Fly",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Scottish hospitality service",
      "Regular shuttle transfers",
      "Secure parking facility",
    ],
    price: 78.99,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Park and fly facility",
    rating: 4.3,
    reviews: 76,
    distance: 8,
    distanceText: "8 min shuttle",
    airportCode: "EDI",
  },

  // LPL - Liverpool (2 options)
  {
    id: 9,
    name: "Liverpool Express Park",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Quick access shuttle service",
      "Affordable parking rates",
      "Mobile app for easy booking",
    ],
    price: 52.25,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Express parking facility",
    rating: 3.9,
    reviews: 85,
    distance: 8,
    distanceText: "8 min shuttle",
    airportCode: "LPL",
  },
  {
    id: 22,
    name: "Liverpool Premium Services",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Meet and greet valet service",
      "Professional car care",
      "Priority customer support",
    ],
    price: 98.75,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium valet service",
    rating: 4.4,
    reviews: 62,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "LPL",
  },

  // LTN - Luton (3 options)
  {
    id: 10,
    name: "Luton Smart Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Smart parking technology",
      "Real-time space availability",
      "Automated payment system",
    ],
    price: 78.5,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Smart parking facility",
    rating: 4.4,
    reviews: 92,
    distance: 3,
    distanceText: "3 min walk",
    airportCode: "LTN",
  },
  {
    id: 23,
    name: "Luton Meet & Greet Elite",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Elite valet service",
      "Vehicle inspection included",
      "Fast-track service",
    ],
    price: 115.0,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Elite valet service",
    rating: 4.7,
    reviews: 54,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "LTN",
  },
  {
    id: 24,
    name: "Luton Economy Park",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Budget-friendly rates",
      "Shuttle every 15 minutes",
      "Basic security features",
    ],
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Economy parking facility",
    rating: 3.9,
    reviews: 118,
    distance: 10,
    distanceText: "10 min shuttle",
    airportCode: "LTN",
  },

  // BRS - Bristol (2 options)
  {
    id: 11,
    name: "Bristol Premium Services",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "White glove service",
      "Vehicle inspection reports",
      "Complimentary car wash",
    ],
    price: 98.75,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium service facility",
    rating: 4.6,
    reviews: 54,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "BRS",
  },
  {
    id: 25,
    name: "Bristol Park & Ride",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Regular shuttle service",
      "Covered parking available",
      "Competitive rates",
    ],
    price: 68.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Park and ride facility",
    rating: 4.2,
    reviews: 87,
    distance: 7,
    distanceText: "7 min shuttle",
    airportCode: "BRS",
  },

  // NCL - Newcastle (2 options)
  {
    id: 12,
    name: "Newcastle Express Parking",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Fast shuttle service",
      "Frequent departures",
      "Weather protection covers",
    ],
    price: 67.99,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Express parking facility",
    rating: 4.1,
    reviews: 76,
    distance: 7,
    distanceText: "7 min shuttle",
    airportCode: "NCL",
  },
  {
    id: 26,
    name: "Newcastle Premium Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "On-airport convenience",
      "Direct terminal access",
      "Northumbrian hospitality",
    ],
    price: 85.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium airport parking",
    rating: 4.4,
    reviews: 69,
    distance: 2,
    distanceText: "2 min walk",
    airportCode: "NCL",
  },

  // GLA - Glasgow (2 options)
  {
    id: 13,
    name: "Glasgow Premium Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Premium location access",
      "Direct terminal connection",
      "Scottish hospitality service",
    ],
    price: 85.25,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Premium parking facility",
    rating: 4.3,
    reviews: 61,
    distance: 4,
    distanceText: "4 min walk",
    airportCode: "GLA",
  },
  {
    id: 27,
    name: "Glasgow Valet Services",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Traditional Scottish service",
      "Professional valet care",
      "Vehicle security guarantee",
    ],
    price: 108.5,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Glasgow valet service",
    rating: 4.5,
    reviews: 45,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "GLA",
  },

  // LCY - London City (2 options)
  {
    id: 14,
    name: "London City Connect Parking",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "City center connectivity",
      "Multi-modal transport hub",
      "Eco-friendly parking solutions",
    ],
    price: 62.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "City connect parking",
    rating: 4.2,
    reviews: 108,
    distance: 6,
    distanceText: "6 min shuttle",
    airportCode: "LCY",
  },
  {
    id: 28,
    name: "London City Executive Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Executive parking spaces",
      "Business traveler focused",
      "Quick access to terminals",
    ],
    price: 95.75,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Executive parking facility",
    rating: 4.6,
    reviews: 74,
    distance: 2,
    distanceText: "2 min walk",
    airportCode: "LCY",
  },

  // CWL - Cardiff (2 options)
  {
    id: 15,
    name: "Cardiff Tech Park Valet",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Tech-enabled valet service",
      "GPS tracking for vehicles",
      "Digital service reports",
    ],
    price: 115.99,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Tech valet service",
    rating: 4.8,
    reviews: 43,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "CWL",
  },
  {
    id: 29,
    name: "Cardiff Express Park",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Welsh hospitality service",
      "Regular shuttle transfers",
      "Affordable Welsh rates",
    ],
    price: 58.75,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Cardiff express parking",
    rating: 4.1,
    reviews: 89,
    distance: 9,
    distanceText: "9 min shuttle",
    airportCode: "CWL",
  },

  // DXB - Dubai (4 options)
  {
    id: 1001,
    name: "Dubai Premium Meet & Greet",
    category: "Meet & Greet",
    type: "meet-greet",
    features: [
      "Professional valet service",
      "Vehicle inspection reports",
      "Express departure service",
    ],
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    alt: "Dubai premium valet service",
    rating: 4.8,
    reviews: 62,
    distance: 0,
    distanceText: "Meet & Greet Service",
    airportCode: "DXB",
  },
  {
    id: 1002,
    name: "Dubai Park & Fly",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Budget-friendly rates",
      "Shuttle every 15 minutes",
      "Secure parking facility",
    ],
    price: 85.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Dubai park and fly facility",
    rating: 4.3,
    reviews: 89,
    distance: 10,
    distanceText: "10 min shuttle",
    airportCode: "DXB",
  },
  {
    id: 1003,
    name: "Dubai Terminal Parking",
    category: "On-airport",
    type: "on-airport",
    features: [
      "Direct terminal access",
      "Covered parking spaces",
      "24/7 security surveillance",
    ],
    price: 175.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    alt: "Dubai terminal parking",
    rating: 4.6,
    reviews: 54,
    distance: 2,
    distanceText: "2 min walk",
    airportCode: "DXB",
  },
  {
    id: 1004,
    name: "Dubai Economy Parking",
    category: "Park & Ride/Walk",
    type: "park-ride",
    features: [
      "Most affordable rates",
      "Frequent shuttle service",
      "Simple booking process",
    ],
    price: 65.25,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
    alt: "Dubai economy parking",
    rating: 4.0,
    reviews: 124,
    distance: 15,
    distanceText: "15 min shuttle",
    airportCode: "DXB",
  },
];

export const extras = [
  {
    id: "mng-1",
    title: "Maple Parking - Meet and Greet",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop",
    entry: "09 August, 2025 - 04:00pm",
    price: 84.98,
    bullets: [
      "Convenient Meet & Greet Service",
      "Photographic vehicle inspections on collection",
      "Fully secure off-airport parking with CCTV",
    ],
  },
  {
    id: "mng-2",
    title: "Maple Parking - Meet and Greet",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop",
    entry: "09 August, 2025 - 04:00pm",
    price: 84.98,
    bullets: [
      "Convenient Meet & Greet Service",
      "Photographic vehicle inspections on collection",
      "Fully secure off-airport parking with CCTV",
    ],
  },
  {
    id: "mng-3",
    title: "Maple Parking - Meet and Greet",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    entry: "09 August, 2025 - 04:00pm",
    price: 84.98,
    bullets: [
      "Convenient Meet & Greet Service",
      "Photographic vehicle inspections on collection",
      "Fully secure off-airport parking with CCTV",
    ],
  },
];

export const baseProduct = {
  airportLabel: "Birmingham (BHX)",
  name: "Airparks Short Run - Park and Ride",
  price: 45.99,
  bookingFee: 2.99,
  entry: "09 August, 2025 - 04:00pm",
  exit: "09 August, 2025 - 04:00pm",
};

export const currencies = [
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", name: "Albanian Lek", symbol: "L" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "BMD", name: "Bermudian Dollar", symbol: "$" },
  { code: "BND", name: "Brunei Dollar", symbol: "$" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "BWP", name: "Botswana Pula", symbol: "P" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "BZD", name: "Belize Dollar", symbol: "$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
  { code: "CUP", name: "Cuban Peso", symbol: "$" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
  { code: "FOK", name: "Faroese Króna", symbol: "kr" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "GGP", name: "Guernsey Pound", symbol: "£" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "GYD", name: "Guyanese Dollar", symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "HRK", name: "Croatian Kuna", symbol: "€" }, // switched to EUR in 2023
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "IMP", name: "Isle of Man Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "JEP", name: "Jersey Pound", symbol: "£" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "$" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "KES", name: "Kenyan Shilling", symbol: "Sh" },
  { code: "KGS", name: "Kyrgyzstani Som", symbol: "с" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "KID", name: "Kiribati Dollar", symbol: "$" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "LAK", name: "Lao Kip", symbol: "₭" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L" },
  { code: "LYD", name: "Libyan Dinar", symbol: "ل.د" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "MMK", name: "Burmese Kyat", symbol: "Ks" },
  { code: "MNT", name: "Mongolian Tögrög", symbol: "₮" },
  { code: "MOP", name: "Macanese Pataca", symbol: "P" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "NAD", name: "Namibian Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan Guaraní", symbol: "₲" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س." },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£" },
  { code: "STN", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { code: "SYP", name: "Syrian Pound", symbol: "£" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "ЅМ" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "m" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "$" },
  { code: "TVD", name: "Tuvaluan Dollar", symbol: "$" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "Sh" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "Sh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "so'm" },
  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs." },
  { code: "VND", name: "Vietnamese Đồng", symbol: "₫" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "Vt" },
  { code: "WST", name: "Samoan Tala", symbol: "T" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "$" },
];

export const blogPosts = [
  {
    id: "1",
    title: "5 Ways to Save on Airport Parking This Summer",
    date: "October 17, 2024",
    author: "Habib",
    featured_image:
      "https://images.unsplash.com/photo-1541945595989-a21441a816ae?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/blog/1",
    isTrending: true,
    blogHtml: `
<article>
  <h1>5 Ways to Save on Airport Parking This Summer</h1>
  <p>Summer travel season is here — and while you may have budgeted for flights, hotels, and activities, one sneaky expense often gets overlooked: <strong>airport parking</strong>. If you’re not careful, the cost of leaving your car at the airport can take a big bite out of your vacation budget. But don’t worry — with a little planning, you can slash those parking costs and keep more cash for souvenirs and sunsets.</p>
  <p>Here are <strong>five smart ways</strong> to save on airport parking this summer:</p>
  <hr />
  <ul>
    <li>
      <h3>1. Book Your Parking in Advance</h3>
      <p>Just like airfare, airport parking rates can rise as your travel date gets closer. Many airports and private parking lots offer <strong>discounts for early reservations</strong>, sometimes up to 50% less than the drive-up rate. Booking online also guarantees you a spot — no last-minute scrambling.</p>
    </li>
    <li>
      <h3>2. Consider Off-Site Parking Lots</h3>
      <p>Off-site parking facilities, often just a short shuttle ride away, typically cost far less than on-airport lots. Many offer <strong>24/7 shuttles, luggage assistance, and covered parking</strong>. Sites like ParkWhiz, SpotHero, or airport-specific parking services can help you compare rates and amenities.</p>
    </li>
    <li>
      <h3>3. Use Airport Parking Coupons or Discount Codes</h3>
      <p>Before booking, search for <strong>promo codes, loyalty programs, or travel rewards</strong> that apply to airport parking. Even small discounts add up, especially for week-long trips. Some credit cards also provide <strong>airport parking perks</strong> or reimbursements.</p>
    </li>
    <li>
      <h3>4. Share a Ride or Carpool</h3>
      <p>If you’re traveling with friends or family, consider <strong>sharing a ride to the airport</strong> so only one vehicle needs parking. You can also use ride-share services or public transportation for part of the journey, cutting down on parking days (or eliminating the need altogether).</p>
    </li>
    <li>
      <h3>5. Try “Park, Sleep, Fly” Hotel Packages</h3>
      <p>If you have an early morning flight, some airport hotels offer packages that include <strong>one night’s stay plus parking for up to two weeks</strong>. Often, this deal costs about the same as parking alone — plus you get a comfortable night’s rest before your trip.</p>
    </li>
  </ul>
  <hr />
  <h3>Bottom Line</h3>
  <p>Airport parking doesn’t have to be a budget-buster. By planning ahead, exploring off-site options, using discounts, sharing rides, or booking hotel packages, you can save significantly — leaving more money for the experiences that matter most.</p>
  <p>This summer, let your vacation start with <strong>smart parking choices</strong> and stress-free travel.</p>
</article>
    `.trim(),
  },
  {
    id: "2",
    title: "Best Red-Eye Flight Survival Tips",
    date: "October 18, 2024",
    author: "Habib",
    featured_image:
      "https://images.unsplash.com/photo-1736317210138-0ac2c4941c78?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/blog/2",
    isTrending: true,
    blogHtml: `
<article>
  <h1>Best Red-Eye Flight Survival Tips</h1>
  <p>Red-eye flights can save time and money — if you arrive rested. Use these practical tips to build a sleep-friendly routine, from seat selection to smart hydration.</p>
  <hr />
  <ul>
    <li>
      <h3>1) Pick the Right Seat</h3>
      <p>Choose a window seat to lean against the wall and control the shade. Avoid last rows (limited recline) and seats near galleys or lavatories for less noise and traffic.</p>
    </li>
    <li>
      <h3>2) Create a Pre-Flight Wind-Down</h3>
      <p>Start your “nighttime” 1–2 hours before boarding: dim your screens, switch to a calm playlist, and skip heavy meals. A light stretch helps relax tight muscles before you sit.</p>
    </li>
    <li>
      <h3>3) Pack a Sleep Kit</h3>
      <p>Neck pillow, eye mask, and foam earplugs or ANC headphones are the trifecta. Bring a light layer (hoodie or scarf) to manage cabin temperature swings.</p>
    </li>
    <li>
      <h3>4) Time Caffeine &amp; Alcohol Carefully</h3>
      <p>Avoid caffeine 6–8 hours before departure and go easy on alcohol; both fragment sleep. Opt for water or herbal tea after boarding.</p>
    </li>
    <li>
      <h3>5) Eat Light, Hydrate Smart</h3>
      <p>Cabin air is dry. Sip water regularly and choose light, protein-forward snacks to prevent blood sugar spikes that can disrupt sleep.</p>
    </li>
    <li>
      <h3>6) Set Your Watch to Destination Time</h3>
      <p>Shift your schedule by 1–2 hours the day before and align meals/sleep to the new time zone as soon as you board.</p>
    </li>
    <li>
      <h3>7) Post-Landing Reset</h3>
      <p>Get morning light exposure, move your body, and prioritize a normal bedtime at your destination. Keep any nap to 20–30 minutes max.</p>
    </li>
  </ul>
  <hr />
  <h3>The Takeaway</h3>
  <p>Plan your environment, protect your sleep, and hydrate. A few small habits turn red-eyes from dreaded to doable.</p>
</article>
    `.trim(),
  },
  {
    id: "3",
    title: "Carry-On Packing: The Ultimate Checklist",
    date: "October 19, 2024",
    author: "Habib",
    featured_image:
      "https://plus.unsplash.com/premium_photo-1754951198392-05a7608ed140?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/blog/3",
    isTrending: true,
    blogHtml: `
<article>
  <h1>Carry-On Packing: The Ultimate Checklist</h1>
  <p>Skip the baggage carousel and keep your essentials with you. This checklist balances <strong>space, rules, and comfort</strong> so you can breeze through security and board stress-free.</p>
  <hr />
  <h3>Essentials</h3>
  <ul>
    <li><p><strong>Travel docs</strong>: passport/ID, boarding pass, visas, itinerary, insurance.</p></li>
    <li><p><strong>Wallet basics</strong>: cards, a little local cash, and a pen for forms.</p></li>
    <li><p><strong>Phone + charger</strong> (and a small power bank).</p></li>
  </ul>
  <h3>Tech &amp; Comfort</h3>
  <ul>
    <li><p>Noise-canceling headphones or earplugs; eye mask; compact neck pillow.</p></li>
    <li><p>Light sweater/hoodie; compression socks for long flights.</p></li>
  </ul>
  <h3>Toiletries (TSA/EU 100ml rule)</h3>
  <ul>
    <li><p>1 clear quart-size bag. Fill with mini toothpaste, brush, lip balm, moisturizer, hand sanitizer, deodorant.</p></li>
    <li><p>Medications + basic first-aid (bandages, pain reliever). Keep prescriptions in original packaging.</p></li>
  </ul>
  <h3>Clothing Strategy</h3>
  <ul>
    <li><p>1–2 tops, 1 bottom, underwear/socks, and a spare shirt. Choose <strong>neutral layers</strong> that mix-and-match.</p></li>
    <li><p>Wear your bulkiest shoes; pack lighter pair in the bag.</p></li>
  </ul>
  <h3>Packing Tactics</h3>
  <ul>
    <li><p>Use <strong>packing cubes</strong> to compress and organize.</p></li>
    <li><p>Roll soft items; fold structured pieces.</p></li>
    <li><p>Heaviest items near the wheels (if spinner) to keep balance.</p></li>
  </ul>
  <hr />
  <h3>Final Tip</h3>
  <p>Check your airline’s carry-on size and personal-item policy before you go — rules vary more than you’d think.</p>
</article>
    `.trim(),
  },
  {
    id: "4",
    title:
      "How Early Should You Get to the Airport? (Domestic vs International)",
    date: "October 19, 2024",
    author: "Habib",
    featured_image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/blog/4",
    isTrending: false,
    blogHtml: `
<article>
  <h1>How Early Should You Get to the Airport? (Domestic vs International)</h1>
  <p>Cutting it close at the airport can turn any trip into chaos. Here’s a simple, stress-free guide to when you should arrive — and what factors change the timing.</p>
  <hr />
  <h3>Recommended Arrival Times</h3>
  <ul>
    <li><p><strong>Domestic flights:</strong> Arrive <strong>2 hours</strong> before departure.</p></li>
    <li><p><strong>International flights:</strong> Arrive <strong>3 hours</strong> before departure.</p></li>
  </ul>
  <p>These are solid baselines. Now, adjust using the factors below.</p>

  <h3>Factors That Add Extra Time</h3>
  <ul>
    <li><p><strong>Checked bags:</strong> Add 15–30 minutes (bag drop lines can spike at peak times).</p></li>
    <li><p><strong>Peak hours/holidays:</strong> Add 30–45 minutes for long security queues.</p></li>
    <li><p><strong>Big/complex airports:</strong> Add 15–30 minutes for transit between parking, terminals, and gates.</p></li>
    <li><p><strong>Traveling with kids/elderly:</strong> Add 15–20 minutes for comfort and mobility.</p></li>
    <li><p><strong>No mobile boarding pass:</strong> Add 10 minutes for kiosk/desk time.</p></li>
  </ul>

  <h3>Ways to Save Time</h3>
  <ul>
    <li><p><strong>Check in online</strong> and download your boarding pass.</p></li>
    <li><p><strong>Use Fast Track/priority security</strong> if offered or included via your ticket/credit card.</p></li>
    <li><p><strong>Pack carry-on smart</strong> (liquids/gadgets accessible) to breeze through screening.</p></li>
    <li><p><strong>Pre-book parking</strong> close to your terminal, or consider Meet &amp; Greet for early flights.</p></li>
  </ul>

  <h3>Simple Rule of Thumb</h3>
  <p>Start with <strong>2 hours domestic / 3 hours international</strong>, then add buffer for <em>bags, peak times, airport size</em>, and <em>travel party needs</em>. If you’d rather sip coffee than sprint, an extra 20 minutes is priceless.</p>
</article>
  `.trim(),
  },
];
