import AssistChip from "../elements/assist-chip";
import { WarbandDesignation } from "../enums/warband-designation";
import View from "../sdk/view";
import dom from "../utils/dom";
import svg from "../utils/svg";

const HERO_MILESTONES = [2, 4, 6, 8, 11, 14, 17, 20, 24, 28.32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90];
const HENCHMEN_MILESTONES = [2, 5, 9, 14];

export default class ExperienceGrid implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _heading: HTMLDivElement = document.createElement("div");
	private _counter: AssistChip = new AssistChip();

	private _experience: number = 0;
	private _designation: WarbandDesignation = WarbandDesignation.LEADER;

	private _grid: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._container.classList.add("mwm-component-experienceGrid");

		this._counter.label = "0";
		this._counter.svg = svg.school();

		this._heading.classList.add("mwm-component-experienceGrid-heading");
		const headingLabel = document.createElement("span");
		headingLabel.textContent = "Experience";
		this._heading.appendChild(headingLabel);
		dom.appendView(this._heading, this._counter);
		this._container.appendChild(this._heading);

		this._grid.classList.add("mwm-component-experienceGrid-grid");
		this._container.appendChild(this._grid);
	}

	public set experience(withAmount: number) {
		this._experience = withAmount;
		this._counter.label = "" + withAmount;
		this.rerenderGrid();
	}

	public set designation(withDesignation: WarbandDesignation) {
		this._designation = withDesignation;
		this.rerenderGrid();
	}

	private rerenderGrid() {
		while (this._grid.childNodes.length) {
			this._grid.removeChild(this._grid.childNodes[0]);
		}

		const totalMarks = this._designation === WarbandDesignation.HENCHMEN ? 14 : 90;
		const milestones = this._designation === WarbandDesignation.HENCHMEN ? HENCHMEN_MILESTONES : HERO_MILESTONES;

		let group: HTMLDivElement;
		for (var i = 1; i <= totalMarks; i++) {
			if (i % 5 === 1) {
				group = document.createElement("div");
				this._grid.appendChild(group);
			}

			const point = document.createElement("span");
			if (milestones.includes(i)) {
				point.classList.add("mwm-component-experienceGrid-milestone");
			}
			point.appendChild(i <= this._experience ? svg.closeThick() : svg.blank());
			group.appendChild(point);
		}
	}

	public onDomLoad() {
		this.rerenderGrid();
	}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [this._container];
	}
}
