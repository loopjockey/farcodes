import { Hono } from "jsr:@hono/hono@^4.4.9";
import satori from "npm:satori";
import html from "./html.ts";

const { div, a } = html;

const app = new Hono();

const fetchRobotoFont = fetch(
  "https://f005.backblazeb2.com/file/farcodes/Roboto-Regular.ttf",
).then((r) => r.arrayBuffer());

app.get("/", async () => {
  const svg = await satori(
    div({ style: { color: "black", display: "flex" },  }, 
      a({ color: "black" }, "What's bitconnect!!")
    ), {
    width: 600,
    height: 400,
    fonts: [
      {
        name: "Roboto",
        data: await fetchRobotoFont,
        weight: 400,
        style: "normal",
      },
    ],
  });
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
});

Deno.serve(app.fetch);
