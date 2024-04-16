dotenv.config();
import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { Interceptor, cors, createContextValues } from "@connectrpc/connect";
import * as dotenv from "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import routes from "./connect.js";
import { kUser } from "./user-context.js";
import { logger } from "./utils/loggers.js";
import { db } from "./database/index.js";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

function buildServer() {
  const server = fastify({
    logger,
    pluginTimeout: 10000,
  });
  return server;
}

async function main() {
  const server = buildServer();
  // console.log("db", db);
  // await migration();
  await server.register(fastifyCors, {
    origin: CORS_ORIGIN,
    methods: [...cors.allowedMethods],
    allowedHeaders: [...cors.allowedHeaders, "Custom-Request-Header"],
    exposedHeaders: [
      ...cors.exposedHeaders,
      "Custom-Response-Header",
      "Trailer-Response-Id",
    ],
    // Let browsers cache CORS information to reduce the number of
    // preflight requests. Modern Chrome caps the value at 2h.
    maxAge: 2 * 60 * 60,
  });
  await server.register(fastifyConnectPlugin, {
    routes,
    // interceptors: [logger],
    contextValues: (req) => createContextValues().set(kUser, { name: "Alice" }),
  });

  server.get("/", (_, reply) => {
    reply.type("text/plain");
    reply.send("Hello World!");
  });

  await server.listen({ host: "localhost", port: 8080 });

  await migrate(db, {
    migrationsFolder: "./drizzle",
  });

  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      await gracefulShutdown({ app: server });
    });
  }
}
// You can remove the main() wrapper if you set type: module in your package.json,
// and update your tsconfig.json with target: es2017 and module: es2022.
void main();

async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
  // process.exit(0);
}
