import { WarbandDesignation } from "../enums/warband-designation";
import UnitStatsModel from "../models/unit-stats";
import WarbandMemberModel from "../models/warband-member-model";
import WarbandModel from "../models/warband-model";
import UnitStatsDao from "./unit-stats-dao";
import WarbandDao from "./warband-dao";
import WarbandMemberDao from "./warband-member-dao";
import WarbandSummariesDao from "./warband-summaires-dao";
import WarbandSummaryDao from "./warband-summary-dao";

const getWarbandById = (withId: string): WarbandModel | null => {
	const json: string = window.localStorage.getItem(`warband:${withId}`) || "";
	if (json.length === 0) {
		return null;
	}
	const dao: WarbandDao = JSON.parse(json);

	const model = new WarbandModel();
	model.id = dao.id || withId;
	model.name = dao.name || "";
	model.type = dao.type || "";
	model.warriorLimit = dao.warriorLimit || 7;
	model.addGoldCrowns(dao.goldCrowns || 0);
	model.addWyrdstoneFragments(dao.wyrdstoneFragments || 0);
	(dao.members || [])
		.filter((model) => !!model)
		.map((member) => parseWarbandMemberDao(member))
		.forEach((member) => model.addMember(member));
	return model;
};

const parseUnitStatsModel = (model: UnitStatsModel): UnitStatsDao => ({
	movement: model.movement,
	weaponSkill: model.weaponSkill,
	ballisticSkill: model.ballisticSkill,
	strength: model.strength,
	toughness: model.toughness,
	wounds: model.wounds,
	initiative: model.initiative,
	attack: model.attack,
	leadership: model.leadership,
});

const parseUnitStatsDao = (dao: UnitStatsDao): UnitStatsModel => {
	const model = new UnitStatsModel();
	model.movement = dao.movement || 0;
	model.weaponSkill = dao.weaponSkill || 0;
	model.ballisticSkill = dao.ballisticSkill || 0;
	model.strength = dao.strength || 0;
	model.toughness = dao.toughness || 0;
	model.wounds = dao.wounds || 0;
	model.initiative = dao.initiative || 0;
	model.attack = dao.attack || 0;
	model.leadership = dao.leadership || 0;
	return model;
};

const parseWarbandMemberModel = (model: WarbandMemberModel): WarbandMemberDao => ({
	name: model.name,
	type: model.type,
	designation: model.designation,
	memberCount: model.memberCount,
	experience: model.experience,
	stats: parseUnitStatsModel(model._stats),
	racialMaximum: parseUnitStatsModel(model._racialMaximum),
	recruitmentCost: model.recruitmentCost,
});

const parseWarbandMemberDao = (dao: WarbandMemberDao): WarbandMemberModel => {
	const model = new WarbandMemberModel();
	(model.name = dao.name || ""),
		(model.type = dao.type || ""),
		(model.designation = dao.designation || WarbandDesignation.HENCHMEN),
		(model._stats = parseUnitStatsDao(dao.stats)),
		(model._racialMaximum = parseUnitStatsDao(dao.racialMaximum)),
		(model.recruitmentCost = dao.recruitmentCost || 0);
	model.addMembers(dao.memberCount || 0);
	model.addExperiences(dao.experience || 0);
	return model;
};

const storeWarband = (model: WarbandModel) => {
	const dao: WarbandDao = {
		id: model.id,
		name: model.name,
		type: model.type,
		goldCrowns: model.goldCrowns,
		wyrdstoneFragments: model.wyrdstoneFragments,
		warriorLimit: model.warriorLimit,

		members: [
			...[model.leader ? parseWarbandMemberModel(model.leader) : undefined],
			...model.heros.map((model) => parseWarbandMemberModel(model)),
			...model.henchmen.map((model) => parseWarbandMemberModel(model)),
		].filter((model) => !!model),
	};

	window.localStorage.setItem(`warband:${model.id}`, JSON.stringify(dao));
};

const getWarbandSummaries = (): WarbandSummariesDao => {
	const json: string = window.localStorage.getItem("warband-summaries") || "{}";
	const dao: WarbandSummariesDao = {};

	Object.entries(JSON.parse(json))
		.map(
			([id, data]: [string, any]) =>
				({
					id: data.id || id,
					name: data.name || "",
					type: data.type || "",
					rating: data.rating || 0,
					goldCrowns: data.goldCrowns || 0,
					wyrdstoneFragments: data.wyrdstoneFragments || 0,
				} as WarbandSummaryDao)
		)
		.forEach((summary) => (dao[summary.id] = summary));

	return dao;
};

const storeWarbandSummary = (model: WarbandModel) => {
	const summaries: WarbandSummariesDao = getWarbandSummaries();

	summaries[model.id] = {
		id: model.id,
		name: model.name,
		type: model.type,
		rating: model.rating,
		goldCrowns: model.goldCrowns,
		wyrdstoneFragments: model.wyrdstoneFragments,
	};

	window.localStorage.setItem("warband-summaries", JSON.stringify(summaries));
};

export default {
	list() {
		return getWarbandSummaries();
	},

	store(warband: WarbandModel) {
		storeWarband(warband);
		storeWarbandSummary(warband);
	},

	fetch(warbandId: string) {
		return getWarbandById(warbandId);
	},
};
