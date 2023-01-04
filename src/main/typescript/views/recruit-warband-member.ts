import Button from "../elements/button";
import TextField from "../elements/text-field";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import { InputType } from "../enums/input-type";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import View from "../sdk/view";
import dom from "../utils/dom";
import ViewManager from "../utils/view-manager";

export default class RecruitWarbandMemberView implements View {
	private _designation: WarbandDesignation = WarbandDesignation.HENCHMEN;

	private _topAppBar: TopAppBar = new TopAppBar();
	private _nameTextField: TextField = new TextField();
	private _typeTextField: TextField = new TextField();

	private _recruitmentCostTextField: TextField = new TextField();
	private _startingExperienceTextField: TextField = new TextField();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _nameContainer: HTMLDivElement = document.createElement("div");
	private _typeContainer: HTMLDivElement = document.createElement("div");
	private _recruitmentCostContainer: HTMLDivElement = document.createElement("div");
	private _startingExperienceContainer: HTMLDivElement = document.createElement("div");

	private _statContainer: HTMLDivElement = document.createElement("div");
	private _startingMovementStat: TextField = new TextField();
	private _startingWeaponSkillStat: TextField = new TextField();
	private _startingBallisticSkillStat: TextField = new TextField();
	private _startingStrengthStat: TextField = new TextField();
	private _startingToughnessStat: TextField = new TextField();
	private _startingWoundsStat: TextField = new TextField();
	private _startingInitiativeStat: TextField = new TextField();
	private _startingAttacksStat: TextField = new TextField();
	private _startingLeadershipStat: TextField = new TextField();

	private _maximumMovementStat: TextField = new TextField();
	private _maximumWeaponSkillStat: TextField = new TextField();
	private _maximumBallisticSkillStat: TextField = new TextField();
	private _maximumStrengthStat: TextField = new TextField();
	private _maximumToughnessStat: TextField = new TextField();
	private _maximumWoundsStat: TextField = new TextField();
	private _maximumInitiativeStat: TextField = new TextField();
	private _maximumAttacksStat: TextField = new TextField();
	private _maximumLeadershipStat: TextField = new TextField();

	public onRecruitCallback: (withMember: WarbandMemberModel) => void = () => {};

	public constructor(withDesignation: WarbandDesignation) {
		this._designation = withDesignation;

		this._topAppBar.showBackButton = true;
		this._topAppBar.headline = "Recruit A " + withDesignation;

		this._buttonDiv.classList.add("mwm-view-recruitWarbandMember-buttons");
		this._nameContainer.classList.add("mwm-view-recruitWarbandMember-container");
		this._typeContainer.classList.add("mwm-view-recruitWarbandMember-container");
		this._recruitmentCostContainer.classList.add("mwm-view-recruitWarbandMember-container");
		this._startingExperienceContainer.classList.add("mwm-view-recruitWarbandMember-container");

		const createButton = new Button();
		createButton.label = "Recruit " + withDesignation;
		createButton.type = ButtonType.FILLED;
		createButton.addOnClickListener({ onClick: () => this.onCreateClick() });
		createButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		this._nameTextField.label = withDesignation + "'s Name";
		this._nameTextField.htmlElements().forEach((htmlElement) => this._nameContainer.appendChild(htmlElement));

		this._typeTextField.label = withDesignation + "'s Type";
		this._typeTextField.htmlElements().forEach((htmlElement) => this._typeContainer.appendChild(htmlElement));

		this._recruitmentCostTextField.label = "Recruitment Cost";
		this._recruitmentCostTextField.value = "0";
		this._recruitmentCostTextField.inputType = InputType.NUMBER;
		this._recruitmentCostTextField.htmlElements().forEach((htmlElement) => this._recruitmentCostContainer.appendChild(htmlElement));

		this._startingExperienceTextField.label = "Starting Experience";
		this._startingExperienceTextField.value = "0";
		this._startingExperienceTextField.inputType = InputType.NUMBER;
		this._startingExperienceTextField.htmlElements().forEach((htmlElement) => this._startingExperienceContainer.appendChild(htmlElement));

		// stat grid
		this._statContainer.classList.add("mwm-view-recruitWarbandMember-statGrid");
		this.appendStat(this._statContainer, "Movement", this._startingMovementStat, this._maximumMovementStat);
		this.appendStat(this._statContainer, "Weapon Skill", this._startingWeaponSkillStat, this._maximumWeaponSkillStat);
		this.appendStat(this._statContainer, "Ballistic Skill", this._startingBallisticSkillStat, this._maximumBallisticSkillStat);
		this.appendStat(this._statContainer, "Strength", this._startingStrengthStat, this._maximumStrengthStat);
		this.appendStat(this._statContainer, "Toughness", this._startingToughnessStat, this._maximumToughnessStat);
		this.appendStat(this._statContainer, "Wounds", this._startingWoundsStat, this._maximumWoundsStat);
		this.appendStat(this._statContainer, "Initiative", this._startingInitiativeStat, this._maximumInitiativeStat);
		this.appendStat(this._statContainer, "Attacks", this._startingAttacksStat, this._maximumAttacksStat);
		this.appendStat(this._statContainer, "Leadership", this._startingLeadershipStat, this._maximumLeadershipStat);
	}

	private appendStat(grid: HTMLDivElement, statName: string, startingTextField: TextField, maximumTextField: TextField) {
		const label = document.createElement("span");
		label.textContent = statName;
		grid.appendChild(label);

		startingTextField.value = "0";
		startingTextField.inputType = InputType.NUMBER;
		startingTextField.label = "Starting";
		dom.appendView(grid, startingTextField);

		maximumTextField.value = "0";
		maximumTextField.inputType = InputType.NUMBER;
		maximumTextField.label = "Racial Max.";
		dom.appendView(grid, maximumTextField);
	}

	public onCreateClick() {
		const warbandMember = new WarbandMemberModel();
		warbandMember.name = this._nameTextField.value;
		warbandMember.type = this._typeTextField.value;
		warbandMember.designation = this._designation;
		warbandMember.addMembers(1);
		warbandMember.recruitmentCost = parseInt(this._recruitmentCostTextField.value);
		warbandMember.addExperiences(parseInt(this._startingExperienceTextField.value));

		const startingStats = warbandMember._stats;
		startingStats.movement = parseInt(this._startingMovementStat.value);
		startingStats.weaponSkill = parseInt(this._startingWeaponSkillStat.value);
		startingStats.ballisticSkill = parseInt(this._startingBallisticSkillStat.value);
		startingStats.strength = parseInt(this._startingStrengthStat.value);
		startingStats.toughness = parseInt(this._startingToughnessStat.value);
		startingStats.wounds = parseInt(this._startingWoundsStat.value);
		startingStats.initiative = parseInt(this._startingInitiativeStat.value);
		startingStats.attack = parseInt(this._startingAttacksStat.value);
		startingStats.leadership = parseInt(this._startingLeadershipStat.value);

		const racialMaximumStats = warbandMember._racialMaximum;
		racialMaximumStats.movement = parseInt(this._maximumMovementStat.value);
		racialMaximumStats.weaponSkill = parseInt(this._maximumWeaponSkillStat.value);
		racialMaximumStats.ballisticSkill = parseInt(this._maximumBallisticSkillStat.value);
		racialMaximumStats.strength = parseInt(this._maximumStrengthStat.value);
		racialMaximumStats.toughness = parseInt(this._maximumToughnessStat.value);
		racialMaximumStats.wounds = parseInt(this._maximumWoundsStat.value);
		racialMaximumStats.initiative = parseInt(this._maximumInitiativeStat.value);
		racialMaximumStats.attack = parseInt(this._maximumAttacksStat.value);
		racialMaximumStats.leadership = parseInt(this._maximumLeadershipStat.value);

		this.onRecruitCallback(warbandMember);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [
			...this._topAppBar.htmlElements(),
			this._nameContainer,
			this._typeContainer,
			this._recruitmentCostContainer,
			this._startingExperienceContainer,
			this._statContainer,
			this._buttonDiv,
		];
	}
}
