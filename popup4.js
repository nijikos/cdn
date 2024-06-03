window.addEventListener(
  "message",
  (event) => {
    const { origin, data } = event;
    // origin should only be from platter's non-kms domain
    if (origin === "https://dod-dev.platter.id") {
      console.log("Received message from allowed origin:", { origin, data });

      const platterPopupIframe = document.getElementById(
        "platter-popup-non-kms"
      );
      if (!platterPopupIframe) {
        console.error("Iframe with id 'platter-popup-non-kms' not found.");
        return;
      }
      console.log("Document get element by IDplatterPopupIframe", {
        platterPopupIframe,
      });
      platterPopupIframe.style.position = "absolute";
      platterPopupIframe.style.bottom = "0px";
      platterPopupIframe.style.right = "0px";

      const { height, width } = data;
      console.log("---- CDN popup.js received Message data :", {
        height,
        width,
      });

      if (height === "80px") {
        platterPopupIframe.style.transition = "none";
        console.log("Transition set to none for height 80px.");
      } else {
        platterPopupIframe.style.transition = "all 300ms";
        console.log("Transition set to 300ms.");
      }

      setTimeout(() => {
        platterPopupIframe.style.height = height;
        platterPopupIframe.style.width = width;
        console.log(`Iframe resized to height: ${height}, width: ${width}`);
      }, 200);
    } else {
      console.warn("Message received from untrusted origin:", origin);
    }
  },
  false
);
