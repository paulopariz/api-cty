import { server } from "./server/server";

server.listen(process.env.PORT || 3333, () =>
  console.log(`App na porta -> ${process.env.PORT || 3333}`)
);
