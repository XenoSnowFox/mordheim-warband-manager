import View from "../sdk/view";

export default {
	appendView(parent: HTMLElement, node: View) {
		node.htmlElements().forEach((htmlElement) => parent.appendChild(htmlElement));
	},
};
