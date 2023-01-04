import { WarbandDesignation } from "../enums/warband-designation";
import UnitStatsDao from "./unit-stats-dao";

export default interface WarbandMemberDao {
	name: string;
	type: string;
	designation: WarbandDesignation;
	memberCount: number;
	experience: number;
	stats: UnitStatsDao;
	racialMaximum: UnitStatsDao;
	recruitmentCost: number;
}
