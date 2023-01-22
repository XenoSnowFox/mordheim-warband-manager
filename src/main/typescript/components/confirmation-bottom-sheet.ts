import BottomSheet from "../elements/bottom-sheet";
import Button from "../elements/button";

export default class ConfirmationBottomSheet extends BottomSheet {
	private _message = document.createElement("p");

	private _button = new Button();

	public onConfirmation: () => void = () => {};

	public constructor() {
		super();

		this.rootElement.classList.add("mwm-component-confirmationBottomSheet");

		this.title = "Confirmation";
		this._button.label = "Confirm";

		this.appendNode(this._message);
		this.appendNode(document.createElement("br"));
		this.appendView(this._button);

		this._button.onClick = () => this.onConfirmation();
	}

	public set textContent(withMessage: string) {
		this._message.textContent = withMessage;
	}

	public set buttonLabel(withLabel: string) {
		this._button.label = withLabel;
	}
}
