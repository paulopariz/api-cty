import express from "express";

const server = express();

server.get("/", (req, res) => {
  return res.send("OBA, BÃO?");
});

export { server };
