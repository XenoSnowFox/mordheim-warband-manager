import { WarbandDesignation } from "../enums/warband-designation";
import UnitStatsModel from "./unit-stats";

export default class WarbandMemberModel {
	private _name: string = "";
	private _type: string = "";
	private _designation: WarbandDesignation = WarbandDesignation.HENCHMEN;
	private _memberCount: number = 0;
	private _experience: number = 0;
	private _recruitmentCost: number = 0;
	public _stats: UnitStatsModel = new UnitStatsModel();
	public _racialMaximum: UnitStatsModel = new UnitStatsModel();

	public get name() {
		return this._name;
	}

	public get type() {
		return this._type;
	}

	public get designation() {
		return this._designation;
	}

	public get memberCount() {
		return this._memberCount;
	}

	public get experience() {
		return this._experience;
	}

	public get recruitmentCost() {
		return this._recruitmentCost;
	}

	public set designation(withDesignation: WarbandDesignation) {
		if (this._memberCount > 1 && withDesignation != WarbandDesignation.HENCHMEN) {
			throw new Error("Non Henchmen warband member must have a maximum member count of one.");
		}

		this._designation = withDesignation;
	}

	public set name(withName: string) {
		this._name = withName.trim();
	}

	public set type(withType: string) {
		this._type = withType.trim();
	}

	public set recruitmentCost(withCost: number) {
		if (withCost < 0) {
			throw new Error("Recruitment cost must be a non-negative number.");
		}

		this._recruitmentCost = withCost;
	}

	public addMembers(withAmount: number): void {
		if (this._memberCount + withAmount < 0) {
			throw new Error("Unable to remove more members than the group contains.");
		}

		if (this._memberCount > 1 && this._designation != WarbandDesignation.HENCHMEN) {
			throw new Error("Non Henchmen warband member must have a maximum member count of one.");
		}

		this._memberCount += withAmount;
	}

	public addExperiences(withAmount: number): void {
		if (withAmount < 0) {
			throw new Error("Unable to remove experience from a hero.");
		}

		this._experience += withAmount;
	}
}
