import uuid from "../utils/uuid";
import WarbandMemberModel from "./warband-member-model";
import { WarbandDesignation } from "../enums/warband-designation";

export default class WarbandModel {
	private _id: string = uuid.random();
	private _name: string = "";
	private _type: string = "";
	private _goldCrowns: number = 0;
	private _wyrdstoneFragments: number = 0;
	private _warriorLimit: number = 0;

	private _members: Array<WarbandMemberModel> = [];

	public get id(): string {
		return this._id;
	}

	public get rating(): number {
		let grandTotalExperience = 0;
		let memberCount = 0;
		let largeCreatureCount = 0;
		let hiredSwordRating = 0;
		let dramatisPersonaRating = 0;

		if (this.hasLeader()) {
			memberCount++;
			grandTotalExperience += this.leader.experience || 0;
		}

		this.heros.forEach((hero) => {
			memberCount++;
			grandTotalExperience += hero.experience || 0;
		});

		this.henchmen.forEach((henchmen) => {
			memberCount += henchmen.memberCount;
			grandTotalExperience += henchmen.memberCount * (henchmen.experience || 0);
		});

		// #TODO: add large creature count
		// #TODO: add hired sword ratings
		// #TODO: add dramatic persona ratings

		return grandTotalExperience + memberCount * 5 + largeCreatureCount * 20 + hiredSwordRating + dramatisPersonaRating;
	}

	public hasLeader(): boolean {
		return !!this.leader;
	}

	public get totalMemberCount(): number {
		return this.heroCount() + this.henchmenCount();
	}

	public heroCount(): number {
		return this.heros.length;
	}

	public henchmenCount(): number {
		return this.henchmen.map((member) => member.memberCount).reduce((p, c) => p + c, 0);
	}

	public get availableHeroSlots(): number {
		return Math.min(5, this.warriorLimit - this.henchmenCount() - /* Leader Count */ 1);
	}

	public get availableHenchmenSlots(): number {
		return this.warriorLimit - this.heroCount() - /* Leader Count */ 1;
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

	public get warriorLimit() {
		return this._warriorLimit;
	}

	public get leader(): WarbandMemberModel {
		return this._members.filter((member) => member.designation === WarbandDesignation.LEADER)[0];
	}

	public get heros(): Array<WarbandMemberModel> {
		return this._members.filter((member) => member.designation === WarbandDesignation.HERO);
	}

	public get henchmen(): Array<WarbandMemberModel> {
		return this._members.filter((member) => member.designation === WarbandDesignation.HENCHMEN);
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

	public addMember(withMember: WarbandMemberModel) {
		if (this.hasLeader() && withMember.designation === WarbandDesignation.LEADER) {
			throw new Error("Warband can only have one leader at any time.");
		}

		if (this.heroCount() >= this.availableHeroSlots && withMember.designation === WarbandDesignation.HERO) {
			throw new Error("Warband is at hero capacity. Cannot recruit additional heros.");
		}

		if (this.henchmenCount() >= this.availableHenchmenSlots && withMember.designation === WarbandDesignation.HENCHMEN) {
			throw new Error("Warband is at henchmen capacity. Cannot recruit additional henchmen.");
		}

		this._members.push(withMember);
	}

	public recruitMember(withMember: WarbandMemberModel) {
		const recruitmentCost = withMember.recruitmentCost;
		if (this._goldCrowns < recruitmentCost) {
			throw new Error("Warband does not have enough Gold Crowns to recruit this member.");
		}
		this.addMember(withMember);
		this._goldCrowns -= recruitmentCost;
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

	public set warriorLimit(withAmount: number) {
		if (withAmount < 1) {
			throw new Error("Warrior Limit must be greater than zero.");
		}

		this._warriorLimit = withAmount;
	}
}
