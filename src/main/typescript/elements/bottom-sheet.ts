import Element from "../sdk/element";
import View from "../sdk/view";
import dom from "../utils/dom";
import viewManager from "../utils/view-manager";

export default class BottomSheet implements Element {
	public rootElement: HTMLDivElement = document.createElement("div");
	public container: HTMLDivElement = document.createElement("div");

	public constructor() {
		this.rootElement.classList.add("mwm-element-bottomSheet");
		this.container.classList.add("mwm-element-bottomSheet-container");

		this.rootElement.appendChild(this.container);

		this.rootElement.onclick = () => viewManager.pop();
		this.container.onclick = (evt) => {
			evt.preventDefault();
			evt.stopPropagation();
		};
	}

	public appendNode(withNode: Node) {
		this.container.appendChild(withNode);
	}

	public appendView(withView: View) {
		dom.appendView(this.container, withView);
	}

	public onDismiss() {}
	public onShow() {}
}
