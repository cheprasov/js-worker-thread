
export const objectUrlMap: Map<string, string> = new Map();

export default class BlobFileFactory {

    static createJavaScriptObjectUrl(content: string, useCache: boolean = true): string {
        if (useCache && objectUrlMap.has(content)) {
            return objectUrlMap.get(content);
        }
        const blob = new Blob([content], { type: 'text/javascript' });
        const objectUrl = URL.createObjectURL(blob);
        if (useCache) {
            objectUrlMap.set(content, objectUrl);
        }
        return objectUrl;
    }

}
