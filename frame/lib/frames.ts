import html from "./html.ts";
const { meta } = html;

type AspectRatio = '1.91:1' | '1:1'

interface IFrameImage {
    aspectRatio?: AspectRatio;
    urls: {
        '1.91:1': string,
        '1:1'?: string
    };

}

type FrameButtonActionType = 'post' | 'post_redirect' | 'link' | 'mint' | 'tx';

interface IFrameButton {
    action?: FrameButtonActionType;
    target?: string;
    postUrl?: string;
    title: string;
}

interface IFrameInput {
    text?: string;
}

export interface IFrame {
    version: '2020-01-01' | 'vNext';
    title: string;
    image: IFrameImage;
    input?: IFrameInput;
    state?: string;
    postUrl?: string;
    frameUrl?: string;
    buttons?: IFrameButton[];
}

