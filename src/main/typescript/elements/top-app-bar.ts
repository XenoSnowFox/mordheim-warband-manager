import View from "../sdk/view";

export default class TopAppBar implements View {
	private _title: string;

	public constructor() {
		this._title = "";
	}

	public set title(withTitle: string) {
		this._title = withTitle;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		var message = document.createElement("h1");
		message.textContent = this._title;

		var container = document.createElement("header");
		container.appendChild(message);
		container.classList.add("mwm-element-topAppBar");

		return [container];
	}
}
