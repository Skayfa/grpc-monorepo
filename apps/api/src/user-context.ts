import { createContextKey } from "@connectrpc/connect";

type User = { name: string };

const kUser = createContextKey<User>(
  { name: "Anonymous" } // Default value
);

export { kUser };
