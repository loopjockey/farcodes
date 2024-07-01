import { Hono } from "jsr:@hono/hono@^4.4.9";
import html2svg from "./lib/html2svg.ts";
import { baseView } from "./lib/views.ts";

// TODO: https://satori-playground.vercel.app/

const app = new Hono();

app.get("/", async () => {
  const svg = await html2svg(
    baseView({
      programName: "Uber Eats".toUpperCase(),
      programDescription: "Uber Eats is an American online food ordering and delivery platform launched by Uber.",
      programAvatarUrl: "https://logodownload.org/wp-content/uploads/2019/05/uber-eats-logo-1.png",
      refereeBonus: "$10",
      referrerBonus: "$10",
    }),
  );
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
});
Deno.serve(app.fetch);
