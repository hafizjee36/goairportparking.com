export const isDubaiAirport = (airport = {}) => {
  const normalized = (
    airport.value ||
    airport.code ||
    airport.slug ||
    airport.level ||
    airport.name ||
    airport.path ||
    ""
  )
    .toString()
    .toLowerCase();

  return (
    normalized === "dxb" ||
    normalized.includes("dubai") ||
    normalized.includes("dubai-airport") ||
    normalized.includes("dubai-airport-parking")
  );
};

export const filterAirportsByRegion = (airports = [], isDubai = false) => {
  if (!Array.isArray(airports)) return [];
  if (isDubai) return airports;
  return airports.filter((airport) => !isDubaiAirport(airport));
};
