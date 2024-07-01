import { Resvg } from "npm:@resvg/resvg-js";
import { getRobotoFont } from "./fonts.ts";

export default async (svg: string) => {
    const resvg = new Resvg(svg, {
        background: "#000",
        fitTo: {
            mode: "width",
            value: 840,
        },
        font: {
            fontBuffers: [new Uint8Array(await getRobotoFont())],
            loadSystemFonts: false,
        },
        logLevel: "debug",
    } as any);
    return resvg
        .render()
        .asPng();
};
