/**
 * Airport section data extracted from specific components.
 * Extend for each airport slug.
 */
export const airportSectionData = {
  birmingham: {
    info: {
      text: `Finding the right parking at Birmingham Airport shouldn't add stress to your journey. At Go Airport Parking LTD Birmingham Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park.`
    },
    terminalParking: {
      subtitle: 'If proximity is your priority, terminal parking offers the fastest access:',
      features: [
        "Multi-Storey and Short Stay options near the main terminal",
        "Walk to check-in within minutes",
        "Perfect for short trips or business travel",
        "Slightly higher cost but maximum convenience"
      ]
    },
    pricing: {
      subtitle: 'Prices are indicative and vary based on season, booking date, and duration',
      data: [
        {
          service: "Meet & Greet (terminal drop)",
          price: "£45–£95 per day",
          details: "Drop-off at terminal / 1–2 mins"
        },
        {
          service: "Terminal / Short Stay",
          price: "£25–£55 half day, £60–£85 full day",
          details: "0-5 minute walk"
        },
        {
          service: "Long Stay",
          price: "£40–£70 per 7 days",
          details: "Shuttle every 10–15 mins"
        },
        {
          service: "Park & Ride / Economy",
          price: "£35–£65 per 7 days",
          details: "Shuttle bus or coach to terminal"
        }
      ],
      notice: 'Advance bookings typically offer the best rates and availability.'
    },
    faq: [
      {
        id: "q1",
        question: "What is Birmingham Airport Meet & Greet parking?",
        answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
      },
      {
        id: "q2", 
        question: "When should I book for the best price?",
        answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
      },
      {
        id: "q3",
        question: "What is Long Stay parking at Birmingham Airport?",
        answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
      },
      {
        id: "q4",
        question: "Is Birmingham Airport parking secure?",
        answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
      },
      {
        id: "q5",
        question: "Can I amend or cancel my booking?",
        answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
      }
    ]
  },
  heathrow: {
    info: {
      text: "Finding the right parking at Heathrow Airport shouldn't add stress to your journey. At Go Airport Parking LTD Heathrow Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
      subtitle: "Terminal parking across T1-T5 offers ultimate convenience:",
      features: [
        "Multi-storey car parks at every terminal",
        "Walk directly to check-in",
        "24/7 security and CCTV",
        "Height restrictions apply"
      ]
    },
    pricing: {
      subtitle: "Indicative rates for Heathrow (T2/T3/T5 vary slightly)",
      data: [
        { service: "Meet & Greet (all terminals)", price: "£60–£120/day", details: "Valet drop-off/pick-up" },
        { service: "Terminal Short Stay", price: "£30–£70/day", details: "0-5 min walk" },
        { service: "Long Stay", price: "£50–£90/7 days", details: "Free shuttle every 10 mins" },
        { service: "Park & Ride", price: "£40–£80/7 days", details: "Coach transfer to terminals" }
      ],
      notice: "Book early for best rates. Prices fluctuate by season."
    },
    faq: [
      { id: "q1", question: "Which terminal parking should I choose?", answer: "T5 for British Airways, T2/T3 for others. Multi-storey at each terminal." },
      { id: "q2", question: "Is Meet & Greet available at all terminals?", answer: "Yes, fully operational at T2, T3, T4, T5." },
      { id: "q3", question: "How long is the Long Stay shuttle?", answer: "10-15 mins to terminals with transfers every 10 mins." },
      { id: "q4", question: "Are there height restrictions?", answer: "Yes, typically 2.1m at multi-storey. Park & Ride accepts larger vehicles." },
      { id: "q5", question: "Can I cancel my booking?", answer: "Free cancellation up to 48hrs before arrival for most providers." }
    ]
  },
  bristol: {
    info: {
      text: "Finding the right parking at Bristol Airport shouldn't add stress to your journey. At Go Airport Parking LTD Bristol Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
      subtitle: "Bristol terminal parking offers quick access:",
      features: [
        "Multi-storey car park near terminal",
        "5 minute walk to check-in",
        "24/7 CCTV security",
        "Height limit 2.0m"
      ]
    },
    pricing: {
      data: [
        { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
        { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
        { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
        { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
      ]
    },
    faq: [
        {
          id: "q1",
          question: "What is Bristol Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Bristol Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Bristol Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  dublin: {
    info: {
      text: "Finding the right parking at Dublin Airport shouldn't add stress to your journey. At Go Airport Parking LTD Dublin Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Bristol terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Dublin Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Dublin Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Dublin Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  glasgow: {
    info: {
      text: "Finding the right parking at Glasgow Airport shouldn't add stress to your journey. At Go Airport Parking LTD Glasgow Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Bristol terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Glasgow Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Glasgow Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Glasgow Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  leeds: {
    info: {
      text: "Finding the right parking at Leeds Airport shouldn't add stress to your journey. At Go Airport Parking LTD Leeds Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Bristol terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Leeds Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Leeds Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Leeds Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  luton: {
    info: {
      text: "Finding the right parking at Luton Airport shouldn't add stress to your journey. At Go Airport Parking LTD Luton Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Luton terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Luton Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Luton Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Luton Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  manchester: {
    info: {
      text: "Finding the right parking at Manchester Airport shouldn't add stress to your journey. At Go Airport Parking LTD Manchester Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Manchester terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Manchester Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Manchester Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Manchester Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  'southampton-port': {
    info: {
      text: "Finding the right parking at Southampton Port shouldn't add stress to your journey. At Go Airport Parking LTD Southampton Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Southampton terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Southampton Port Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Southampton Port?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Southampton Port parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  stansted: {
    info: {
      text: "Finding the right parking at Stansted Airport shouldn't add stress to your journey. At Go Airport Parking LTD Stansted Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Stansted terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        {
          id: "q1",
          question: "What is Stansted Airport Meet & Greet parking?",
          answer: "Meet & Greet allows you to drive directly to the terminal where a valet meets you, parks your car securely, and returns it when you land. Fast, simple, and stress-free."
        },
        {
          id: "q2", 
          question: "When should I book for the best price?",
          answer: "Booking early can save up to 60% compared to same-day parking rates. Prices rise closer to departure dates, so book in advance to lock in the best deal."
        },
        {
          id: "q3",
          question: "What is Long Stay parking at Stansted Airport?",
          answer: "Long Stay is suitable for trips lasting several days. These car parks are slightly further from the terminal but are connected by regular shuttle buses."
        },
        {
          id: "q4",
          question: "Is Stansted Airport parking secure?",
          answer: "Yes. Many facilities are Park Mark accredited and offer features like CCTV, barrier entry, 24/7 patrols, and lighting. You can see security details for each option on our site."
        },
        {
          id: "q5",
          question: "Can I amend or cancel my booking?",
          answer: "Most bookings offer free cancellation or changes up to 24–72 hours before arrival. Always double-check terms when booking to ensure flexibility"
        }
      ]
  },
  dubai: {
    info: {
      text: "Finding the right parking at Dubai Airport shouldn't add stress to your journey. At Go Airport Parking LTD Dubai Comparison, we make it easy to compare prices, services, and locations of both official and off-site providers. Whether you prefer the ease of Meet & Greet, the value of Park & Ride, or the convenience of Terminal and Long Stay car parks, we've got you covered. Perfect for quick weekend trips or long-haul getaways, our platform helps you find secure, cost-effective parking in just a few clicks. With full transparency, no hidden charges, and peace of mind built-in, your smooth journey starts from the moment you park."
    },
    terminalParking: {
        subtitle: "Bristol terminal parking offers quick access:",
        features: [
          "Multi-storey car park near terminal",
          "5 minute walk to check-in",
          "24/7 CCTV security",
          "Height limit 2.0m"
        ]
      },
      pricing: {
        data: [
          { service: "Meet & Greet", price: "£50–£90/day", details: "Terminal valet" },
          { service: "Terminal Parking", price: "£25–£60/day", details: "Short walk" },
          { service: "Long Stay", price: "£45–£75/week", details: "Shuttle included" },
          { service: "Park & Ride", price: "£35–£65/week", details: "Coach transfer" }
        ]
      },
      faq: [
        { id: "q1", question: "How far is Park & Ride from Dubai terminal?", answer: "10-15 minute shuttle every 15 mins." },
        { id: "q2", question: "Is parking secure?", answer: "Park Mark approved with CCTV and patrols." }
      ]
  }
};

export const getSectionData = (slug) => airportSectionData[slug] || null;
