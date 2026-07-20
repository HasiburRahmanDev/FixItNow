import config from "../config";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = config.port;

// async function main() {
//   try {
//     await prisma.$connect();
//     app.listen(PORT, () => {
//       console.log(`server is running on ${PORT}`);
//     });
//   } catch (error) {
//     console.log("Error starting the server", error);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }
// main();
export default app;
