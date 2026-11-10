const urlInput = document.querySelector("#server-url");
const connectButton = document.querySelector("#connect-button");
const sendButton = document.querySelector("#send-button");
const chatForm = document.querySelector("#chat-form");
const promptInput = document.querySelector("#prompt");
const messages = document.querySelector("#messages");
const connection = document.querySelector("#connection");

let connected = false;
let conversation = [];

function baseUrl() {
  return urlInput.value.trim().replace(/\/+$/, "");
}

function setConnection(isOnline, label) {
  connected = isOnline;
  connection.textContent = label;
  connection.className = "status " + (isOnline ? "online" : "offline");
  sendButton.disabled = !isOnline;
}

function addMessage(role, content) {
  const item = document.createElement("article");
  item.className = "message " + (role === "user" ? "user" : "nexus");
  const speaker = document.createElement("span");
  speaker.className = "speaker";
  speaker.textContent = role === "user" ? "YOU" : "NEXUS";
  const body = document.createElement("p");
  body.textContent = content;
  item.append(speaker, body);
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}

async function testConnection() {
  setConnection(false, "Connecting…");
  connectButton.disabled = true;
  try {
    const response = await fetch(baseUrl() + "/health");
    if (!response.ok) throw new Error("Server returned HTTP " + response.status);
    setConnection(true, "Local model online");
    addMessage("assistant", "Connected to the local llama.cpp server.");
  } catch (error) {
    setConnection(false, "Not connected");
    addMessage("assistant", "Could not connect. Check that llama-server is running and that the address is correct. Details: " + error.message);
  } finally {
    connectButton.disabled = false;
  }
}

async function sendMessage(event) {
  event.preventDefault();
  const content = promptInput.value.trim();
  if (!content || !connected) return;

  promptInput.value = "";
  conversation.push({ role: "user", content });
  addMessage("user", content);
  sendButton.disabled = true;

  try {
    const response = await fetch(baseUrl() + "/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: conversation,
        temperature: 0.7,
        max_tokens: 180,
        stream: false
      })
    });
    if (!response.ok) throw new Error("Model request failed with HTTP " + response.status);
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) throw new Error("The server returned an empty response.");
    conversation.push({ role: "assistant", content: answer });
    addMessage("assistant", answer);
  } catch (error) {
    conversation.pop();
    addMessage("assistant", "I couldn't complete that request: " + error.message);
  } finally {
    sendButton.disabled = !connected;
  }
}

connectButton.addEventListener("click", testConnection);
chatForm.addEventListener("submit", sendMessage);
sendButton.disabled = true;
