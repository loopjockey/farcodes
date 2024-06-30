import { Hono } from "jsr:@hono/hono@^4.4.9";
import html2svg from "./lib/html2svg.ts";
import { baseView } from "./lib/views.ts";

// TODO: https://satori-playground.vercel.app/

const app = new Hono();

app.get("/", async () => {
  const svg = await html2svg(
    baseView()
  );
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
});
Deno.serve(app.fetch);
