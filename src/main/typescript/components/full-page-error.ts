export default class FullPageError {
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

	public appendTo(parent: HTMLElement): void {
		var message = document.createElement("p");
		message.textContent = this._message;

		var container = document.createElement("div");
		container.appendChild(message);
		container.classList.add("mwm-component-fullPageError");

		while (parent.children.length > 0) {
			parent.removeChild(parent.children[0]);
		}
		parent.appendChild(container);
	}
}
