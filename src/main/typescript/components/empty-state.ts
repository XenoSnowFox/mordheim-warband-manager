import Button from "../elements/button";
import View from "../sdk/view";
import dom from "../utils/dom";
import svg from "../utils/svg";
import { SvgElement } from "../utils/svg-element";

export default class EmptyStateComponent implements View {
	private _svg: SvgElement = svg.blank();
	private _titleElement: HTMLParagraphElement = document.createElement("p");
	private _buttonContainer: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._buttonContainer.classList.add("mwm-component-emptyState-buttons");
	}

	public set svg(withSvg: SvgElement) {
		this._svg = withSvg;
	}

	public set title(withMessage: string) {
		this._titleElement.textContent = withMessage;
	}

	public addButton(withButton: Button) {
		dom.appendView(this._buttonContainer, withButton);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		var container = document.createElement("div");
		container.classList.add("mwm-component-emptyState");
		container.appendChild(this._svg);
		container.appendChild(this._titleElement);
		container.appendChild(this._buttonContainer);
		return [container];
	}
}
