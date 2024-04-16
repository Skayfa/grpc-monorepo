import type { ConnectRouter } from "@connectrpc/connect";
import { AuthenticationService, ElizaService } from "@skayfa/definition";
import { Eliza } from "./services/eliza-services";
import { login, logout } from "./services/auth-service";

export default (router: ConnectRouter) => {
  router.service(ElizaService, new Eliza());
  router.service(AuthenticationService, {
    login,
    logout,
  });
};
