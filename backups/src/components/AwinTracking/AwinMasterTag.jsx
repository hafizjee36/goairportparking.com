import { useEffect } from "react";

function AwinMasterTag() {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (document.getElementById("awin-master-tag")) return;

    const script = document.createElement("script");
    script.id = "awin-master-tag";
    script.src = "https://www.dwin1.com/123042.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Optional cleanup (usually you DON'T remove tracking scripts)
      // document.body.removeChild(script);
    };
  }, []);

  return null; // ✅ IMPORTANT
}

export default AwinMasterTag;

    // <script src="https://www.dwin1.com/123042.js" type="text/javascript" defer="defer"></script>