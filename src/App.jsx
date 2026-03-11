import { Provider, useDispatch } from "react-redux";
// import { useSearchParams } from 'react-router-dom';
import { store } from "./redux/store";
import routes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import { useEffect } from "react";
import { initializeAuth } from "./redux/slice/authSlice";
import GoogleAnalytics from "./components/GoogleAnalytics/GoogleAnalytics";
import DefaultSeo from "./components/reusable/DefaultSeo";
import AwinCookieHandler from "./components/AwinTracking/AwinCookieHandler";

// Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

// Inner App component that uses Redux dispatch
function AppContent() {
  const dispatch = useDispatch();
  const routing = useRoutes(routes);
  // const [searchParams] = useSearchParams();

  return (
    <>
      <ScrollToTop/>
      <GoogleAnalytics trackingId="GTM-MP74ZBZM" />
      <DefaultSeo />
      <AwinCookieHandler />
      <Navbar />
      <main>
        {routing}
      </main>
      <Footer />
      
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

// Main App component with Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
