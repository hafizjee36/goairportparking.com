import { useEffect } from "react";
import { useCookies } from "react-cookie";

const AwinCookieHandler = () => {
  const [, setCookie] = useCookies(["awc"]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const awc = params.get("awc");

    if (awc) {
      setCookie("awc", awc, {
        path: "/",
        domain: ".goairportparking.com", // leading dot is IMPORTANT
        secure: true,
        sameSite: "lax", // ✅ DO NOT use strict for tracking
        maxAge: 60 * 60 * 24 * 365 // 1 year
      });

      // Remove awc from URL
    //   params.delete("awc");
    //   const newUrl =
    //     window.location.pathname +
    //     (params.toString() ? "?" + params.toString() : "");
    //   window.history.replaceState({}, "", newUrl);
    }
  }, [setCookie]);

  return null;
};

export default AwinCookieHandler;