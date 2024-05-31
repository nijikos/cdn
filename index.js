window.addEventListener(
  "message",
  (event) => {
    const { origin, data } = event;

    if (origin === "http://localhost:3001") {
      console.log("Received message from allowed origin:", { origin, data });

      const myIframe = document.getElementById("myIframe");
      if (!myIframe) {
        console.error("Iframe with id 'myIframe' not found.");
        return;
      }

      const { height, width } = data;

      if (height === "80px") {
        myIframe.style.transition = "none";
        console.log("Transition set to none for height 80px.");
      } else {
        myIframe.style.transition = "all 300ms";
        console.log("Transition set to 300ms.");
      }

      setTimeout(() => {
        myIframe.style.height = height;
        myIframe.style.width = width;
        console.log(`Iframe resized to height: ${height}, width: ${width}`);
      }, 200);
    } else {
      console.warn("Message received from untrusted origin:", origin);
    }
  },
  false
);
