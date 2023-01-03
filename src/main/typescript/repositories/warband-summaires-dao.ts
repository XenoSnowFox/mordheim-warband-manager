import WarbandSummaryDao from "./warband-summary-dao";

export default interface WarbandSummariesDao {
	[index: string]: WarbandSummaryDao;
}
