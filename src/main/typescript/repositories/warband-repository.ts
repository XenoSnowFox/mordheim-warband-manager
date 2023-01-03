import WarbandModel from "../models/warband-model";
import WarbandDao from "./warband-dao";
import WarbandSummariesDao from "./warband-summaires-dao";
import WarbandSummaryDao from "./warband-summary-dao";

const getWarbandById = (withId: string): WarbandModel | null => {
	const json: string = window.localStorage.getItem(`warband:${withId}`) || "";
	if (json.length === 0) {
		return null;
	}
	const dao: WarbandDao = JSON.parse(json);

	const model = new WarbandModel();
	model.id = dao.id;
	model.name = dao.name;
	model.type = dao.type;
	model.warriorLimit = dao.warriorLimit;
	model.addGoldCrowns(dao.goldCrowns);
	model.addWyrdstoneFragments(dao.wyrdstoneFragments);
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
