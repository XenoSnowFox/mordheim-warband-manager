import { TopAppBarStyle } from "../enums/top-app-bar-style";
import View from "../sdk/view";
import svg from "../utils/svg";
import { SvgElement } from "../utils/svg-element";
import viewManager from "../utils/view-manager";

export default class TopAppBar implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _headline: HTMLHeadingElement = document.createElement("h1");
	private _subhead: HTMLElement = document.createElement("small");
	private _leftActions: HTMLDivElement = document.createElement("div");
	private _rightActions: HTMLDivElement = document.createElement("div");
	private _back: SvgElement = svg.arrowBack();

	private _title: string;
	private _showBackButton: boolean = false;

	public constructor() {
		this._container.classList.add("mwm-element-topAppBar");
		this._leftActions.classList.add("mwm-element-topAppBar-actions");
		this._rightActions.classList.add("mwm-element-topAppBar-actions");

		this.headline = "";

		this._container.appendChild(this._leftActions);
		this._container.appendChild(this._headline);
		this._container.appendChild(this._rightActions);

		this._back.addEventListener("click", () => viewManager.pop());
	}

	public set style(withStyle: TopAppBarStyle) {
		this._container.setAttribute("data-style", withStyle);
	}

	public set headline(withTitle: string) {
		this._headline.textContent = withTitle;
		this._headline.appendChild(this._subhead);
	}

	public set subhead(withValue: string) {
		this._subhead.textContent = withValue;
	}

	public set showBackButton(withValue: boolean) {
		this._showBackButton = !!withValue;

		while (this._leftActions.childNodes.length) {
			this._leftActions.removeChild(this._leftActions.childNodes[0]);
		}

		if (this._showBackButton) {
			this._leftActions.appendChild(this._back);
		}
	}

	public addAction(withSvg: SvgElement) {
		this._rightActions.appendChild(withSvg);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
