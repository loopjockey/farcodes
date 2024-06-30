import satori from "npm:satori";
import { ReactNode } from 'npm:react'

const fetchRobotoFont = fetch(
    "https://f005.backblazeb2.com/file/farcodes/Roboto-Regular.ttf",
  ).then((r) => r.arrayBuffer());

export default async (html: ReactNode) => {
    return await satori(
        html,
        {
            width: 840,
            height: 400,
            fonts: [
                {
                    name: "Roboto",
                    data: await fetchRobotoFont,
                    weight: 400,
                    style: "normal",
                },
            ],
        },
    );
};
