let robotoFont: ArrayBuffer | null = null;
export const getRobotoFont = async ():Promise<ArrayBuffer> => {
    if (robotoFont) return robotoFont;
    const response = await fetch(
        "https://f005.backblazeb2.com/file/farcodes/Roboto-Regular.ttf",
    );
    robotoFont = await response.arrayBuffer();
    return robotoFont;
};
