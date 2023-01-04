import AssistChip from "../elements/assist-chip";
import Card from "../elements/card";
import { CardType } from "../enums/card-type";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import WarbandSummaryDao from "../repositories/warband-summary-dao";
import View from "../sdk/view";
import svg from "../utils/svg";
import viewManager from "../utils/view-manager";
import ViewWarbandView from "../views/view-warband";

export default class WarbandSummaryCard implements View {
	private _stats: HTMLDivElement = document.createElement("div");

	private _container: Card = new Card();

	public constructor() {
		this._container.type = CardType.FILLED;
	}

	public set warband(withWarband: WarbandSummaryDao) {
		this._stats.classList.add("mwm-component-warbandSummaryCard-stats");
		this._container.headline = withWarband.name || "???";
		this._container.subhead = withWarband.type || "Unknown";

		this._container.appendChild(document.createElement("hr"));
		this._container.appendChild(this._stats);

		const coinSpan = document.createElement("span");
		coinSpan.innerHTML =
			(withWarband.goldCrowns ? withWarband.goldCrowns : "No") +
			" Gold &bull; " +
			(withWarband.wyrdstoneFragments ? withWarband.wyrdstoneFragments : "No") +
			" Wyrdstone";
		this._stats.appendChild(coinSpan);

		const ratingChip = new AssistChip();
		ratingChip.label = "" + withWarband.rating;
		ratingChip.svg = svg.medal();
		ratingChip.htmlElements().forEach((htmlElement) => this._stats.appendChild(htmlElement));

		this._container.addOnClickListener({
			onClick: (view) => {
				const warband: WarbandModel = warbandRepository.fetch(withWarband.id);
				const warbandView: ViewWarbandView = new ViewWarbandView(warband);
				viewManager.push(warbandView);
			},
		});
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return this._container.htmlElements();
	}
}
