let ws = null;

function connectWebSocket() {
  ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
    // Attempt to reconnect after 5 seconds
    setTimeout(connectWebSocket, 5000);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

connectWebSocket();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GREET") {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message.greeting);

      // Wait for server response
      ws.onmessage = (event) => {
        sendResponse({ response: event.data });
      };

      return true; // Will respond asynchronously
    } else {
      sendResponse({ error: "WebSocket not connected" });
    }
  }
});
