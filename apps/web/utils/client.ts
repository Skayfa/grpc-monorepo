import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthenticationService, ElizaService } from "@skayfa/definition";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
  // Not needed. Web browsers use HTTP/2 automatically.
  // httpVersion: "1.1"
});

const client = {
  eliza: createPromiseClient(ElizaService, transport),
  auth: createPromiseClient(AuthenticationService, transport),
};

export default client;
