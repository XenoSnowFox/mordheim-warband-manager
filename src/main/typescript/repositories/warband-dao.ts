import WarbandMemberDao from "./warband-member-dao";

export default interface WarbandDao {
	id: string;
	name: string;
	type: string;
	goldCrowns: number;
	wyrdstoneFragments: number;
	warriorLimit: number;

	members: Array<WarbandMemberDao>;
}
