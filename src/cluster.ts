import "dotenv/config";
import cluster from "cluster";
import { cpus } from "os";
import { server } from "./server";
import Users, { User } from "./models/userModel";

const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });

  cluster.on("message", async (worker, message) => {
    if (message.cmd in server) {
      const data = await server[message.cmd](...message.data);
      worker.send({ cmd: message.cmd, data });
    }
  });
} else {
  const worker = cluster.worker;
  if (worker) {
    server.listen(PORT, () => {
      console.log(
        `Worker ${process.pid} server running at http://localhost:${PORT}/`
      );
    });
    process.on("message", (message: User[]) => {
      // TODO: fix the error
      //   Users.users = message;
    });
  }
}
