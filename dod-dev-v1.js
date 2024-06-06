window.addEventListener(
  "message",
  (event) => {
    const { origin, data } = event;
    // NOTE: {origin} is platter's non-kms domain
    const acceptedOrigin = [
      "https://dod-dev.platter.id",
      "http://localhost:3001",
    ];

    const iframeID = "platter-popup-non-kms";

    if (acceptedOrigin.includes(origin)) {
      const { height, width } = data;
      console.log("Received message from allowed origin:", {
        origin,
        data,
        height,
        width,
      });

      const iframeEl = document.getElementById(iframeID);

      if (!iframeEl) {
        console.error(`Iframe with id '${iframeID}' not found`);
        return;
      }
      console.log(`Iframe with id '${iframeID}' found`, { iframeEl });

      // Initial iframe styling (make absolute)
      iframeEl.style.position = "fixed";
      iframeEl.style.bottom = "0px";
      iframeEl.style.right = "0px";
      iframeEl.style.border = "none";
      iframeEl.style.outline = "none";

      // Set Height and Width based on chatbox
      iframeEl.style.height = height;
      iframeEl.style.width = width;
      console.log(`Iframe resized to height: ${height}, width: ${width}`);
    } else {
      console.warn("Message received from untrusted origin:", origin);
    }
  },
  false
);
