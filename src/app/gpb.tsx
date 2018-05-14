import * as React from "react";
import * as Widgets from "./btns";
import PostInfo from "./post";
import Utils from "./utils";

class GPlusButton extends React.Component<any, any> {
    private widgets: Widgets.IGpbWidget[];
    private _postInfo: PostInfo;
    constructor(props, context) {
        super(props, context);

        this.handleBlur = this.handleBlur.bind(this);
        this.state = { open: false };
        this.widgets = Widgets.Provider;

    }

    public refs: {
        [string: string]: any;
        btn: HTMLDivElement;
        pop: HTMLDivElement;
    };

    public handleBlur() {
        this.setState({ open: false });
    }

    public componentDidMount() {
        this.refs.btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.showPopup();
        });
    }

    get postInfo() {
        if (this._postInfo === undefined) {
            const postNode = this.props.postNode;
            this._postInfo = new PostInfo(postNode);
        } else {
            return this._postInfo;
        }
    }

    public showPopup() {
        const pop = this.refs.pop;
        const btn = this.refs.btn;
        // let ps= Utils.getNodePosition(btn);
        // let locTop=ps[0];
        // let locLeft=ps[1];
        const locLeft = btn.offsetLeft;
        const locTop = btn.offsetTop;
        const oleft = this.props.version === "v1" ? 75 : 77;
        const otop = this.props.version === "v1" ? 10 : -80;
        pop.style.left = (locLeft - oleft) + "px";
        pop.style.top = (locTop + btn.clientHeight + otop) + "px";
        this.setState({ open: true });
        pop.focus();
    }

    public renderV1() {
        return (
            <div>
                <div ref="btn" className="Dg Ut" role="button" >
                    <span className="tf">
                        <span className="iI gpb-btn" style={{ width: "18px", height: "18px" }}></span>
                        <span className="MM jI"></span>
                    </span>
                </div>
                <div onBlur={this.handleBlur} tabIndex={0} ref="pop" style={{ display: this.state.open ? "block" : "none" }} className="gpb-pop">
                    <div className="gpb-ach" />
                    <div className="gpb-bct">
                        {this.widgets.map((widget, i) => {
                            return <a key={i}><img key={widget.tooltip} src={Utils.getImageUrl(widget.icon)}
                                style={{ display: widget.isVisible(this.postInfo) ? "inline-block" : "none" }}
                                onClick={widget.handleClick.bind(widget, this.postInfo)}
                                title={widget.tooltip} /></a>;
                        })}
                    </div>
                </div>
            </div>
        );
    }

    public renderV2() {
        return (
            <div>
                <div ref="btn" className="KRktze">
                    <span className="cUjEhd" aria-hidden="true"> no comments</span>
                    <div role="button" className="mUbCce fKz7Od GsLz7c M9Bg4d" aria-disabled="false">
                        <div className="VTBa7b MbhUzd"></div>
                        <content className="xjKiLb"><span style={{ top: -12 }}><div className="G7pzvd pdkqBe">
                            <svg viewBox="0 0 20 20" height="100%" width="100%">
                                <path d="M1.989,5.589c0,1.494,0.499,2.572,1.482,3.205c0.806,0.52,1.74,0.598,2.226,0.598c0.118,0,0.213-0.006,0.279-0.01	c0,0-0.154,1.004,0.59,1.996H6.532c-1.289,0-5.493,0.269-5.493,3.727c0,3.516,3.861,3.695,4.636,3.695	c0.061,0,0.097-0.002,0.097-0.002c0.008,0,0.063,0.002,0.158,0.002c0.497,0,1.782-0.062,2.975-0.643	c1.548-0.75,2.333-2.059,2.333-3.885c0-1.764-1.196-2.814-2.069-3.582c-0.533-0.469-0.994-0.873-0.994-1.266	c0-0.4,0.337-0.701,0.762-1.082c0.689-0.615,1.339-1.492,1.339-3.15c0-1.457-0.189-2.436-1.354-3.057	c0.121-0.062,0.551-0.107,0.763-0.137c0.631-0.086,1.554-0.184,1.554-0.699V1.2H6.64C6.594,1.202,1.989,1.372,1.989,5.589z	 M9.413,14.602c0.088,1.406-1.115,2.443-2.922,2.574c-1.835,0.135-3.345-0.691-3.433-2.096c-0.043-0.676,0.254-1.336,0.835-1.863	c0.589-0.533,1.398-0.863,2.278-0.928c0.104-0.006,0.207-0.012,0.31-0.012C8.18,12.278,9.33,13.276,9.413,14.602z M8.212,4.626	c0.451,1.588-0.23,3.246-1.316,3.553C6.771,8.214,6.643,8.231,6.512,8.231c-0.994,0-1.979-1.006-2.345-2.393	C3.963,5.062,3.98,4.38,4.214,3.726c0.229-0.645,0.643-1.078,1.163-1.225c0.125-0.035,0.254-0.053,0.385-0.053	C6.962,2.448,7.734,2.946,8.212,4.626z M16,8V5h-2v3h-3v2h3v3h2v-3h3V8H16z" />
                            </svg></div></span></content>
                    </div>
                </div>
                <div onBlur={this.handleBlur} tabIndex={0} ref="pop" style={{ display: this.state.open ? "block" : "none" }} className="gpb-pop">
                    <div className="gpb-ach" style={{ top: 30, transform: "rotate(225deg)" }} />
                    <div className="gpb-bct">
                        {this.widgets.map((widget, i) => {
                            return <a key={i}><img key={widget.tooltip} src={Utils.getImageUrl(widget.icon)}
                                style={{ display: widget.isVisible(this.postInfo) ? "inline-block" : "none" }}
                                onClick={widget.handleClick.bind(widget, this.postInfo)}
                                title={widget.tooltip} /></a>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
    public render() {
        if (this.props.version === "v2") {
            return this.renderV2();
        } else {
            return this.renderV1();
        }

    }
}

export default GPlusButton;
