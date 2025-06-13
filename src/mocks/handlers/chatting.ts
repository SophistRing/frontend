import { ws } from "msw";

const chat = ws.link("https://test.com");

export const chatHandlers = [
  chat.addEventListener("connection", () => {
    console.log("outgoing WebSocket connection");
  }),
  chat.addEventListener("connection", ({ client }) => {
    client.addEventListener("message", (event) => {
      console.log("from client:", event.data);
    });
  }),
  chat.addEventListener("connection", ({ client }) => {
    client.send("Hello from the server!");
  }),
];
