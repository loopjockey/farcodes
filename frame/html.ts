export const _ = (type: string, props: any, ...children: any[]) => {
    return {
        type,
        props: {
            ...props,
            children: children.flat(), // Flatten nested arrays of children
        },
    };
};

// Define an enum for element types
enum ElementType {
    A = "a", ABBR = "abbr", ADDRESS = "address", AREA = "area", ARTICLE = "article", ASIDE = "aside", AUDIO = "audio", B = "b", BASE = "base", BDI = "bdi",
    BDO = "bdo", BLOCKQUOTE = "blockquote", BODY = "body", BR = "br", BUTTON = "button", CANVAS = "canvas", CAPTION = "caption", CITE = "cite", CODE = "code",
    COL = "col", COLGROUP = "colgroup", DATA = "data", DATALIST = "datalist", DD = "dd", DEL = "del", DETAILS = "details", DFN = "dfn", DIALOG = "dialog",
    DIV = "div", DL = "dl", DT = "dt", EM = "em", EMBED = "embed", FIELDSET = "fieldset", FIGCAPTION = "figcaption", FIGURE = "figure", FOOTER = "footer",
    FORM = "form", H1 = "h1", H2 = "h2", H3 = "h3", H4 = "h4", H5 = "h5", H6 = "h6", HEAD = "head", HEADER = "header", HR = "hr", HTML = "html", I = "i",
    IFRAME = "iframe", IMG = "img", INPUT = "input", INS = "ins", KBD = "kbd", LABEL = "label", LEGEND = "legend", LI = "li", LINK = "link", MAIN = "main",
    MAP = "map", MARK = "mark", META = "meta", METER = "meter", NAV = "nav", NOSCRIPT = "noscript", OBJECT = "object", OL = "ol", OPTGROUP = "optgroup",
    OPTION = "option", OUTPUT = "output", P = "p", PARAM = "param", PICTURE = "picture", PRE = "pre", PROGRESS = "progress", Q = "q", RB = "rb", RP = "rp",
    RT = "rt", RTC = "rtc", RUBY = "ruby", S = "s", SAMP = "samp", SCRIPT = "script", SECTION = "section", SELECT = "select", SLOT = "slot", SMALL = "small",
    SOURCE = "source", SPAN = "span", STRONG = "strong", STYLE = "style", SUB = "sub", SUMMARY = "summary", SUP = "sup", SVG = "svg", TABLE = "table",
    TBODY = "tbody", TD = "td", TEMPLATE = "template", TEXTAREA = "textarea", TFOOT = "tfoot", TH = "th", THEAD = "thead", TIME = "time", TITLE = "title",
    TR = "tr", TRACK = "track", U = "u", UL = "ul", VAR = "var", VIDEO = "video", WBR = "wbr"
}

const elementFunctions: { [key in ElementType]: (props: any, ...children: any[]) => any } = {} as any;

// Function generator
const fnGenerator = (type: ElementType) => (props: any, ...children: any[]) => _(type, props, ...children);

// Populate elementFunctions with functions for each enum value
Object.values(ElementType).forEach(type => {
    elementFunctions[type] = fnGenerator(type);
});

export default elementFunctions;
