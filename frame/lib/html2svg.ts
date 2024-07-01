import satori from "npm:satori";
import { ReactNode } from 'npm:react'
import { getRobotoFont } from './fonts.ts';

export default async (html: ReactNode) => {
    return await satori(
        html,
        {
            width: 840,
            height: 400,
            fonts: [
                {
                    name: "Roboto",
                    data: await getRobotoFont(),
                    weight: 400,
                    style: "normal",
                },
            ]
        },
    );
};
