import View from "../sdk/view";

export default class FullPageError implements View {
	public static withMessage(withMessage: string): FullPageError {
		const fullPageError = new FullPageError();
		fullPageError.message = withMessage;
		return fullPageError;
	}

	private _message: string;

	public constructor() {
		this._message = "";
	}

	public set message(withMessage: string) {
		this._message = withMessage;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		var message = document.createElement("p");
		message.textContent = this._message;

		var container = document.createElement("div");
		container.appendChild(message);
		container.classList.add("mwm-component-fullPageError");

		return [container];
	}
}
