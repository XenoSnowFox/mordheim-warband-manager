import { CardType } from "../enums/card-type";
import OnClickListener from "../listeners/on-click-listener";
import View from "../sdk/view";

export default class Card implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _content: HTMLDivElement = document.createElement("div");
	private _headline: HTMLSpanElement = document.createElement("span");
	private _subhead: HTMLSpanElement = document.createElement("span");

	private _onClickListeners: Array<OnClickListener> = [];

	public constructor() {
		this.type = CardType.OUTLINED;

		this._container.classList.add("mwm-element-card");
		this._container.appendChild(this._content);
		this._container.addEventListener("click", (evt) => this.click());

		this._headline.classList.add("mwm-element-card-headline");

		this._subhead.classList.add("mwm-element-card-subhead");

		this._content.classList.add("mwm-element-card-content");
		this._content.appendChild(this._headline);
		this._content.appendChild(this._subhead);
	}

	public set type(withType: CardType) {
		this._container.setAttribute("data-type", withType);
	}

	public set headline(withHeadline: string) {
		this._headline.textContent = withHeadline;
	}

	public set subhead(withSubhead: string) {
		this._subhead.textContent = withSubhead;
	}

	public appendChild(withNode: HTMLElement) {
		this._content.appendChild(withNode);
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
