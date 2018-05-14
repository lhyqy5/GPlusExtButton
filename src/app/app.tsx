import * as React from "react";
import * as ReactDOM from "react-dom";
import GPlusButton from "./gpb";
import Utils from "./utils";

class GPlusButtonApp {
    public version: string;

    constructor() {
        this.checkVersion();
    }
    public appendBtn(btn1: Element): void {
        const postNode = Utils.queryParent(btn1, this.cardSelector) as Element;
        if (postNode.getAttribute("gpbed")) { return; }
        const div = document.createElement("div");
        const parent = btn1.parentNode as Element;
        const btns = parent.querySelectorAll(this.btnSelector);
        const btnIndex = this.version === "v1" ? 0 : 1;
        const locBtn = btns.item(btnIndex);
        parent.insertBefore(div, locBtn);

        ReactDOM.render(<GPlusButton  postNode={postNode} version={this.version}/>, div);
        postNode.setAttribute("gpbed", "1");
    }

    public watch(): void {
        console.log("watch...");

        // this.cardSelector.split(',').map(x=>`${x}:not([gpbed]) ${this.btnSelector}`).join(',');
        const selector = this.cardSelector.split(",").map((x) => `${x}:not([gpbed]) ${this.btnSelector}`).join(",");
        console.log(selector);

        Utils.watchElement(document, selector, (postNode) => this.appendBtn(postNode));
    }

    get cardSelector() {
        return this.version === "v1" ? "div[id^=update]" : "c-wiz.aJZAlb,div.m2bmxb";
    }

    get btnSelector() {
        return this.version === "v1" ? "div.Ut.Dg" : "div.oHo9me";
    }

    public checkVersion() {
        this.version = Utils.getPlusVersion();
    }
    // prepare():void {
    //     console.log("preparing..");
    //     const posts = document.querySelectorAll("div[id^=update]:not([gpbed]) div.Ut.Dg");
    //     for (let i = 0; i < posts.length; i++) {
    //         const post = posts[i];
    //         this.appendBtn(post);
    //     }
    // }

    public init() {

        this.watch();
        // this.prepare();
        console.log(`gpb inited,version:${this.version}`);
    }
}

export default GPlusButtonApp;
