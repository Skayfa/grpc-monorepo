import { MethodImpl } from "@connectrpc/connect";
import { AuthenticationService } from "@skayfa/definition";
import { kUser } from "../user-context";

export const login: MethodImpl<
  typeof AuthenticationService.methods.login
> = async (req, ctx) => {
  ctx.values.set(kUser, { name: req.username });
  return {
    token: "pojij",
  };
};

export const logout: MethodImpl<
  typeof AuthenticationService.methods.logout
> = async (req, ctx) => {
  ctx.values.set(kUser, { name: "Anonymous" });
  return {};
};
