import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  }}>
    Loading...
  </div>
);

// Eager load only Home page + Auth
import Home from '../pages/home/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Lazy load everything else
const Booking = lazy(() => import('../pages/booking/Booking'));
const OptionalExtras = lazy(() => import('../pages/optionalExtra/OptionalExtra'));
const Payment = lazy(() => import('../pages/payment/Payment'));
const PaymentDetails = lazy(() => import('../pages/paymentdetails/PaymentDetails'));
const Faq = lazy(() => import('../pages/faq/Faq'));
const CompareTravelMoney = lazy(() => import('../pages/compareTravelMoney/CompareTravelMoney'));
const Contact = lazy(() => import('../pages/contact/Contact'));
const Resend = lazy(() => import('../pages/resend/Resend'));
const CarHire = lazy(() => import('../pages/carHire/CarHire'));
const TermsAndCondition = lazy(() => import('../pages/termsAndCondition/TermsAndCondition'));
const PrivacyPolicy = lazy(() => import('../pages/privacyPolicy/PrivacyPolicy'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const BlogDetails = lazy(() => import('../pages/blogDetails/BlogDetails'));
const AirportParking = lazy(() => import('../pages/airportParking/AirportParking'));
const ManchesterAirportParking = lazy(() => import('../pages/ManchesterAirportParking'));
const HeathrowAirportParking = lazy(() => import('../pages/HeathrowAirportParking'));
const LeedsAirportParking = lazy(() => import('../pages/LeedsAirportParking'));
const StanstedAirportParking = lazy(() => import('../pages/StanstedAirportParking'));
const SouthamptonPortParking = lazy(() => import('../pages/SouthamptonPortParking'));
const GlasgowAirportParking = lazy(() => import('../pages/GlasgowAirportParking'));
const BristolAirportParking = lazy(() => import('../pages/BristolAirportParking'));
const LutonAirportParking = lazy(() => import('../pages/LutonAirportParking'));
const BirminghamAirportParking = lazy(() => import('../pages/BirminghamAirportParking'));
const DublinAirportParking = lazy(() => import('../pages/DublinAirportParking'));
const DubaiAirportParking = lazy(() => import('../pages/DubaiAirportParking'));
const CustomerDashboard = lazy(() => import('../pages/manageBooking/CustomerDashboard'));
const About = lazy(() => import('../pages/about/About'));
const WhyChooseUs = lazy(() => import('../pages/whyChooseUs/WhyChooseUs'));
const MyBookings = lazy(() => import('../pages/MyBookings'));
const BookingSuccess = lazy(() => import('../pages/success/BookingSuccess'));
const BookingCancel = lazy(() => import('../pages/success/BookingCancel'));
const BookingFailure = lazy(() => import('../pages/success/BookingFailure'));
const BookingConfirmation = lazy(() => import('../pages/booking/BookingConfirmation'));
const WorldPayConfirmation = lazy(() => import('../pages/worldpay/WorldPayConfirmation'));
const WorldPayCancel = lazy(() => import('../pages/worldpay/WorldPayCancel'));
const Review = lazy(() => import('../pages/review/Review'));

// Wrap with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/booking', element: withSuspense(Booking) },
  { path: '/extra', element: withSuspense(OptionalExtras) },
  { path: '/payment', element: withSuspense(Payment) },
  { path: '/paymentdetails', element: withSuspense(PaymentDetails) },
  { path: '/booking-confirmation', element: withSuspense(BookingConfirmation) },
  { path: '/worldpay-confirmation', element: withSuspense(WorldPayConfirmation) },
  { path: '/worldpay-cancel', element: withSuspense(WorldPayCancel) },
  { path: '/success', element: withSuspense(BookingSuccess) },
  { path: '/cancel', element: withSuspense(BookingCancel) },
  { path: '/failure', element: withSuspense(BookingFailure) },
  { path: '/faq', element: withSuspense(Faq) },
  { path: '/compare-travel-money', element: withSuspense(CompareTravelMoney) },
  { path: '/contact-us', element: withSuspense(Contact) },
  { path: '/resend-confirmation', element: withSuspense(Resend) },
  { path: '/car-hire', element: withSuspense(CarHire) },
  { path: '/terms-condition', element: withSuspense(TermsAndCondition) },
  { path: '/privacy-policy', element: withSuspense(PrivacyPolicy) },
  { path: '/blog', element: withSuspense(Blog) },
  { path: '/blog/:id', element: withSuspense(BlogDetails) },
  { path: '/airport-parking', element: withSuspense(AirportParking) },
  { path: '/manchester-airport-parking', element: withSuspense(ManchesterAirportParking) },
  { path: '/heathrow-airport-parking', element: withSuspense(HeathrowAirportParking) },
  { path: '/leeds-airport-parking', element: withSuspense(LeedsAirportParking) },
  { path: '/stansted-airport-parking', element: withSuspense(StanstedAirportParking) },
  { path: '/southampton-port-parking', element: withSuspense(SouthamptonPortParking) },
  { path: '/glasgow-airport-parking', element: withSuspense(GlasgowAirportParking) },
  { path: '/bristol-airport-parking', element: withSuspense(BristolAirportParking) },
  { path: '/luton-airport-parking', element: withSuspense(LutonAirportParking) },
  { path: '/birmingham-airport-parking', element: withSuspense(BirminghamAirportParking) },
  { path: '/dubai-airport-parking', element: withSuspense(DubaiAirportParking) },
  { path: '/dublin-airport-parking', element: withSuspense(DublinAirportParking) },
  { path: '/customer-dashboard', element: withSuspense(CustomerDashboard) },
  { path: '/about-us', element: withSuspense(About) },
  { path: '/why-choose-us', element: withSuspense(WhyChooseUs) },
  { path: '/my-bookings', element: withSuspense(MyBookings) },
  { path: '/review', element: withSuspense(Review) },
  { path: '*', element: <Navigate to="/" replace /> },
];

export default routes;
