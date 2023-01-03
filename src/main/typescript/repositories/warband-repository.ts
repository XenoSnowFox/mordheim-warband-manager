import WarbandModel from "../models/warband-model";
import WarbandDao from "./warband-dao";
import WarbandSummariesDao from "./warband-summaires-dao";

const getWarbandSummaries = (): WarbandSummariesDao => {
	const json: string = window.localStorage.getItem("warband-summaries") || "{}";
	return JSON.parse(json);
};

const storeWarbandSummary = (model: WarbandModel) => {
	const summaries: WarbandSummariesDao = getWarbandSummaries();

	summaries[model.id] = {
		name: model.name,
		type: model.type,
		rating: model.rating,
		goldCrowns: model.goldCrowns,
		wyrdstoneFragments: model.wyrdstoneFragments,
	};

	window.localStorage.setItem("warband-summaries", JSON.stringify(summaries));
};

const storeWarband = (model: WarbandModel) => {
	const dao: WarbandDao = {
		id: model.id,
		name: model.name,
		type: model.type,
		goldCrowns: model.goldCrowns,
		wyrdstoneFragments: model.wyrdstoneFragments,
	};

	window.localStorage.setItem(`warband:${model.id}`, JSON.stringify(dao));
};

export default {
	list() {
		return getWarbandSummaries();
	},

	store(warband: WarbandModel) {
		storeWarband(warband);
		storeWarbandSummary(warband);
	},
};
