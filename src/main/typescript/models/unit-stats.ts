export default class UnitStatsModel {
	private _movement: number = 0;
	private _weaponSkill: number = 0;
	private _ballisticSkill: number = 0;
	private _strength: number = 0;
	private _toughness: number = 0;
	private _wounds: number = 0;
	private _initiative: number = 0;
	private _attack: number = 0;
	private _leadership: number = 0;

	public get movement() {
		return this._movement;
	}

	public get weaponSkill() {
		return this._weaponSkill;
	}

	public get ballisticSkill() {
		return this._ballisticSkill;
	}

	public get strength() {
		return this._strength;
	}

	public get toughness() {
		return this._toughness;
	}

	public get wounds() {
		return this._wounds;
	}

	public get initiative() {
		return this._initiative;
	}

	public get attack() {
		return this._attack;
	}

	public get leadership() {
		return this._leadership;
	}

	public set movement(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._movement = withAmount;
	}

	public set weaponSkill(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._weaponSkill = withAmount;
	}

	public set ballisticSkill(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._ballisticSkill = withAmount;
	}

	public set strength(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._strength = withAmount;
	}

	public set toughness(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._toughness = withAmount;
	}

	public set wounds(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._wounds = withAmount;
	}

	public set initiative(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._initiative = withAmount;
	}

	public set attack(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._attack = withAmount;
	}

	public set leadership(withAmount: number) {
		if (withAmount < 0) {
			throw new Error("Value mustbe greater than zero");
		}

		this._leadership = withAmount;
	}
}
