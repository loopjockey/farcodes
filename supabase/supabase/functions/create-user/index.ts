import { create_jwt_for_fid } from "../shared/jwt.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.search);

  const fid = parseInt(queryParams.get("fid") || "0");

  const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //24hr
  const [jwt, error] = await create_jwt_for_fid(fid, "access-token", exp)

  return new Response(
    JSON.stringify(jwt),
    { headers: { "Content-Type": "application/json" } },
  )
})