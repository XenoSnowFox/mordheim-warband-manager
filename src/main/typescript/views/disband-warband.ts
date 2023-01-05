import Button from "../elements/button";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import ViewManager from "../utils/view-manager";

export default class DisbandWarbandView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _container: HTMLDivElement = document.createElement("div");

	public constructor(withWarband: WarbandModel) {
		this._topAppBar.headline = "Disband Warband";

		this._buttonDiv.classList.add("mwm-view-disbandWarband-buttons");
		this._container.classList.add("mwm-view-disbandWarband-container");

		this._container.appendChild(this.p("This action will permanently erase this warband's information."));
		this._container.appendChild(this.p("Once erased it cannot be recovered."));

		const cancelButton = new Button();
		cancelButton.label = "Cancel";
		cancelButton.type = ButtonType.TONAL;
		cancelButton.addOnClickListener({
			onClick: () => {
				ViewManager.pop();
			},
		});
		cancelButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		const confirmButton = new Button();
		confirmButton.label = "Disband";
		confirmButton.type = ButtonType.FILLED;
		confirmButton.addOnClickListener({
			onClick: () => {
				warbandRepository.delete(withWarband.id);
				window.location.reload();
			},
		});
		confirmButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));
	}

	private p(withText: string): HTMLParagraphElement {
		const p = document.createElement("p");
		p.textContent = withText;
		return p;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), this._container, this._buttonDiv];
	}
}
