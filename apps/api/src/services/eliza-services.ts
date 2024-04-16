import { HandlerContext, MethodImpl, ServiceImpl } from "@connectrpc/connect";
import { ElizaService, SayRequest } from "@skayfa/definition";
import { kUser } from "../user-context";

export class Eliza implements ServiceImpl<typeof ElizaService> {
  async say(req: SayRequest, ctx: HandlerContext) {
    console.log("ctx", ctx.values.get(kUser));
    // dd.db.insert(user).values({ name: "John Doe" });
    return {
      sentence: `You said ${req.sentence}`,
    };
  }
}

export const say: MethodImpl<typeof ElizaService.methods.say> = async (
  req,
  ctx
) => {
  console.log("ctx", ctx.values.get(kUser));
  return {
    sentence: `You said ${req.sentence}`,
  };
};
