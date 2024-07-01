import tags from "../html.ts";
import { IFrame } from '../frames.ts';

const { div, h1, meta, html, head, title, body } = tags;

const metaTag = (property: string, content: string) => {
    return meta({ property, content });
}

export const renderFrameMetaTags = function* (frame: IFrame) {
    yield metaTag('fc:frame', frame.version);
    yield metaTag('fc:frame:image', frame.image.urls[frame.image.aspectRatio || '1.91:1'] as string);
    yield metaTag('og:image', frame.image.urls['1.91:1']);
    yield metaTag('og:title', frame.title);

    if (frame.image?.aspectRatio) {
        yield metaTag('fc:frame:image:aspect_ratio', frame.image.aspectRatio);
    }

    if (frame.postUrl) {
        yield metaTag('fc:frame:post_url', frame.postUrl);
    }
    let idx = 1;
    for (const btn of frame.buttons || []) {
        yield metaTag(`fc:frame:button:${idx}`, btn.title);
        if (btn.action)
            yield metaTag(`fc:frame:button:${idx}:action`, btn.action);
        if (btn.target)
            yield metaTag(`fc:frame:button:${idx}:target`, btn.target);
        if (btn.postUrl)
            yield metaTag(`fc:frame:button:${idx}:post_url`, btn.postUrl);
        idx++;
    }

    if (frame.input?.text) {
        yield metaTag('fc:frame:input:text', frame.input.text);
    }

    if (frame.state) {
        yield metaTag('fc:frame:state', frame.state);
    }
};

export const frameView = (frame:IFrame) => {
    return html({}, 
        head({},
            title(frame.title),
            meta({ charset: "UTF-8" }),
            ...renderFrameMetaTags(frame),
        ),
        body({}, 
            div({},
                h1(frame.title)
            )
        )
    )
}