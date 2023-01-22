import View from "../sdk/view";

export default class WordedDivider implements View {
	private _container: HTMLElement = document.createElement("div");
	private _label: HTMLElement = document.createElement("span");

	public constructor(withLabel?: string) {
		this._container.classList.add("mwm-element-wordedDivider");
		this._container.appendChild(document.createElement("hr"));
		this._container.appendChild(this._label);
		this._container.appendChild(document.createElement("hr"));

		if (withLabel) {
			this.label = withLabel;
		}
	}

	public set label(withLabel: string) {
		this._label.textContent = withLabel;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
