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
	private _memberCountTextField: TextField = new TextField();

	private _buttonDiv: HTMLDivElement = document.createElement("div");
	private _nameContainer: HTMLDivElement = document.createElement("div");
	private _typeContainer: HTMLDivElement = document.createElement("div");
	private _costContainer: HTMLDivElement = document.createElement("div");

	private _statsHeading: HTMLHeadingElement = document.createElement("h2");

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

	private _createButton: Button = new Button();

	public onRecruitCallback: (withMember: WarbandMemberModel) => void = () => {};

	public constructor(withDesignation: WarbandDesignation) {
		this._designation = withDesignation;

		this._topAppBar.showBackButton = true;
		this._topAppBar.headline = "Recruit A " + withDesignation;

		this._buttonDiv.classList.add("mwm-view-recruitWarbandMember-buttons");
		this._nameContainer.classList.add("mwm-view-recruitWarbandMember-container");
		this._typeContainer.classList.add("mwm-view-recruitWarbandMember-container");
		this._costContainer.classList.add("mwm-view-recruitWarbandMember-costContainer");

		this._createButton.label = "Hire for free";
		this._createButton.type = ButtonType.FILLED;
		this._createButton.addOnClickListener({ onClick: () => this.onCreateClick() });
		this._createButton.htmlElements().forEach((htmlElement) => this._buttonDiv.appendChild(htmlElement));

		this._nameTextField.label = withDesignation + "'s Name";
		this._nameTextField.htmlElements().forEach((htmlElement) => this._nameContainer.appendChild(htmlElement));

		this._typeTextField.label = withDesignation + "'s Type";
		this._typeTextField.htmlElements().forEach((htmlElement) => this._typeContainer.appendChild(htmlElement));

		this._recruitmentCostTextField.label = "Cost To Hire";
		this._recruitmentCostTextField.value = "";
		this._recruitmentCostTextField.inputType = InputType.NUMBER;
		this._recruitmentCostTextField.htmlElements().forEach((htmlElement) => this._costContainer.appendChild(htmlElement));
		this._recruitmentCostTextField.onChange = () => this.updateCost();

		this._startingExperienceTextField.label = "Starting Experience";
		this._startingExperienceTextField.value = "";
		this._startingExperienceTextField.inputType = InputType.NUMBER;
		this._startingExperienceTextField.htmlElements().forEach((htmlElement) => this._costContainer.appendChild(htmlElement));

		this._memberCountTextField.label = "Group Size";
		this._memberCountTextField.value = "1";
		this._memberCountTextField.inputType = InputType.NUMBER;
		withDesignation == WarbandDesignation.HENCHMEN &&
			this._memberCountTextField.htmlElements().forEach((htmlElement) => this._costContainer.appendChild(htmlElement));
		this._memberCountTextField.onChange = () => this.updateCost();

		this._statsHeading.classList.add("mwm-view-recruitWarbandMember-heading");
		this._statsHeading.textContent = withDesignation + "'s Stats";

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

	private updateCost() {
		let cost = 0;

		cost += Math.max(0, parseInt(this._recruitmentCostTextField.value.trim() || "0"));

		cost *= Math.max(1, parseInt(this._memberCountTextField.value.trim()));

		this._createButton.label = "Hire for " + (cost ? cost + "gc" : "free");
	}

	private appendStat(grid: HTMLDivElement, statName: string, startingTextField: TextField, maximumTextField: TextField) {
		const label = document.createElement("span");
		label.textContent = statName;
		grid.appendChild(label);

		startingTextField.value = "";
		startingTextField.inputType = InputType.NUMBER;
		startingTextField.label = "Starting";
		dom.appendView(grid, startingTextField);

		maximumTextField.value = "";
		maximumTextField.inputType = InputType.NUMBER;
		maximumTextField.label = "Racial Max.";
		dom.appendView(grid, maximumTextField);
	}

	public onCreateClick() {
		const warbandMember = new WarbandMemberModel();
		warbandMember.name = this._nameTextField.value.trim();
		warbandMember.type = this._typeTextField.value.trim();
		warbandMember.designation = this._designation;
		warbandMember.addMembers(Math.max(1, parseInt(this._memberCountTextField.value.trim())));
		warbandMember.recruitmentCost = parseInt(this._recruitmentCostTextField.value.trim());
		warbandMember.addExperiences(parseInt(this._startingExperienceTextField.value.trim()));

		const startingStats = warbandMember._stats;
		startingStats.movement = parseInt(this._startingMovementStat.value.trim());
		startingStats.weaponSkill = parseInt(this._startingWeaponSkillStat.value.trim());
		startingStats.ballisticSkill = parseInt(this._startingBallisticSkillStat.value.trim());
		startingStats.strength = parseInt(this._startingStrengthStat.value.trim());
		startingStats.toughness = parseInt(this._startingToughnessStat.value.trim());
		startingStats.wounds = parseInt(this._startingWoundsStat.value.trim());
		startingStats.initiative = parseInt(this._startingInitiativeStat.value.trim());
		startingStats.attack = parseInt(this._startingAttacksStat.value.trim());
		startingStats.leadership = parseInt(this._startingLeadershipStat.value.trim());

		const racialMaximumStats = warbandMember._racialMaximum;
		racialMaximumStats.movement = parseInt(this._maximumMovementStat.value.trim());
		racialMaximumStats.weaponSkill = parseInt(this._maximumWeaponSkillStat.value.trim());
		racialMaximumStats.ballisticSkill = parseInt(this._maximumBallisticSkillStat.value.trim());
		racialMaximumStats.strength = parseInt(this._maximumStrengthStat.value.trim());
		racialMaximumStats.toughness = parseInt(this._maximumToughnessStat.value.trim());
		racialMaximumStats.wounds = parseInt(this._maximumWoundsStat.value.trim());
		racialMaximumStats.initiative = parseInt(this._maximumInitiativeStat.value.trim());
		racialMaximumStats.attack = parseInt(this._maximumAttacksStat.value.trim());
		racialMaximumStats.leadership = parseInt(this._maximumLeadershipStat.value.trim());

		this.onRecruitCallback(warbandMember);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [
			...this._topAppBar.htmlElements(),
			this._nameContainer,
			this._typeContainer,
			this._costContainer,
			this._statsHeading,
			this._statContainer,
			this._buttonDiv,
		];
	}
}
