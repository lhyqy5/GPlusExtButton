class Utils {
    public static getImageUrl(path: string): string {
        return chrome.extension.getURL(path);
    }

    public static copyToClipboard(text: string): void {
        chrome.runtime.sendMessage({
            type: "copy",
            text,
        });
    }

    public static queryParent(target: Node, selector: string): Node {
        let parent = target;
        do {
            parent = parent.parentNode;
            const el = parent as Element;
            if (el && el.matches(selector)) {
                return parent;
            }
        } while (parent && parent !== document);
    }

    public static watchElement(target: Node, selector: string, cb: (node: Element) => void, watchOne?: boolean): void {
        let observer: MutationObserver;

        const callback = (el: Element) => {
            // tslint:disable-next-line:no-unused-expression
            cb && cb(el);
            if (watchOne) {
                observer.disconnect();
                cb = null;
            }

        };

        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                for (let i = 0; i < mutation.addedNodes.length; i++) {

                    const node = mutation.addedNodes[i] as Element;
                    if (node && node.matches && node.matches(selector)) {
                        callback(node);
                    } else if (node && node.querySelector) {
                        const childs = node.querySelectorAll(selector);
                        for (let j = 0; j < childs.length; j++) {
                            const child = childs[j];
                            callback(child);
                        }
                    }
                }
            });
        });

        const config = { childList: true, subtree: true };
        observer.observe(target, config);
    }

    public static getNodePosition(node: HTMLElement) {
        let top = 0;
        let left = 0;
        while (node) {
            if (node.tagName) {
                top = top + node.offsetTop;
                left = left + node.offsetLeft;
                node = node.offsetParent as HTMLElement;
            } else {
                node = node.parentNode as HTMLElement;
            }
        }
        return [top, left];
    }

    public static getPlusVersion(): string {
        const test = document.cookie.match(/GPLUS_UI_BETA=2/);
        if (test) {
            return "v1";
        } else {
            return "v2";
        }
    }
}

export default Utils;
