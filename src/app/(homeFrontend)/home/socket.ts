// socket.js (or socket.ts)
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});
