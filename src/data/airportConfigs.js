import { airportCode } from '../assets/data.js';

/**
 * Airport configurations for dynamic pages.
 * Keys are URL slugs (lowercase with hyphens).
 * Extend with airport-specific SEO, images, etc.
 */
import { getSectionData } from './airportSectionData.js';

export const airportConfigs = {
  birmingham: {
    slug: 'birmingham',
    name: 'Birmingham',
    code: 'BHX',
    seoTitle: 'Birmingham Airport Parking | Compare Cheap & Secure Deals',
    seoDescription: 'Compare cheap parking near Birmingham Airport. Find secure Meet & Greet, Park & Ride and on-site options with the best prices and instant booking.',
    seoKeywords: ['birmingham airport parking', 'birmingham airport meet and greet', 'meet & greet birmingham airport', 'birmingham airport long stay parking', 'birmingham airport park and ride', 'birmingham airport parking deals', 'birmingham airport parking prices'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/birmingham-airport-parking',
    parkingOptionsTitle: 'Parking Options at Birmingham Airport',
    parkingOptionsDescription: 'We compare a wide range of parking options across the UK to suit every travel need, budget, and journey type, helping you easily find the best value and convenience in one place.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "The most convenient option for a hassle-free experience. Drive straight to the terminal where a professional driver will collect your vehicle and park it securely for you. Perfect for families, business travellers, or anyone who wants to save time and avoid walking or transfers. "
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: ""
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "Ideal for longer trips and extended holidays, Long Stay parking offers a secure and affordable option for travellers. These car parks are usually located slightly further from the terminal but are well connected with regular shuttle bus services, ensuring smooth and easy transfers."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A popular budget-friendly choice for travellers looking to save money. Simply park your vehicle at a secure off-site location and use a complimentary shuttle service that takes you directly to the terminal. It’s a convenient and cost-effective option for all types of journeys."
    },
    bookThroughSection: {
      title: "Why Book Through Go Airport Parking?",
      items: [
        {
          title: `Compare multiple trusted providers in one place`,
          description:
            `Get access to a wide range of parking options across major UK airports in one search. `,
        },
        {
          title: `Find cheaper deals than booking directly`,
          description:
            `Save money by comparing the best parking prices from different providers instantly.`,
        },
        {
          title: `Secure and vetted parking partners only`,
          description:
            `All listed providers are carefully checked to ensure safe and reliable parking near airports. `,
        },
        {
          title: `Fast, simple online booking process`,
          description:
            `Book your preferred parking option in just a few clicks with a smooth online system.`,
        },
        {
          title: `Options for all budgets and travel types`,
          description:
            `From budget parking to premium Meet & Greet services, we cover every travel need. `,
        },
        {
          title: `Coverage for major UK airports including Birmingham`,
          description:
            `Find parking deals near Birmingham, Heathrow, Manchester, Luton, and other major UK airports. `,
        },
      ],
    },
  },
  bristol: {
    slug: 'bristol',
    name: 'Bristol',
    code: 'BRS',
    seoTitle: 'Bristol Airport Parking Deals | Compare & Book Secure Options',
    seoDescription: 'Compare reliable parking options near Bristol Airport. Find affordable Meet & Greet, Park & Ride, and on-site choices with easy online booking.',
    seoKeywords: ['bristol airport parking', 'bristol airport meet and greet', 'bristol airport long stay', 'bristol airport park and ride', 'bristol airport parking deals', 'bristol airport parking prices', 'bristol car parks'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/bristol-airport-parking',
    parkingOptionsTitle: 'Parking Options at Bristol Airport',
    parkingOptionsDescription: 'Bristol Airport offers a variety of parking choices designed to suit different travel needs, budgets, and trip durations. Whether you’re looking for convenience, affordability, or quick access to the terminal, you can compare all options in one place.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "The most convenient option for a stress-free experience. Drive directly to the terminal where a professional driver collects your car and parks it securely for you. Ideal for families, business travellers, and anyone looking for fast and easy airport parking at Bristol Airport."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Located close to the terminal, this option offers quick walking access to check-in and departures. Best suited for short trips, business visits, or pick-ups and drop-offs where maximum convenience near Bristol Airport is a priority."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "Ideal for longer trips and holidays, Long Stay parking offers secure spaces with regular shuttle transfers to the terminal. It’s a reliable option for travellers looking for affordable long-term parking near Bristol Airport with good accessibility."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A popular budget-friendly choice for travellers who want to save money. Park your vehicle at a secure off-site location and use a frequent shuttle service to reach the terminal quickly. Perfect for those searching for cheap parking near Bristol Airport without compromising on safety."
    },
    bookThroughSection: {
      title: "Why Book With Us",
      items: [
        {
          title: `Compare & Save Instantly`,
          description:
            `Quickly browse and compare the best parking deals near Bristol Airport to find the right option for your budget and travel needs.`,
        },
        {
          title: `Secure & Trusted Options`,
          description:
            `We only work with carefully selected providers that offer secure facilities and reliable service for complete peace of mind.`,
        },
        {
          title: `Clear & Honest Pricing`,
          description:
            `What you see is what you pay — with full transparency on costs, shuttle transfers, and booking conditions.`,
        },
        {
          title: `Real Customer Feedback`,
          description:
            `Make informed choices by reading genuine reviews from travellers who have already used the service.`,
        },
        {
          title: `Real Customer Feedback`,
          description:
            `Make informed choices by reading genuine reviews from travellers who have already used the service.`,
        },
        {
          title: `Save More by Booking Early`,
          description:
            `Book in advance to access better prices and ensure availability during busy travel periods.`,
        },
      ],
    },
  },
  dubai: {
    slug: 'dubai',
    name: 'Dubai',
    code: 'DXB',
    seoTitle: 'Dubai Airport Parking – Premium Meet & Greet, Valet & Secure Long Stay Options',
    seoDescription: 'Book Dubai Airport (DXB) parking: premium meet & greet, valet services, secure long stay. Compare prices, terminal parking, and off-site lots. Hassle-free reservations.',
    seoKeywords: ['dubai airport parking', 'dxb parking', 'dubai meet and greet', 'dubai airport valet', 'dxb long stay parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/dubai-airport-parking',
    parkingOptionsTitle: '',
    parkingOptionsDescription: '',
    parkingCard1: {
      title: "Meet & Greet",
      description: ""
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: ""
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: ""
    },
    parkingCard4: {
      title: "Park & Ride",
      description: ""
    },
    bookThroughSection: {
      title: "Why Book Through Go Airport Parking?",
      items: [
        {
          title: ``,
          description:
            ``,
        },
        {
          title: ``,
          description:
            ``,
        },
        {
          title: ``,
          description:
            ``,
        },
        {
          title: ``,
          description:
            ``,
        },
        {
          title: ``,
          description:
            ``,
        },
        {
          title: ``,
          description:
            ``,
        },
      ],
    },
  },
  dublin: {
    slug: 'dublin',
    name: 'Dublin',
    code: 'DUB',
    seoTitle: 'Dublin Airport Parking | Compare Secure & Cheap Options',
    seoDescription: 'Compare parking near Dublin Airport and find secure Meet & Greet, Park & Ride, and long stay options with clear prices and easy online booking.',
    seoKeywords: ['dublin airport parking', 'dublin meet and greet', 'dublin park and ride', 'dublin long stay parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/dublin-airport-parking',
    parkingOptionsTitle: 'Parking Options at Dublin Airport',
    parkingOptionsDescription: 'We compare a wide range of parking options near Dublin Airport to suit different travel styles, budgets, and trip durations',
    parkingCard1: {
      title: "Meet & Greet",
      description: "The most convenient option for stress-free travel. Drive directly to the terminal, hand over your keys to a professional driver, and head straight to check-in while your car is parked securely for you."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Perfect for short trips or quick visits, this option allows you to park within walking distance of Terminals 1 and 2, making it ideal when time and convenience matter most."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "Ideal for longer trips and holidays, Long Stay parking offers excellent value with secure facilities located slightly further from the terminal. Regular shuttle buses ensure quick and convenient transfers."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A cost-effective option for travellers looking to save money. Park your vehicle at a secure off-site location and use a free shuttle service to reach the terminal quickly and easily."
    },
    bookThroughSection: {
      title: "Why Book With Go Airport Parking",
      items: [
        {
          title: `Compare & Save Instantly`,
          description:
            `Quickly compare parking deals at Dublin Airport to find the best value for your trip.`,
        },
        {
          title: `Secure & Trusted Providers`,
          description:
            `All parking operators are carefully vetted to ensure safe and reliable service.`,
        },
        {
          title: `Clear & Transparent Pricing`,
          description:
            `No hidden costs, with full details on transfers, timings, and cancellation policies.`,
        },
        {
          title: `Real Customer Reviews`,
          description:
            `Make informed choices using feedback from verified travellers.`,
        },
        {
          title: `Book Early & Save More`,
          description:
            `Reserve in advance to secure better prices and guarantee availability.`,
        },
      ],
    },
  },
  glasgow: {
    slug: 'glasgow',
    name: 'Glasgow',
    code: 'GLA',
    seoTitle: 'Cheap Glasgow Airport Parking Deals | Compare Meet & Greet & Park & Ride',
    seoDescription: 'Looking for parking at Glasgow Airport? Compare trusted providers, check real prices, and book secure Park & Ride, Meet & Greet, and long stay options in minutes.',
    seoKeywords: ['glasgow airport parking', 'glasgow meet and greet', 'gl a parking', 'glasgow long term parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/glasgow-airport-parking',
    parkingOptionsTitle: 'Parking Options at Glasgow Airport',
    parkingOptionsDescription: 'We offer a full range of parking options at Glasgow Airport designed to suit different travel needs, budgets, and trip lengths.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "The most convenient option for travellers who want a smooth experience. Drive directly to the terminal, hand over your keys to a professional driver, and head straight to check-in while your car is parked securely."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Perfect for short visits, drop-offs, or quick trips. Located close to the terminal, it allows fast access with minimal walking distance."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "A great choice for longer holidays or extended travel. These secure car parks are located slightly further from the terminal but include regular free shuttle transfers for easy access."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A budget-friendly parking solution. Park your vehicle at a secure off-site location and enjoy a quick shuttle ride directly to the terminal without any hassle."
    },
    bookThroughSection: {
      title: "Why Book With Go Airport Parking",
      items: [
        {
          title: `Compare & Save Instantly`,
          description:
            `Quickly compare multiple Glasgow Airport parking providers to find the best value for your trip.`,
        },
        {
          title: `Safe & Trusted Providers`,
          description:
            `All parking partners are carefully checked to ensure high safety and service standards.`,
        },
        {
          title: `Clear & Honest Pricing`,
          description:
            `No hidden fees — full transparency on prices, transfers, and cancellation terms.`,
        },
        {
          title: `Real Customer Feedback`,
          description:
            `Make confident choices using genuine reviews from verified travellers.`,
        },
        {
          title: `Book Early, Save More`,
          description:
            `Reserve your parking in advance to get better rates and guaranteed availability. `,
        },
      ],
    },
  },
  heathrow: {
    slug: 'heathrow',
    name: 'Heathrow',
    code: 'LHR',
    seoTitle: 'Heathrow Airport Parking | Compare Secure Meet & Greet & Park & Ride',
    seoDescription: 'Compare Heathrow Airport parking options including Meet & Greet, Park & Ride, and long stay. Find secure providers, better prices, and book online easily.',
    seoKeywords: ['heathrow airport parking', 'heathrow meet and greet', 'lhr parking', 'heathrow long stay', 'heathrow park and ride'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/heathrow-airport-parking',
    parkingOptionsTitle: 'Parking Options at Heathrow Airport',
    parkingOptionsDescription: 'Heathrow Airport offers a variety of parking services designed to suit different travel needs and budgets.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "A premium and time-saving option. Drive straight to the terminal, hand over your keys to a professional driver, and continue to check-in while your car is safely parked for you."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Designed for quick visits, pick-ups, or short journeys. These car parks are located close to terminals, offering fast access when time is limited."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "A practical choice for longer trips and holidays. These secure car parks are located slightly away from terminals but include regular shuttle services for smooth transfers."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "One of the most cost-effective parking solutions. You park your vehicle at a secure off-site location and take a quick shuttle transfer directly to the airport terminals."
    },
    bookThroughSection: {
      title: "Why Book With Go Airport Parking",
      items: [
        {
          title: `Instant Price Comparison`,
          description:
            `Quickly view multiple Heathrow Airport parking options in one place and choose the best deal.`,
        },
        {
          title: `Trusted & Verified Providers`,
          description:
            `All parking services are carefully checked for safety, reliability, and service quality.`,
        },
        {
          title: `Clear Pricing Structure`,
          description:
            `What you see is what you pay — with no hidden fees or surprise charges at arrival.`,
        },
        {
          title: `Real Customer Feedback`,
          description:
            `Make informed decisions using genuine reviews from travellers who have already used the service.`,
        },
        {
          title: `Better Prices When You Book Early`,
          description:
            `Advance booking helps you secure lower rates and ensures availability during peak travel times.`,
        },
      ],
    },
  },
  leeds: {
    slug: 'leeds',
    name: 'Leeds Bradford',
    code: 'LBA',
    seoTitle: 'Compare Leeds Bradford Parking Deals | Save on Trusted Options',
    seoDescription: 'Compare parking options near Leeds Bradford Airport. Explore different providers, check prices, and book the option that suits your trip.',
    seoKeywords: ['leeds bradford airport parking', 'lba parking', 'leeds meet and greet', 'leeds airport long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/leeds-airport-parking',
    parkingOptionsTitle: 'Parking Options at Leeds Bradford Airport',
    parkingOptionsDescription: 'There are several parking solutions available around Leeds Bradford Airport, each suited to different types of travellers.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "Ideal for travellers who want a smooth and time-saving experience. Simply arrive at the terminal, hand over your vehicle, and head straight to departures while your car is parked securely."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Best suited for short visits or quick turnarounds. Located close to the terminal, this option allows fast access without the need for transfers."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "A solid choice for longer trips where value matters. These parking areas are designed for extended stays and provide a balance between cost and convenience."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A practical option for those looking to keep costs down. You leave your car at a nearby facility and take a quick transfer to the terminal, making it a reliable budget-friendly solution."
    },
    bookThroughSection: {
      title: "Why Choose Go Airport Parking",
      items: [
        {
          title: `See More Options in One Search`,
          description:
            `Compare different parking services around Leeds Bradford without jumping between multiple websites.`,
        },
        {
          title: `Reliable Parking You Can Trust`,
          description:
            `We only list providers that meet strong safety and service standards.`,
        },
        {
          title: `Straightforward Pricing`,
          description:
            `Clear costs upfront so you know exactly what you're paying before booking.`,
        },
        {
          title: `Real Experiences, Real Reviews`,
          description:
            `Customer feedback helps you understand what to expect before making a decision.`,
        },
        {
          title: `Plan Ahead & Pay Less`,
          description:
            `Booking early often means better availability and more competitive prices.`,
        },
      ],
    },
  },
  luton: {
    slug: 'luton',
    name: 'Luton',
    code: 'LTN',
    seoTitle: 'Luton Airport Parking Deals | Compare Prices & Book Online',
    seoDescription: 'Looking for parking near Luton Airport? Compare different providers, explore prices, and choose a secure option that fits your trip and budget.',
    seoKeywords: ['luton airport parking', 'lt n parking', 'luton meet and greet', 'luton long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/luton-airport-parking',
    parkingOptionsTitle: 'Parking Options at Luton Airport',
    parkingOptionsDescription: 'There are several ways to arrange parking near Luton Airport, depending on your budget and how you prefer to travel.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "Designed for convenience, this option allows you to arrive at the terminal, hand over your vehicle, and continue directly to departures while it’s parked securely elsewhere."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Best for quick visits or short trips. These spaces are located closer to the terminal, making them ideal when time is limited."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "Suitable for longer trips where keeping costs manageable is important. These options are typically located a short distance away and often include transfer services to the terminal."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A practical option for travellers who don’t mind a short transfer in exchange for lower prices. You park off-site and use a shuttle to reach the terminal efficiently."
    },
    bookThroughSection: {
      title: "Why Use Go Airport Parking",
      items: [
        {
          title: `Compare Options Without the Hassle`,
          description:
            `See multiple parking providers in one place instead of checking each site separately.`,
        },
        {
          title: `Carefully Selected Providers`,
          description:
            `We list services that meet reliability and safety expectations, so you can book with confidence.`,
        },
        {
          title: `Clear Costs from the Start`,
          description:
            `Pricing is shown upfront, including important details like transfers and cancellation terms.`,
        },
        {
          title: `Helpful Customer Feedback`,
          description:
            `Read real user experiences to understand what each option offers before booking.`,
        },
        {
          title: `Better Value with Early Booking`,
          description:
            `Planning ahead can help you find lower prices and avoid last-minute availability issues.`,
        },
      ],
    },
  },
  manchester: {
    slug: 'manchester',
    name: 'Manchester',
    code: 'MAN',
    seoTitle: 'Manchester Airport Parking Deals | Compare Options & Save Online',
    seoDescription: 'Compare parking around Manchester Airport, review different providers, and book a space that suits your trip, timing, and budget with confidence.',
    seoKeywords: ['manchester airport parking', 'man parking', 'manchester meet and greet', 'manchester terminal parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/manchester-airport-parking',
    parkingOptionsTitle: 'Parking Options at Manchester Airport',
    parkingOptionsDescription: 'There are several types of parking available around Manchester Airport, each suited to different needs.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "A convenient option for those who want to minimise effort. You arrive at the terminal, hand over your car, and head straight to departures while it is parked securely."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "A good option for short trips or when time is limited. Located closer to terminals, it allows quicker access without needing transfers."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "Best suited for longer trips where keeping costs under control is important. These options are usually located slightly further out and may include transfer services to the terminal."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A practical choice for travellers looking for lower prices. You park your vehicle off-site and use a shuttle service to reach the terminal, adding a bit of travel time but reducing cost."
    },
    bookThroughSection: {
      title: "Why Use Go Airport Parking",
      items: [
        {
          title: `Compare More Than One Option`,
          description:
            `View a range of parking providers together instead of searching each one individually.`,
        },
        {
          title: `Reliable & Checked Services`,
          description:
            `We highlight providers that meet recognised safety and service standards.`,
        },
        {
          title: `Clear Information Upfront`,
          description:
            `Important details like pricing, transfers, and booking terms are shown before you confirm.`,
        },
        {
          title: `Learn from Other Travellers`,
          description:
            `Customer feedback helps you understand the experience before making a decision.`,
        },
        {
          title: `Sort It Before You Travel`,
          description:
            `Booking early means less to worry about on the day and better control over pricing.`,
        },
      ],
    },
  },
  'southampton-port': {
    sectionData: getSectionData('southampton-port'),
    slug: 'southampton-port',
    name: 'Southampton',
    code: 'SOP',
    seoTitle: 'Southampton Port Parking Deals | Compare Cruise Parking Options',
    seoDescription: 'Compare parking near Southampton Cruise Port, explore secure options, and book the right space for your cruise with clear pricing and flexible choices.',
    seoKeywords: ['southampton port parking', 'southampton cruise parking', 'southampton meet and greet'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/southampton-port-parking',
    parkingOptionsTitle: 'Parking Options at Southampton Port',
    parkingOptionsDescription: 'There are several parking choices available around Southampton Cruise Port, depending on how you prefer to start your journey.',
    parkingCard1: {
      title: "Park & Stroll",
      description: "A simple and direct option. You park your car nearby and walk to the terminal, making it a convenient choice when distance is manageable."
    },
    parkingCard2: {
      title: "Cruise Terminal / Short Stay Parking",
      description: "Located closer to the port, this option is useful for short visits, drop-offs, or travellers who prefer minimal walking distance."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "A practical option for cruise passengers travelling for several days or weeks. These parking areas are designed for extended stays and often include transfer services to the terminal."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A cost-effective solution where you park at an off-site location and use a shuttle to reach the cruise terminal. Ideal for travellers looking to reduce overall costs."
    },
    bookThroughSection: {
      title: "Why Compare with Go Airport Parking",
      items: [
        {
          title: `See Different Options Side by Side`,
          description:
            `Compare a range of cruise parking providers without needing to search each one separately.`,
        },
        {
          title: `Focus on Trusted Services`,
          description:
            `We feature providers that meet expected standards for reliability and security.`,
        },
        {
          title: `Clear Details Before Booking`,
          description:
            `Pricing, transfer options, and key terms are shown upfront so you know what to expect.`,
        },
        {
          title: `Real Feedback from Travellers`,
          description:
            `Customer reviews help you understand the experience before making a decision.`,
        },
        {
          title: `Plan Ahead for Better Value`,
          description:
            `Booking early can help secure availability and avoid higher last-minute prices.`,
        },
      ],
    },
  },
  stansted: {
    slug: 'stansted',
    name: 'Stansted',
    code: 'STN',
    seoTitle: 'Stansted Airport Parking Comparison | Find Deals & Book Online',
    seoDescription: 'Compare parking near Stansted Airport, explore different providers, and book a secure option that matches your travel plans and budget.',
    seoKeywords: ['stansted airport parking', 'stn parking', 'stansted meet and greet', 'stansted long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/stansted-airport-parking',
    sectionData: getSectionData('stansted'),
    parkingOptionsTitle: 'Parking Options at Stansted Airport',
    parkingOptionsDescription: 'There are several types of parking available near Stansted Airport, each offering a different balance of price and convenience.',
    parkingCard1: {
      title: "Meet & Greet",
      description: "A straightforward option for travellers who want to minimise effort. You arrive at the terminal, hand over your vehicle, and continue directly to departures."
    },
    parkingCard2: {
      title: "Terminal / Short Stay Parking",
      description: "Designed for quick access, this option keeps you closer to the terminal, making it useful for short trips or tight schedules."
    },
    parkingCard3: {
      title: "Long Stay Parking",
      description: "A suitable option for longer trips where overall cost matters more than proximity. These locations are usually further out but often include transfer services."
    },
    parkingCard4: {
      title: "Park & Ride",
      description: "A lower-cost option where you park at a nearby facility and take a shuttle to the terminal. It’s a practical choice if you’re happy to allow extra transfer time."
    },
    bookThroughSection: {
      title: "Why Compare with Go Airport Parking",
      items: [
        {
          title: `View Multiple Options at Once`,
          description:
            `Compare different parking providers without switching between multiple websites.`,
        },
        {
          title: `Focused on Reliable Choices`,
          description:
            `We include providers that meet expected standards for safety and service.`,
        },
        {
          title: `Simple, Upfront Pricing`,
          description:
            `Costs are clearly displayed, including important details like transfers and booking terms.`,
        },
        {
          title: `Learn Before You Book`,
          description:
            `Use real customer feedback to understand each option before making a decision.`,
        },
        {
          title: `Plan Ahead with Confidence`,
          description:
            `Booking early helps avoid last-minute issues and gives you more choice.`,
        },
      ],
    },
  }
};

export const getAirportConfig = (slug) => airportConfigs[slug] || null;

export const getAirportList = () => Object.values(airportConfigs).map(config => ({
  title: config.name + (config.slug === 'southampton-port' ? ' Port' : ' Airport'),
  path: config.path
}));

