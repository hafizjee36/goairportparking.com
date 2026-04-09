const AwinFallbackPixel = ({ price, currency, refId }) => {
  const src = `https://www.awin1.com/sread.img?tt=ns&tv=2&merchant=123042&amount=${price}&cr=${currency}&ref=${refId}&parts=Default:${price}&ch=aw`;

  return (
    <img
      src={src}
      alt=""
      width="0"
      height="0"
      style={{ display: "none" }}
    />
  );
};

export default AwinFallbackPixel;