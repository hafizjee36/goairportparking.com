import { useEffect } from "react";

function AwinTracking({
  price,
  currency,
  refId,
  awc
}) {
  useEffect(() => {
    let url = `https://www.awin1.com/sread.php?tt=ss&tv=2&merchant=123042`;
    url += `&amount=${price}`;
    url += `&ch=aw`;
    url += `&cr=${currency}`;
    url += `&ref=${refId}`;
    url += `&parts=Default:${price}`;

    if (awc) {
      url += `&cks=${awc}`;
    }

    const img = new Image();
    img.src = url;
  }, [price, currency, refId, awc]);

  return null;
}

export default AwinTracking;