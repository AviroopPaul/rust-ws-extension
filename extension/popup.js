import init, { greet } from "./wasm/rust_wasm_extension.js";

async function initialize() {
  try {
    await init();
    console.log("WASM initialized successfully");

    const greetButton = document.getElementById("greet");
    greetButton.addEventListener("click", async () => {
      const name = document.getElementById("name").value || "Anonymous";
      try {
        const wasmResult = greet(name);

        // Send to background script and wait for server response
        chrome.runtime.sendMessage(
          { type: "GREET", greeting: wasmResult },
          (response) => {
            if (response.error) {
              document.getElementById("output").innerText =
                "Error: " + response.error;
            } else {
              document.getElementById("output").innerText = response.response;
            }
          }
        );
      } catch (error) {
        console.error("Error calling greet function:", error);
        document.getElementById("output").innerText = "Error: " + error.message;
      }
    });
  } catch (error) {
    console.error("Failed to initialize WASM:", error);
    document.getElementById("output").innerText =
      "Failed to initialize WASM: " + error.message;
  }
}

document.addEventListener("DOMContentLoaded", initialize);
