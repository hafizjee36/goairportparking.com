import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import AIRPORT_PARKING from "../../assets/optimized/airport-parking.webp";
import Why from "./components/Why";
import AirportList from "./components/AirportList";
import ParkingOptions from "./components/ParkingOptions";

export default function AirportParking() {
  return (
    <>
      <Seo 
        title="Airport Parking - Compare & Book Cheap Airport Parking Deals | Go Airport Parking"
        description="Compare and book the best airport parking deals in the UK. Find cheap meet & greet, park & ride, and long stay parking at all major UK airports. Save up to 60% on airport parking."
        keywords={[
          "airport parking",
          "cheap airport parking",
          "airport parking deals",
          "meet and greet parking",
          "park and ride",
          "long stay parking",
          "airport parking comparison",
          "UK airport parking"
        ]}
      />
      
      <HeroSection title="Airport Parking" breadcrumb image={AIRPORT_PARKING} />

      <Why />
      <AirportList />
      <ParkingOptions />
    </>
  );
}
