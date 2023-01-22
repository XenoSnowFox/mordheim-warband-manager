import { InputType } from "../enums/input-type";
import View from "../sdk/view";
import uuid from "../utils/uuid";

export default class TextField implements View {
	private _id: string = uuid.random();
	private _container: HTMLDivElement = document.createElement("div");
	private _label: HTMLLabelElement = document.createElement("label");
	private _input: HTMLInputElement = document.createElement("input");

	public onChange: (withTextField: TextField) => void = () => {};

	public constructor() {
		this.inputType = InputType.TEXT;

		this._container.classList.add("mwm-element-textField");
		this._container.appendChild(this._input);
		this._container.appendChild(this._label);

		this._input.id = this._id;
		this._input.value = "";
		this._input.setAttribute("placeholder", " ");
		this._input.onchange = () => this.onChange(this);

		this._label.setAttribute("for", this._id);
	}

	public set label(withLabel: string) {
		this._label.textContent = withLabel;
	}

	public set value(withValue: string) {
		this._input.value = withValue;
	}

	public set inputType(withType: InputType) {
		this._input.type = withType;
	}

	public get value(): string {
		return this._input.value;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
