import { Provider, useDispatch } from "react-redux";
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Inner App component that uses Redux dispatch
function AppContent() {
  const dispatch = useDispatch();
  const routing = useRoutes(routes);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <GoogleAnalytics trackingId="GTM-MP74ZBZM" />
      <DefaultSeo />
      <AwinCookieHandler />

      <Navbar />

      <main
        style={{
          width: "100%",
          minHeight: "60vh",
          display: "block",
        }}
      >
        {routing}
      </main>

      <Footer />

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