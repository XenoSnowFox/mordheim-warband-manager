import Card from "../elements/card";
import { CardType } from "../enums/card-type";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import View from "../sdk/view";
import UnitStatsGridView from "./unit-stats-grid";

export default class WarbandMemberSummaryCard implements View {
	private _container: Card = new Card();
	private _unitStatsGrid: UnitStatsGridView = new UnitStatsGridView();

	public constructor() {
		this._container.type = CardType.FILLED;
		this._container.appendFooterView(this._unitStatsGrid);
	}

	public set warbandMember(withMember: WarbandMemberModel) {
		this._container.headline = withMember.name || "???";
		this._container.subhead = withMember.type || "Unknown";

		this._unitStatsGrid.stats = withMember._stats;

		this._container.addOnClickListener({
			onClick: (view) => {
				console.log("LEADER:", withMember);
			},
		});
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return this._container.htmlElements();
	}
}
