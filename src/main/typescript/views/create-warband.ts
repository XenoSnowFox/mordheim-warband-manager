import Button from "../elements/button";
import TextField from "../elements/text-field";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import { InputType } from "../enums/input-type";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import ViewManager from "../utils/view-manager";

export default class CreateWarbandView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();
	private _nameTextField: TextField = new TextField();
	private _typeTextField: TextField = new TextField();
	private _startingGoldTextField: TextField = new TextField();
	private _warriorLimitTextField: TextField = new TextField();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _nameContainer: HTMLDivElement = document.createElement("div");
	private _typeContainer: HTMLDivElement = document.createElement("div");
	private _startingGoldContainer: HTMLDivElement = document.createElement("div");
	private _warriorLimitContainer: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._topAppBar.headline = "Create Warband";

		this._buttonDiv.classList.add("mwm-view-createWarband-buttons");
		this._nameContainer.classList.add("mwm-view-createWarband-container");
		this._typeContainer.classList.add("mwm-view-createWarband-container");
		this._startingGoldContainer.classList.add("mwm-view-createWarband-container");
		this._warriorLimitContainer.classList.add("mwm-view-createWarband-container");

		const cancelButton = new Button();
		cancelButton.label = "Cancel";
		cancelButton.type = ButtonType.TONAL;
		cancelButton.addOnClickListener({ onClick: () => this.onCancelClick() });
		cancelButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		const createButton = new Button();
		createButton.label = "Create";
		createButton.type = ButtonType.FILLED;
		createButton.addOnClickListener({ onClick: () => this.onCreateClick() });
		createButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		this._nameTextField.label = "Warband Name";
		this._nameTextField.htmlElements().forEach((htmlElement) => this._nameContainer.appendChild(htmlElement));

		this._typeTextField.label = "Warband Type";
		this._typeTextField.htmlElements().forEach((htmlElement) => this._typeContainer.appendChild(htmlElement));

		this._startingGoldTextField.label = "Starting Gold Crowns";
		this._startingGoldTextField.value = "500";
		this._startingGoldTextField.inputType = InputType.NUMBER;
		this._startingGoldTextField.htmlElements().forEach((htmlElement) => this._startingGoldContainer.appendChild(htmlElement));

		this._warriorLimitTextField.label = "Warrior Limit";
		this._warriorLimitTextField.value = "15";
		this._warriorLimitTextField.inputType = InputType.NUMBER;
		this._warriorLimitTextField.htmlElements().forEach((htmlElement) => this._warriorLimitContainer.appendChild(htmlElement));
	}

	public onCancelClick() {
		ViewManager.pop();
	}

	public onCreateClick() {
		const warbandName = this._nameTextField.value;
		const warbandType = this._typeTextField.value;
		const startingGold = this._startingGoldTextField.value;
		const warriorLimit = this._warriorLimitTextField.value;

		// #TODO validate

		const warbandModel = new WarbandModel();
		warbandModel.name = warbandName;
		warbandModel.type = warbandType;
		warbandModel.warriorLimit = parseInt(warriorLimit);
		warbandModel.addGoldCrowns(parseInt(startingGold));

		warbandRepository.store(warbandModel);

		this.onCancelClick();

		// #TODO open warband view
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [
			...this._topAppBar.htmlElements(),
			this._nameContainer,
			this._typeContainer,
			this._startingGoldContainer,
			this._warriorLimitContainer,
			this._buttonDiv,
		];
	}
}
