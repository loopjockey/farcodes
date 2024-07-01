import { Hono } from "jsr:@hono/hono@^4.4.9";
import html2svg from "./lib/html2svg.ts";
import svg2png from "./lib/svg2png.ts";
import { programView } from "./lib/views/index.ts";
import { frameView } from "./lib/views/frameView.ts";
import { IFrame } from "./lib/frames.ts";

const app = new Hono();

app.get("/uber-eats", () => {
  const frame: IFrame = {
    title: "Far.Codes x Uber Eats",
    buttons: [
      { title: "Get Code" },
      { title: "My Code" },
    ],
    image: {
      urls: {
        "1.91:1": "/i/uber-eats",
      },
    },
    version: "vNext",
  };
  return new Response(frameView(frame), {
    headers: { "Content-Type": "text/html" },
  });
});

app.get("/i/uber-eats", async (r) => {
  const acceptType = r.req.header("Accept") || "image/png";
  const svg = await html2svg(
    programView({
      programName: "Uber Eats".toUpperCase(),
      programDescription:
        "Uber Eats is an American online food ordering and delivery platform launched by Uber.",
      programAvatarUrl:
        "https://logodownload.org/wp-content/uploads/2019/05/uber-eats-logo-1.png",
      refereeBonus: "$10",
      referrerBonus: "$10",
    }),
  );
  if (acceptType === "image/svg+xml") {
    return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
  }
  const png = await svg2png(svg);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
});

Deno.serve(app.fetch);
