import View from "../sdk/view";

export default class TopAppBar implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _headline: HTMLHeadingElement = document.createElement("h1");
	private _subhead: HTMLElement = document.createElement("small");

	private _title: string;

	public constructor() {
		this._container.classList.add("mwm-element-topAppBar");

		this.headline = "";
		this._container.appendChild(this._headline);
	}

	public set headline(withTitle: string) {
		this._headline.textContent = withTitle;
		this._headline.appendChild(this._subhead);
	}

	public set subhead(withValue: string) {
		this._subhead.textContent = withValue;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
