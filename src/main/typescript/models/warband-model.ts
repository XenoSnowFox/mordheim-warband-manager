import uuid from "../utils/uuid";

export default class WarbandModel {
	private _id: string = uuid.random();
	private _name: string = "";
	private _type: string = "";
	private _goldCrowns: number = 0;
	private _wyrdstoneFragments: number = 0;

	public get id(): string {
		return this._id;
	}

	public get rating(): number {
		return 0;
	}

	public get name() {
		return this._name;
	}

	public get type() {
		return this._type;
	}

	public get goldCrowns() {
		return this._goldCrowns;
	}

	public get wyrdstoneFragments() {
		return this._wyrdstoneFragments;
	}

	public set id(withIdentifier: string) {
		this._id = withIdentifier;
	}

	public set name(withName: string) {
		this._name = withName.trim();
	}

	public set type(withType: string) {
		this._type = withType.trim();
	}

	public addGoldCrowns(withAmount: number): void {
		if (this._goldCrowns + withAmount < 0) {
			throw new Error("Unable to remove more Gold Crowns then the warband has.");
		}

		this._goldCrowns += withAmount;
	}

	public addWyrdstoneFragments(withAmount: number): void {
		if (this._wyrdstoneFragments + withAmount < 0) {
			throw new Error("Unable to remove more Wyrdstone Fragments then the warband has.");
		}

		this._wyrdstoneFragments += withAmount;
	}
}
