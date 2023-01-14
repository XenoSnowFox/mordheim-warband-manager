import Element from "../sdk/element";
import View from "../sdk/view";
import dom from "../utils/dom";
import viewManager from "../utils/view-manager";

export default class BottomSheet implements Element {
	private _rootElement: HTMLDivElement = document.createElement("div");
	private _container: HTMLDivElement = document.createElement("div");
	private _title: HTMLHeadingElement = document.createElement("h2");

	public constructor() {
		this._rootElement.classList.add("mwm-element-bottomSheet");

		const wrapperElement = document.createElement("div");
		wrapperElement.classList.add("mwm-element-bottomSheet-wrapper");
		this._rootElement.appendChild(wrapperElement);

		wrapperElement.appendChild(this._title);

		this._container.classList.add("mwm-element-bottomSheet-container");
		wrapperElement.appendChild(this._container);

		this._rootElement.onclick = () => viewManager.pop();
		wrapperElement.onclick = (evt) => {
			evt.preventDefault();
			evt.stopPropagation();
		};
	}

	public get rootElement(): HTMLElement {
		return this._rootElement;
	}

	public set title(withTitle: string) {
		this._title.textContent = withTitle;
	}

	public appendNode(withNode: Node) {
		this._container.appendChild(withNode);
	}

	public appendView(withView: View) {
		dom.appendView(this._container, withView);
	}

	public onDismiss() {}
	public onShow() {}
}
