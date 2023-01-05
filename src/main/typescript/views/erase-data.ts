import Button from "../elements/button";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import ViewManager from "../utils/view-manager";

export default class EraseDataView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _container: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._topAppBar.headline = "Erase Data";

		this._buttonDiv.classList.add("mwm-view-eraseData-buttons");
		this._container.classList.add("mwm-view-eraseData-container");

		this._container.appendChild(this.p("This action will permanently erase all your warband information."));
		this._container.appendChild(this.p("Once erased it cannot be recovered."));

		const cancelButton = new Button();
		cancelButton.label = "Cancel";
		cancelButton.type = ButtonType.TONAL;
		cancelButton.addOnClickListener({ onClick: () => this.onCancelClick() });
		cancelButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		const confirmButton = new Button();
		confirmButton.label = "Erase";
		confirmButton.type = ButtonType.FILLED;
		confirmButton.addOnClickListener({ onClick: () => this.onEraseClick() });
		confirmButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));
	}

	private p(withText: string): HTMLParagraphElement {
		const p = document.createElement("p");
		p.textContent = withText;
		return p;
	}

	public onCancelClick() {
		ViewManager.pop();
	}

	public onEraseClick() {
		warbandRepository.eraseAll();
		ViewManager.pop();
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), this._container, this._buttonDiv];
	}
}
