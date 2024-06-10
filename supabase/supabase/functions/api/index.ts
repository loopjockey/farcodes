import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { create } from "../shared/supapogo.ts";

import * as auth from "./routes/auth.ts";

const pogo = create('api')
  .withCors('*', 'authorization, x-client-info, apikey, Content-Type');

pogo.router.post("sign-in", auth.SignIn);

serve(async (req: Request) => {
  return await pogo.handle(req);
});