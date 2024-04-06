import type { ConnectRouter } from "@connectrpc/connect";
import { ElizaService, TestService } from "@skayfa/definition";

export default (router: ConnectRouter) => {
  // registers connectrpc.eliza.v1.ElizaService
  router.service(ElizaService, {
    // implements rpc Say
    async say(req) {
      return {
        sentence: `You said: ${req.sentence}`,
      };
    },
  });
  router.service(TestService, {
    // implements rpc Say
    async say(req) {
      return {
        sentence: `You saidss: ${req.sentence}`,
      };
    },
  });
};
