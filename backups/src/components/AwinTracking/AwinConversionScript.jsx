import { useEffect } from "react";

const AwinConversionScript = ({ price, currency, refId }) => {
  useEffect(() => {
    window.AWIN = window.AWIN || {};
    window.AWIN.Tracking = window.AWIN.Tracking || {};
    window.AWIN.Tracking.Sale = {
      amount: price,
      channel: "aw",
      orderRef: refId,
      parts: `Default:${price}`,
      currency: currency
    };
  }, [price, currency, refId]);

  return null;
};

export default AwinConversionScript;