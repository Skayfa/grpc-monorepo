import zennv from "zennv";
import { z } from "zod";

export const env = zennv({
  dotenv: true,
  schema: z.object({
    DATABASE_URL: z.string().default("postgres://localhost:5432/drizzle"),
    PORT: z.number().default(4000),
    HOST: z.string().default("0.0.0.0"),
  }),
});
