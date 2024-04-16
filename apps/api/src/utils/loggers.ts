import pino from "pino";

export const logger = pino({
  level: "debug",
  redact: ["DATABASE_URL"],
  transport: {
    target: "pino-pretty",
  },
});
