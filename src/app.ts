import { resolve } from "path";
import * as dotenv from "dotenv";
import { server } from "./server";

const normalizePort = (value: string) => {
  const port = parseInt(value, 10);
  if (isNaN(port)) return value;
  if (port >= 0) return port;
  return false;
};

const envPath = resolve(process.cwd(), ".env");

dotenv.config({ path: envPath });

const PORT = normalizePort(process.env.PORT || "4000");

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`);
});
