/**
 * Airport section data extracted from specific components.
 * Extend for each airport slug.
 */
export const airportSectionData = {
  birmingham: {
    info: {
      text: `Finding the right parking near Birmingham Airport doesn’t need to be complicated or stressful. At Go Airport Parking LTD, we make it simple to compare a wide range of trusted parking providers, helping you choose the best option based on price, convenience, and travel needs. Our platform brings together both official and off-site parking services, giving you complete flexibility when planning your journey. Whether you are looking for the convenience of Meet & Greet, the affordability of Park & Ride, or the accessibility of terminal-based and long stay options, everything is available to compare in one place.Perfect for short city breaks, business trips, or long-haul holidays, our service helps you secure safe and cost-effective parking within minutes. With clear pricing, no hidden charges, and fully vetted providers, you can book with confidence every time.From start to finish, we focus on making your travel experience smoother, ensuring your journey begins and ends with complete peace of mind.`
    },
    terminalParking: {
      subtitle: 'Located closest to the terminal, Terminal parking offers quick and easy access for travellers who prefer minimal walking. These short-stay or multi-storey car parks are ideal for fast drop-offs, pick-ups, and short trips where convenience is a priority.',
      features: [
        "Multi-storey and short-stay parking located near the main terminal for quick access ",
        "Walk to check-in in just a few minutes, saving time on your journey ",
        "Ideal for short trips, weekend breaks, and business travel from major UK airports",
        "Premium convenience option with slightly higher pricing but maximum time savings and ease "
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
        question: "How do I find cheap parking near Birmingham Airport?",
        answer: "You can compare prices from multiple providers on Go Airport Parking and choose the best deal based on your travel dates and preferences."
      },
      {
        id: "q2",
        question: "Is Meet & Greet parking available at Birmingham Airport?",
        answer: "Yes, you can find several Meet & Greet options where a driver collects and returns your vehicle directly at the terminal."
      },
      {
        id: "q3",
        question: "What is the cheapest parking option near Birmingham Airport?",
        answer: "Park & Ride is usually the most affordable option as it includes off-site parking with free shuttle transfers."
      },
      {
        id: "q4",
        question: "How far in advance should I book?",
        answer: "Booking early helps you secure lower prices and better availability, especially during busy travel seasons."
      },
      {
        id: "q5",
        question: "Are the parking providers secure?",
        answer: "Yes, all listed providers are vetted and offer secure parking facilities with reliable service."
      },
      {
        id: "q6",
        question: "Can I cancel or change my booking?",
        answer: "Most bookings allow changes or cancellations depending on the provider’s policy, which is shown before checkout."
      },
    ]
  },
  heathrow: {
    info: {
      text: "Travelling through Heathrow Airport? Parking can often feel expensive and confusing, especially with so many different providers and locations available. That’s where comparing options before you travel can make a real difference.Instead of paying higher on-the-day prices, you can explore different parking types such as fast-access Meet & Greet services, budget-friendly Park & Ride locations, and secure long-stay facilities depending on your journey length and travel style.Every option comes with different benefits, whether you value speed, price, or convenience. By checking prices in advance, you can avoid unnecessary stress, secure a guaranteed space, and choose a parking solution that actually fits your trip."
    },
    terminalParking: {
      subtitle: "For travellers who prioritise speed and convenience at Heathrow Airport, terminal parking keeps you just moments away from departures.",
      features: [
        "Short Stay parking located near Terminals 2, 3, 4, and 5",
        "Minimal walking distance to check-in areas",
        "Ideal for business trips, short breaks, and heavy luggage",
        "Higher cost, but unmatched convenience and time savings"
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
      { id: "q1", question: "What is the best parking option at Heathrow Airport?", answer: "It depends on your travel needs. Meet & Greet is best for convenience, while Park & Ride is ideal for saving money." },
      { id: "q2", question: "How early should I book Heathrow Airport parking?", answer: "Booking early is recommended to secure lower prices and guarantee a space, especially during holidays and peak seasons." },
      { id: "q3", question: "Is Heathrow Airport parking secure?", answer: "Yes, most parking facilities offer CCTV monitoring, regular patrols, and industry-standard security approvals." },
      { id: "q4", question: "What is the cheapest parking option at Heathrow Airport?", answer: "Park & Ride is generally the most affordable option, offering off-site parking with shuttle transfers." },
      { id: "q5", question: "Do Meet & Greet services operate at Heathrow Airport?", answer: "Yes, professional drivers collect your vehicle at the terminal and park it securely while you travel." },
      { id: "q6", question: "Can I cancel or change my Heathrow parking booking?", answer: "Most providers allow modifications or cancellations depending on their specific terms, shown during booking." },
      { id: "q7", question: "Why should I use a parking comparison site instead of booking directly?", answer: "A comparison site lets you quickly view multiple deals, helping you save money and choose the most suitable option." },
    ]
  },
  bristol: {
    info: {
      text: "Flying from Bristol Airport? Go Airport Parking helps you quickly compare parking near Bristol Airport and find secure, affordable options in just a few clicks. Our platform connects you with trusted providers so you can choose the best Bristol Airport parking deals based on your budget and travel plans.Whether you’re looking for the convenience of Meet & Greet, the value of Park & Ride, or reliable long-stay parking for extended trips, you can compare all options in one place. We also include both on-site and off-site parking, making it easy to find the right balance of price, security, and convenience.With regular shuttle transfers, secure parking facilities, and transparent pricing, booking in advance helps you secure the cheapest parking near Bristol Airport and guarantees your space before you travel. No hidden charges, no confusion — just simple, trusted airport parking comparison designed to make your journey smoother from start to finish."
    },
    terminalParking: {
      subtitle: "If convenience is your top priority, Terminal parking offers the quickest and most direct access to Bristol Airport.",
      features: [
        "Short-stay parking located within easy walking distance of the terminal",
        "Minimal transfer time, allowing faster access to departures and arrivals",
        "Ideal for business travel, weekend breaks, and passengers with heavy luggage",
        "Premium option with slightly higher pricing, but maximum convenience and time savings"
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
            { id: "q1", question: "How do I compare parking options near Bristol Airport?", answer: "You can compare multiple parking providers in one place by entering your travel dates and selecting from available options based on price, distance, and convenience." },
            { id: "q2", question: "What is the cheapest way to park near Bristol Airport?", answer: "Park & Ride is usually the most affordable option, offering secure off-site parking with free shuttle transfers to the terminal." },
            { id: "q3", question: "Is Meet & Greet parking available at Bristol Airport?", answer: "Yes, Meet & Greet services are available where a professional driver collects your vehicle directly at the terminal and parks it securely for you." },
            { id: "q4", question: "Can I cancel or change my booking?", answer: "Most bookings allow changes or cancellations depending on the provider’s policy, which is clearly shown before you confirm your reservation." },
            { id: "q4", question: "Are parking providers near Bristol Airport secure?", answer: "Yes, all listed providers are vetted and offer secure facilities with monitoring and trusted service standards for peace of mind." },
            { id: "q6", question: "When should I book parking for Bristol Airport?", answer: "It is recommended to book in advance to secure lower prices and guarantee availability, especially during busy travel seasons." },
      ]
  },
  dublin: {
    info: {
      text: "Travelling through Dublin Airport? Go Airport Parking helps you quickly compare secure and affordable parking options in one place. Our platform connects you with trusted providers so you can easily choose the best option based on price, convenience, and travel needs.Whether you prefer Meet & Greet for maximum ease, Park & Ride for better value, or long-stay parking for extended trips, we make it simple to compare all available choices. You can also explore both on-site and off-site parking options with transparent pricing, reliable transfers, and strong security standards.Booking in advance helps you secure better rates and guarantees your space before you travel. With no hidden charges and a smooth booking process, your journey starts stress-free from the moment you park."
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
            { id: "q1", question: "How can I find cheap parking near Dublin Airport?", answer: "You can compare multiple providers in one place and choose the best option based on price, distance, and convenience." },
            { id: "q2", question: "Is Meet & Greet parking available at Dublin Airport?", answer: "Yes, Meet & Greet services are available where a driver collects your vehicle directly at the terminal." },
            { id: "q3", question: "What is the cheapest parking option at Dublin Airport?", answer: "Park & Ride is usually the most affordable choice as it includes off-site parking with free shuttle transfers." },
            { id: "q4", question: "How far is long stay parking from the terminal?", answer: "Long stay parking is 10 to 15 minutes away, but regular shuttle buses provide quick and easy access to the terminals." },
            { id: "q5", question: "Can I cancel or change my booking?", answer: "Most bookings can be modified or cancelled depending on the provider’s policy, which is shown before checkout." },
            { id: "q6", question: "Is parking at Dublin Airport secure?", answer: "Yes, all listed providers offer secure facilities with monitoring and trusted safety standards." },
            { id: "q7", question: "When should I book parking for Dublin Airport?", answer: "It is recommended to book early to get lower prices and ensure availability, especially during busy travel periods." },
            { id: "q8", question: "Why use a comparison site instead of booking directly?", answer: "A comparison platform lets you view multiple options at once, helping you find better deals and save both time and money." },
      ]
  },
  glasgow: {
    info: {
      text: "Planning a trip from Glasgow Airport? Instead of paying more at the gate, you can compare different parking services in advance and choose what fits your journey best.From budget-friendly Park & Ride locations to premium Meet & Greet services and long-stay airport parking, everything is available in one place. Each option comes with different benefits depending on how early you book, how long you’re travelling, and how much convenience you need.Our comparison system helps you quickly spot better prices, understand transfer times, and pick secure parking without confusion or hidden conditions."
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
        { id: "q", question: "Do I need to pre-book parking at Glasgow Airport?", answer: "Pre-booking is recommended because it usually guarantees better prices and ensures a space is reserved for your travel dates, especially during busy periods." },
        { id: "q", question: "Which parking option is best for long holidays from Glasgow Airport?", answer: "Long Stay parking is generally the best choice for extended trips as it offers secure facilities with shuttle transfers to the terminal." },
        { id: "q", question: "Can I find parking that is close to the terminal?", answer: "Yes, Terminal and Short Stay parking options are located near the airport building and are suitable for quick access or short visits." },
        { id: "q", question: "What happens if my flight is delayed?", answer: "Most parking providers offer flexible stay extensions, but extra charges may apply depending on how long your vehicle remains in the car park." },
        { id: "q", question: "Is it cheaper to book Glasgow Airport parking online?", answer: "Yes, online booking usually provides lower rates compared to drive-up prices and allows you to compare different providers easily." },
        { id: "q", question: "Are shuttle buses included with Park & Ride parking?", answer: "Yes, Park & Ride services typically include free shuttle transfers that run regularly between the car park and the terminal." },
        { id: "q", question: "Is Meet & Greet parking safe at Glasgow Airport?", answer: "Yes, Meet & Greet services are operated by vetted providers, and vehicles are parked in secure monitored facilities." },
        { id: "q", question: "Can I modify my booking after payment?", answer: "Most bookings can be changed or cancelled depending on the provider’s policy, which is shown before final confirmation." },
      ]
  },
  leeds: {
    info: {
      text: "Travelling from Leeds Bradford Airport? Instead of choosing the first parking option you see, comparing different providers can help you find better value and a setup that suits your journey.Go Airport Parking is a comparison platform that brings together a range of parking services, allowing you to review options based on price, distance, and convenience. Whether you're planning ahead or booking closer to your travel date, comparing helps you avoid overpaying and gives you more flexibility.From quick drop-off style services to lower-cost off-site options and longer stay solutions, you can explore what works best for your trip without being limited to a single provider."
    },
    terminalParking: {
        subtitle: "If staying close to the terminal matters most, this option keeps everything within easy reach at Leeds Bradford Airport.",
        features: [
          "Short stay parking located just a short walk from check-in",
          "No need for shuttle transfers or waiting times",
          "Ideal for short journeys, business travel, or tight schedules ",
          "Higher daily pricing, but offers speed and simplicity"
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
        { id: "1", question: "Is it worth booking parking in advance at Leeds Bradford Airport?", answer: "Yes, booking ahead often gives you better prices and ensures availability, especially during busy travel periods." },
        { id: "2", question: "What parking option is best for short trips?", answer: "Terminal or short stay parking is usually the best option for short visits as it offers quick and easy access." },
        { id: "3", question: "Are there budget-friendly parking options near Leeds Bradford Airport?", answer: "Yes, Park & Ride services are typically the most cost-effective, offering secure parking with transfer services." },
        { id: "4", question: "How does Meet & Greet parking work here?", answer: "You drive to the terminal, hand over your car to a driver, and head straight to departures while it’s parked securely." },
        { id: "5", question: "Is long stay parking suitable for holidays?", answer: "Yes, it’s designed for extended trips and offers a balance between cost and convenience." },
        { id: "6", question: "Can I find parking within walking distance of the terminal?", answer: "Yes, short stay and terminal options are usually located close enough for easy walking access." },
        { id: "7", question: "What should I consider when choosing parking?", answer: "Think about your budget, trip length, and how close you want to be to the terminal." },
        { id: "8", question: "Do parking prices change depending on when I book?", answer: "Yes, prices can increase closer to your travel date, so booking early is usually more cost-effective." },
      ]
  },
  luton: {
    info: {
      text: "Travelling from London Luton Airport? Parking doesn’t have to be something you sort out at the last minute. By comparing options ahead of time, you can often find better prices and avoid unnecessary delays on the day of travel.Go Airport Parking helps you explore a mix of providers offering different types of parking, from quick drop-off style services to lower-cost off-site spaces and longer stay options. Each comes with its own balance of price, distance, and convenience.Instead of sticking to one choice, you can review multiple options side by side and pick what suits your journey best. Booking early also helps secure availability, especially during busy travel periods."
    },
    terminalParking: {
        subtitle: "If being close to departures matters most, this option keeps things simple near London Luton Airport.",
        features: [
          "Short stay spaces within easy reach of the terminal",
          "No need for shuttle transfers or waiting time",
          "Useful for short journeys, business trips, or tight schedules",
          "Higher daily pricing, but saves time and effort"
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
        { id: "q1", question: "Can I arrange parking on the day at Luton Airport?", answer: "Yes, but availability can be limited and prices are usually higher compared to booking in advance." },
        { id: "q2", question: "Which parking option is easiest for early morning flights?", answer: "Meet & Greet or terminal parking is often more convenient as it reduces transfer time." },
        { id: "q3", question: "Are off-site parking options far from Luton Airport?", answer: "Most are located a short drive away and provide shuttle transfers to keep things convenient." },
        { id: "q4", question: "Is it possible to find parking for longer trips?", answer: "Yes, long stay options are designed specifically for extended travel and usually offer better value." },
        { id: "q5", question: "What should I check before booking parking?", answer: "Look at transfer times, distance from the terminal, pricing, and customer reviews." },
        { id: "q6", question: "Do all parking options include transfers?", answer: "No, transfers are usually included with Park & Ride and long stay options, but not with terminal parking." },
        { id: "q7", question: "Can I book parking close to my departure time?", answer: "Yes, but prices may increase and fewer options may be available closer to your travel date." },
        { id: "q8", question: "Why compare parking instead of booking directly?", answer: "Comparing helps you see different price points and features, making it easier to choose the best option." },
      ]
  },
  manchester: {
    info: {
      text: "Getting ready to travel from Manchester Airport? Parking is one of those things that can either be sorted in advance or become a last-minute hassle.Instead of sticking to one provider, comparing different parking options gives you more control over cost, distance, and convenience. Some travellers prefer quick access close to the terminal, while others are happy to trade a short transfer for better value.With Go Airport Parking, you can view multiple options side by side, making it easier to decide what works best for your journey. Planning ahead not only helps avoid higher prices but also ensures your space is secured before the day of travel."
    },
    terminalParking: {
        subtitle: "For travellers who prefer to stay close to departures at Manchester Airport, this option keeps everything within easy reach.",
        features: [
          "Short stay and multi-storey spaces near Terminals 1, 2, and 3",
          "Quick access to check-in with minimal walking",
          "Suitable for short stays, business trips, or tight schedules",
          "Higher daily rates, but reduces time and effort on the day"
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
        { id: "q1", question: "Is it better to compare parking before arriving at Manchester Airport?", answer: "Yes, comparing in advance helps you find better prices and choose a setup that suits your travel plans." },
        { id: "q2", question: "Which option is quickest for getting to the terminal?", answer: "Terminal parking and Meet & Greet are usually the fastest as they reduce or remove transfer time." },
        { id: "q3", question: "Are cheaper parking options further away from Manchester Airport?", answer: "In most cases, lower-cost options like Park & Ride are located further out but include transfer services." },
        { id: "q4", question: "Can I leave my car for a long holiday?", answer: "Yes, long stay parking options are designed specifically for extended trips." },
        { id: "q5", question: "What should I look for when comparing parking?", answer: "Consider price, distance from the terminal, transfer time, and customer reviews." },
        { id: "q6", question: "Is parking availability limited during busy periods?", answer: "Yes, spaces can fill up quickly, especially during holidays, so booking early is recommended." },
        { id: "q7", question: "Do all parking services include transfers?", answer: "No, transfers are usually included with off-site options, while terminal parking typically does not require them." },
        { id: "q8", question: "Why not just book directly with one provider?", answer: "Comparing gives you a wider view of prices and features, helping you make a more informed choice." },
      ]
  },
  'southampton-port': {
    info: {
      text: "Planning a cruise from Port of Southampton? Parking is one of the first things to organise before you set off, especially when trips often last several days or longer.Instead of relying on a single option, comparing different parking providers allows you to see how location, pricing, and transfer arrangements vary. Some travellers prefer to stay close to the terminal, while others look for better value slightly further away.Go Airport Parking helps bring these options together, making it easier to choose a setup that matches your cruise schedule, luggage needs, and overall travel plans — all before you even arrive at the port."
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
          question: "How early should I book parking for a cruise from Southampton?",
          answer: "It’s best to book as soon as your cruise dates are confirmed to secure better prices and availability."
        },
        {
          id: "q2",
          question: "What parking option is best for long cruises?",
          answer: "Long stay parking is usually the most suitable option for extended trips, offering better value over time."
        },
        {
          id: "q3",
          question: "Can I park within walking distance of the cruise terminal?",
          answer: "Yes, some parking options allow you to park nearby and walk directly to the terminal."
        },
        {
          id: "q4",
          question: "Are shuttle transfers available for port parking?",
          answer: "Yes, many off-site parking options include shuttle services to and from the cruise terminal."
        },
        {
          id: "q5",
          question: "Is cruise parking secure at Southampton Port?",
          answer: "Most providers offer monitored facilities and security measures to keep vehicles safe during your trip."
        },
        {
          id: "q6",
          question: "What is the most budget-friendly parking option?",
          answer: "Park & Ride is generally the most cost-effective option, especially for longer stays."
        },
        {
          id: "q7",
          question: "Can I drop off luggage before parking my car?",
          answer: "Some travellers choose to drop luggage at the terminal first, depending on the parking option selected."
        },
        {
          id: "q8",
          question: "Why compare cruise parking instead of booking directly?",
          answer: "Comparing helps you see different prices, locations, and services so you can choose what suits your journey best."
        },
      ]
  },
  stansted: {
    info: {
      text: "Heading through London Stansted Airport? Parking is one of the easiest things to sort in advance — yet it’s often left until the last minute.By comparing different providers ahead of time, you can see how prices, locations, and transfer times vary, making it easier to choose what actually works for your trip. Some options prioritise convenience, while others focus on keeping costs low.Go Airport Parking brings these choices together, so instead of relying on a single option, you can review a range of services and pick the one that matches your schedule, budget, and travel style."
    },
    terminalParking: {
        subtitle: "If reducing travel time on the day is important, parking close to London Stansted Airport can make things easier.",
        features: [
          "Short stay parking within walking distance of check-in",
          "No need for shuttle transfers or waiting",
          "Useful for short breaks, business trips, or minimal time windows",
          "Higher daily cost, but saves time and simplifies your journey"
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
          question: "Is it cheaper to arrange parking before arriving at Stansted Airport?",
          answer: "Yes, booking in advance often gives you access to better prices compared to paying on arrival."
        },
        {
          id: "q2",
          question: "Which parking option involves the least walking?",
          answer: "Meet & Greet usually involves the least walking, as you are dropped directly at the terminal."
        },
        {
          id: "q3",
          question: "Are there parking options suitable for longer trips?",
          answer: "Yes, long stay parking is designed for extended travel and is often more cost-effective."
        },
        {
          id: "q4",
          question: "How does Park & Ride parking work at Stansted?",
          answer: "You park your car at an off-site location and take a shuttle service to reach the terminal."
        },
        {
          id: "q5",
          question: "Can I park close to the terminal at Stansted Airport?",
          answer: "Yes, short stay and terminal parking options are available for quick and easy access."
        },
        {
          id: "q6",
          question: "What factors should I compare before booking?",
          answer: "You should look at price, distance, transfer time, and customer reviews before deciding."
        },
        {
          id: "q7",
          question: "Do parking prices change depending on demand?",
          answer: "Yes, prices can vary based on travel dates and demand, especially during busy periods."
        },
        {
          id: "q8",
          question: "Why use a comparison site for airport parking?",
          answer: "It allows you to see multiple options together, helping you make a more informed and cost-effective choice."
        },
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
