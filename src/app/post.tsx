import Utils from "./utils";

class PostInfo {
    private _postNode: Element;
    private _images: string[];
    private _link: any;
    private _imgSelector: string;
    constructor(postNode) {
        this._postNode = postNode;
    }
    get _imageSelector(): string {
        if (this._imgSelector) {
            return this._imgSelector;
        }
        if (Utils.getPlusVersion() === "v2") {
            return "img[src*=googleusercontent].JZUAbb,img[src*=googleusercontent].qRwspd.qnIxAe";
        } else {
            return "img[src*=googleusercontent].ar.Mc";
        }
    }
    get images(): string[] {
        if (this._images === undefined) {
            let images = [];
            const imgs = this._postNode.querySelectorAll(this._imageSelector);
            for (let i = 0; i < imgs.length; i++) {
                const img = imgs[i] as HTMLImageElement;
                images.push(img.src);
            }
            images = images.filter((o, i) => images.indexOf(o) === i);
            images = images.map((img) => img.replace(/\b[ws]\d+(-\w+)*\b/, "s0"));
            this._images = images;
            return this._images;
        } else {
            return this._images;
        }
    }

    public _loadLink() {
        if (this._link === undefined) {
            let selector = "span.uv.PL a";
            if (Utils.getPlusVersion() === "v2") {
                selector = "a.eZ8gzf,a.o8gkze";
            }
            const link: any = {};
            const postLink = this._postNode.querySelector(selector) as HTMLLinkElement;
            link.url = postLink.href;
            link.title = postLink.title;
            this._link = link;
            return this._link;
        } else {
            return this._link;
        }
    }
    get title(): string {
        return this._loadLink().title;
    }

    get url(): string {
        return this._loadLink().url;
    }
}

export default PostInfo;
