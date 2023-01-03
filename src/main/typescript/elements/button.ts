import { ButtonType } from "../enums/button-type";
import OnClickListener from "../listeners/on-click-listener";
import View from "../sdk/view";
import { SvgElement } from "../utils/svg-element";

export default class Button implements View {
	private _container: HTMLElement = document.createElement("button");
	private _label: HTMLElement = document.createElement("span");
	private _onClickListeners: Array<OnClickListener> = [];

	public constructor() {
		this.type = ButtonType.FILLED;

		this._container.classList.add("mwm-element-button");
		this._container.appendChild(this._label);
		this._container.addEventListener("click", (e) => this.click());
	}

	public set label(withLabel: string) {
		this._label.textContent = withLabel;
	}

	public set type(withType: ButtonType) {
		this._container.setAttribute("data-type", withType);
	}

	public set svg(withSvg: SvgElement) {
		while (this._container.childNodes.length) {
			this._container.removeChild(this._container.childNodes[0]);
		}
		this._container.appendChild(withSvg);
		this._container.appendChild(this._label);
	}

	public addOnClickListener(withListener: OnClickListener): void {
		this._onClickListeners.push(withListener);
	}

	public removeOnClickListener(withListener: OnClickListener): void {
		const index = this._onClickListeners.indexOf(withListener);
		if (index < 0) {
			throw new Error("OnClickListener not registered.");
		}

		this._onClickListeners = this._onClickListeners.splice(index, 1);
	}

	public click(): void {
		this._onClickListeners.forEach((listener) => listener.onClick(this));
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
