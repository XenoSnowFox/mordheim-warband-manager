import Button from "../elements/button";
import TextField from "../elements/text-field";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import { InputType } from "../enums/input-type";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import dom from "../utils/dom";
import ViewManager from "../utils/view-manager";

export default class EditWarbandView implements View {
	private _warband: WarbandModel;
	private _topAppBar: TopAppBar = new TopAppBar();
	private _nameTextField: TextField = new TextField();
	private _typeTextField: TextField = new TextField();
	private _warriorLimitTextField: TextField = new TextField();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _nameContainer: HTMLDivElement = document.createElement("div");
	private _typeContainer: HTMLDivElement = document.createElement("div");
	private _warriorLimitContainer: HTMLDivElement = document.createElement("div");

	public constructor(withWarband: WarbandModel) {
		this._warband = withWarband;

		this._topAppBar.headline = "Edit Warband";
		this._topAppBar.showBackButton = true;

		this._buttonDiv.classList.add("mwm-view-editWarband-buttons");
		this._nameContainer.classList.add("mwm-view-editWarband-container");
		this._typeContainer.classList.add("mwm-view-editWarband-container");
		this._warriorLimitContainer.classList.add("mwm-view-editWarband-container");
		this._disbandContainer.classList.add("mwm-view-editWarband-container");

		const createButton = new Button();
		createButton.label = "Save Changes";
		createButton.type = ButtonType.FILLED;
		createButton.addOnClickListener({ onClick: () => this.onSaveClicked() });
		createButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		this._nameTextField.label = "Warband Name";
		this._nameTextField.value = "" + withWarband.name;
		this._nameTextField.htmlElements().forEach((htmlElement) => this._nameContainer.appendChild(htmlElement));

		this._typeTextField.label = "Warband Type";
		this._typeTextField.value = "" + withWarband.type;
		this._typeTextField.htmlElements().forEach((htmlElement) => this._typeContainer.appendChild(htmlElement));

		this._warriorLimitTextField.label = "Warrior Limit";
		this._warriorLimitTextField.value = "" + withWarband.warriorLimit;
		this._warriorLimitTextField.inputType = InputType.NUMBER;
		this._warriorLimitTextField.htmlElements().forEach((htmlElement) => this._warriorLimitContainer.appendChild(htmlElement));

	}

	public onSaveClicked() {
		this._warband.name = this._nameTextField.value.trim();
		this._warband.type = this._typeTextField.value.trim();
		this._warband.warriorLimit = parseInt(this._warriorLimitTextField.value.trim() || "1");

		warbandRepository.store(this._warband);

		ViewManager.pop();
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [
			...this._topAppBar.htmlElements(),
			this._nameContainer,
			this._typeContainer,
			this._warriorLimitContainer,
			this._buttonDiv,
		];
	}
}
