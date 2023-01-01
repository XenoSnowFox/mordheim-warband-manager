import View from "../sdk/view";

export default class TestView implements View {
	public onDomLoad() {
		console.log("DOM LOADED");
	}

	public onDomUnload() {
		console.log("DOM UNLOADED");
	}

	public htmlElements(): Array<HTMLElement> {
		const e = document.createElement("p");
		e.textContent = "Hello World";
		return [e];
	}
}
