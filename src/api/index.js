import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/");

export const suscribeReaders = (handler = () => {}) => {
  socket.on("readers", handler);
}

export const suscribeCaptures = (handler = () => {}) => {
  socket.on("captures", handler);
}