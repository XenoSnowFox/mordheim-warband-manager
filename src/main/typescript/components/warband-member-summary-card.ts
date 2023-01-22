import AssistChip from "../elements/assist-chip";
import Card from "../elements/card";
import { CardType } from "../enums/card-type";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import View from "../sdk/view";
import dom from "../utils/dom";
import svg from "../utils/svg";
import viewManager from "../utils/view-manager";
import ViewWarbandMemberView from "../views/view-warband-member";
import UnitStatsGridView from "./unit-stats-grid";

export default class WarbandMemberSummaryCard implements View {
	private _container: Card = new Card();
	private _chipsContainer: HTMLDivElement = document.createElement("div");
	private _unitStatsGrid: UnitStatsGridView = new UnitStatsGridView();

	public constructor() {
		this._container.type = CardType.FILLED;
		this._container.appendFooterView(this._unitStatsGrid);

		this._chipsContainer.classList.add("mwm-component-warbandMemberSummaryCard-chips");
		this._container.appendChild(this._chipsContainer);
	}

	public set warbandMember(withMember: WarbandMemberModel) {
		this._container.headline = withMember.name || "???";
		this._container.subhead = withMember.type || "Unknown";

		this._unitStatsGrid.stats = withMember._stats;

		this._container.addOnClickListener({
			onClick: (view) => viewManager.push(new ViewWarbandMemberView(withMember)),
		});

		while (this._chipsContainer.childNodes.length) {
			this._chipsContainer.removeChild(this._chipsContainer.childNodes[0]);
		}

		if (withMember.designation === WarbandDesignation.HENCHMEN) {
			const memberCountChip = new AssistChip();
			memberCountChip.label = "" + withMember.memberCount;
			memberCountChip.svg = svg.accountGroup();
			dom.appendView(this._chipsContainer, memberCountChip);
		}

		const experienceChip = new AssistChip();
		experienceChip.label = "" + withMember.experience * withMember.memberCount;
		experienceChip.svg = svg.school();
		dom.appendView(this._chipsContainer, experienceChip);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return this._container.htmlElements();
	}
}
