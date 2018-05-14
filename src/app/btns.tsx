import PostInfo from "./post";
import Utils from "./utils";
export interface IGpbWidget {
    icon: string;
    tooltip: string;
    handleClick(postInfo: PostInfo);
    isVisible(postInfo: PostInfo);

}

class GpbWidget implements IGpbWidget {
    public config: any;
    constructor(config?) {
        this.config = config || {};
    }
    public handleClick(postInfo) {
        console.log("method handleClick not implement");
    }
    get icon() {
        if (this.config.icon) { return this.config.icon; }
        console.log("property get icon not implement");
        return null;
    }
    get tooltip() {
        if (this.config.tooltip) { return this.config.tooltip; }
        console.log("property get tooltip not implement");
        return null;
    }

    public isVisible(postInfo) {
        return true;
    }
}

// Image type button
class GpbImageWidget extends GpbWidget {
    public isVisible(postInfo) {
        return postInfo && postInfo.images && postInfo.images.length;
    }
}

// open image
class GpbOpenImages extends GpbImageWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/open.svg",
            tooltip: "open image",
        };
    }
    public handleClick(postInfo) {
        const imgs = postInfo.images;
        imgs.forEach((img) => window.open(img));
    }
}

// search image
class GpbSearchImages extends GpbImageWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/search.svg",
            tooltip: "search iamge by google image",
        };
    }
    public handleClick(postInfo) {
        const imgs = postInfo.images;
        imgs.forEach((img) => {
            const url = `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${encodeURIComponent(img)}`;
            window.open(url);
        });
    }
}

// download image
class GpbDownloadImages extends GpbImageWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/download.svg",
            tooltip: "download image",
        };
    }
    public handleClick(postInfo) {
        const imgs = postInfo.images;
        imgs.forEach((img) => {
            const dimg = img.replace("/s0/", "/d/");
            window.open(dimg);
        });
    }
}

// pinterest
class GpbPinterest extends GpbImageWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/pinterest.svg",
            tooltip: "pinterest",
        };
    }
    public handleClick(postInfo) {
        const imgs = postInfo.images;
        const urls = imgs.map((img) => `https://www.pinterest.com/pin/create/bookmarklet/?media=${encodeURIComponent(img)}&url=${encodeURIComponent(postInfo.url)}&alt=alt&title=${encodeURIComponent(postInfo.title)}&is_video=false`);
        urls.forEach((url) => {
            window.open(url, "_blank", "resizable=yes, scrollbars=yes, titlebar=yes, width=785, height=620, top=10, left=10");
        });
    }
}

class GpbImageDialog extends GpbImageWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/zoom.svg",
            tooltip: "zoom",
        };
    }
    public handleClick(postInfo: PostInfo) {
        let dialog: HTMLDialogElement = document.querySelector(".gpb-dialog");

        if (!dialog) {
            dialog = document.createElement("dialog");
            dialog.className = "gpb-dialog";
            const img = document.createElement("img");
            dialog.appendChild(img);
            dialog.onclick = () => {
                dialog.close();
            };
            img.onclick = (e) => {
                e.stopPropagation();
            };
            img.ondblclick = () => {
                dialog.close();
            };
            document.body.appendChild(dialog);
        }
        const img2 = dialog.querySelector("img");
        img2.src = postInfo.images[0];
        img2.onload = () => {
            dialog.showModal();
        };

    }
}

// copy post url
class GpbCopyUrlWidget extends GpbWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/copy.svg",
            tooltip: "copy post url",
        };
    }
    public handleClick(postInfo) {
        Utils.copyToClipboard(postInfo.url);
    }
}

class GpbOpenWidget extends GpbWidget {
    constructor(config?) {
        super(config);
        this.config = {
            icon: "images/copy.svg",
            tooltip: "open post url",
        };
    }
    public handleClick(postInfo) {
        window.open(postInfo.url);
    }
}
// export  const Provider= new Map([
//     ["copyUrl", new GpbCopyUrlWidget()],
//     ["openImages", new GpbOpenImages()],
//     ["downloadImages", new GpbDownloadImages()],
//     ["searchImages", new GpbSearchImages()],
//     ["pinterest", new GpbPinterest()],
// ])

export const Provider: IGpbWidget[] = [
    new GpbCopyUrlWidget(),
    new GpbOpenImages(),
    new GpbDownloadImages(),
    new GpbSearchImages(),
    new GpbPinterest(),
    new GpbImageDialog(),
];
