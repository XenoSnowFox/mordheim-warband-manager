import UnitStatsModel from "../models/unit-stats";
import View from "../sdk/view";

export default class UnitStatsGridView implements View {
	private _container: HTMLDivElement = document.createElement("div");

	private _movementUnits: HTMLSpanElement = this.createCell("0");
	private _weaponSkillUnits: HTMLSpanElement = this.createCell("0");
	private _ballisticSkillUnits: HTMLSpanElement = this.createCell("0");
	private _strengthUnits: HTMLSpanElement = this.createCell("0");
	private _toughnessUnits: HTMLSpanElement = this.createCell("0");
	private _woundsUnits: HTMLSpanElement = this.createCell("0");
	private _initiativeUnits: HTMLSpanElement = this.createCell("0");
	private _attackUnits: HTMLSpanElement = this.createCell("0");
	private _leadershipUnits: HTMLSpanElement = this.createCell("0");

	public constructor() {
		this._container.classList.add("mwm-component-unitStatsGrid");

		// headings
		this._container.appendChild(this.createCell("M"));
		this._container.appendChild(this.createCell("WS"));
		this._container.appendChild(this.createCell("BS"));
		this._container.appendChild(this.createCell("S"));
		this._container.appendChild(this.createCell("T"));
		this._container.appendChild(this.createCell("W"));
		this._container.appendChild(this.createCell("I"));
		this._container.appendChild(this.createCell("A"));
		this._container.appendChild(this.createCell("Ld"));

		// current values
		this._container.appendChild(this._movementUnits);
		this._container.appendChild(this._weaponSkillUnits);
		this._container.appendChild(this._ballisticSkillUnits);
		this._container.appendChild(this._strengthUnits);
		this._container.appendChild(this._toughnessUnits);
		this._container.appendChild(this._woundsUnits);
		this._container.appendChild(this._initiativeUnits);
		this._container.appendChild(this._attackUnits);
		this._container.appendChild(this._leadershipUnits);
	}

	private createCell(withText: string): HTMLElement {
		const cell = document.createElement("div");
		cell.textContent = withText;
		return cell;
	}

	public set stats(withStats: UnitStatsModel) {
		this._movementUnits.textContent = "" + withStats.movement;
		this._weaponSkillUnits.textContent = "" + withStats.weaponSkill;
		this._ballisticSkillUnits.textContent = "" + withStats.ballisticSkill;
		this._strengthUnits.textContent = "" + withStats.strength;
		this._toughnessUnits.textContent = "" + withStats.toughness;
		this._woundsUnits.textContent = "" + withStats.wounds;
		this._initiativeUnits.textContent = "" + withStats.initiative;
		this._attackUnits.textContent = "" + withStats.attack;
		this._leadershipUnits.textContent = "" + withStats.leadership;
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
