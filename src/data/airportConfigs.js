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
    seoTitle: 'Birmingham Airport Parking – Best Deals, Meet & Greet & Long Stay Options',
    seoDescription: 'Compare Birmingham Airport parking options & prices: meet & greet, park & ride, long stay. Book secure, affordable airport parking near terminals. Save money & travel stress-free.',
    seoKeywords: ['birmingham airport parking', 'birmingham airport meet and greet', 'meet & greet birmingham airport', 'birmingham airport long stay parking', 'birmingham airport park and ride', 'birmingham airport parking deals', 'birmingham airport parking prices'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/birmingham-airport-parking'
  },
  bristol: {
    slug: 'bristol',
    name: 'Bristol',
    code: 'BRS',
    seoTitle: 'Bristol Airport Parking – Compare Prices, Meet & Greet, Park & Ride & Long Stay Deals',
    seoDescription: 'Compare Bristol Airport parking options: meet & greet, park & ride, long stay & short stay. Book secure parking with trusted providers, clear pricing, and great savings. Reserve online now.',
    seoKeywords: ['bristol airport parking', 'bristol airport meet and greet', 'bristol airport long stay', 'bristol airport park and ride', 'bristol airport parking deals', 'bristol airport parking prices', 'bristol car parks'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/bristol-airport-parking'
  },
  dubai: {
    slug: 'dubai',
    name: 'Dubai',
    code: 'DXB',
    seoTitle: 'Dubai Airport Parking – Premium Meet & Greet, Valet & Secure Long Stay Options',
    seoDescription: 'Book Dubai Airport (DXB) parking: premium meet & greet, valet services, secure long stay. Compare prices, terminal parking, and off-site lots. Hassle-free reservations.',
    seoKeywords: ['dubai airport parking', 'dxb parking', 'dubai meet and greet', 'dubai airport valet', 'dxb long stay parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/dubai-airport-parking'
  },
  dublin: {
    slug: 'dublin',
    name: 'Dublin',
    code: 'DUB',
    seoTitle: 'Dublin Airport Parking – Meet & Greet, Park & Ride & Long Stay Deals',
    seoDescription: 'Compare Dublin Airport parking: meet & greet, park & ride, long stay. Secure, affordable options close to terminals. Book now for best prices.',
    seoKeywords: ['dublin airport parking', 'dublin meet and greet', 'dublin park and ride', 'dublin long stay parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/dublin-airport-parking'
  },
  glasgow: {
    slug: 'glasgow',
    name: 'Glasgow',
    code: 'GLA',
    seoTitle: 'Glasgow Airport Parking – Secure Meet & Greet, Valet & Long Term Parking',
    seoDescription: 'Glasgow Airport (GLA) parking options: meet & greet, valet, long term park & ride. Compare prices and book secure parking for your trip.',
    seoKeywords: ['glasgow airport parking', 'glasgow meet and greet', 'gl a parking', 'glasgow long term parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/glasgow-airport-parking'
  },
  heathrow: {
    slug: 'heathrow',
    name: 'Heathrow',
    code: 'LHR',
    seoTitle: 'Heathrow Airport Parking – Compare Meet & Greet, Park & Ride, Long Stay Prices',
    seoDescription: 'All Heathrow terminals parking: meet & greet, park & ride, long/short stay. Best deals, secure lots, shuttle services. Book online now.',
    seoKeywords: ['heathrow airport parking', 'heathrow meet and greet', 'lhr parking', 'heathrow long stay', 'heathrow park and ride'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/heathrow-airport-parking'
  },
  leeds: {
    slug: 'leeds',
    name: 'Leeds Bradford',
    code: 'LBA',
    seoTitle: 'Leeds Bradford Airport Parking – Meet & Greet, Long Stay & Park Mark Secure Lots',
    seoDescription: 'Leeds Bradford (LBA) airport parking comparison: meet & greet, long stay, Park Mark approved. Affordable, secure parking close to terminals.',
    seoKeywords: ['leeds bradford airport parking', 'lba parking', 'leeds meet and greet', 'leeds airport long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/leeds-airport-parking'
  },
  luton: {
    slug: 'luton',
    name: 'Luton',
    code: 'LTN',
    seoTitle: 'Luton Airport Parking – Best Deals on Meet & Greet, Valet & Long Stay Parking',
    seoDescription: 'Luton Airport (LTN) parking: meet & greet, valet, long stay options. Compare prices, secure facilities, easy booking.',
    seoKeywords: ['luton airport parking', 'lt n parking', 'luton meet and greet', 'luton long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/luton-airport-parking'
  },
  manchester: {
    slug: 'manchester',
    name: 'Manchester',
    code: 'MAN',
    seoTitle: 'Manchester Airport Parking – All Terminals Meet & Greet, Park & Ride, Long Stay',
    seoDescription: 'Manchester Airport (MAN) parking for T1/T2/T3: meet & greet, park & ride, long stay. Secure, official & off-site options.',
    seoKeywords: ['manchester airport parking', 'man parking', 'manchester meet and greet', 'manchester terminal parking'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/manchester-airport-parking'
  },
  'southampton-port': {
    sectionData: getSectionData('southampton-port'),
    slug: 'southampton-port',
    name: 'Southampton',
    code: 'SOP',
    seoTitle: 'Southampton Port Parking – Cruise Terminal Secure Parking & Meet & Greet Services',
    seoDescription: 'Secure parking for Southampton cruise port: long stay for cruises, meet & greet, park & ride. Easy access to terminals.',
    seoKeywords: ['southampton port parking', 'southampton cruise parking', 'southampton meet and greet'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/southampton-port-parking'
  },
  stansted: {
    slug: 'stansted',
    name: 'Stansted',
    code: 'STN',
    seoTitle: 'Stansted Airport Parking – Compare Prices for Meet & Greet, Long Stay & Valet',
    seoDescription: 'Stansted Airport (STN) parking deals: meet & greet, long stay, valet services. Secure, affordable options for all trips.',
    seoKeywords: ['stansted airport parking', 'stn parking', 'stansted meet and greet', 'stansted long stay'],
    heroImage: '/assets/AirportsImages/hero-image.webp',
    path: '/stansted-airport-parking',
    sectionData: getSectionData('stansted')
  }
};

export const getAirportConfig = (slug) => airportConfigs[slug] || null;

export const getAirportList = () => Object.values(airportConfigs).map(config => ({
  title: config.name + (config.slug === 'southampton-port' ? ' Port' : ' Airport'),
  path: config.path
}));

