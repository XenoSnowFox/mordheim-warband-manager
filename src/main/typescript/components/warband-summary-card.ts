import AssistChip from "../elements/assist-chip";
import Card from "../elements/card";
import { CardType } from "../enums/card-type";
import WarbandSummaryDao from "../repositories/warband-summary-dao";
import View from "../sdk/view";
import svg from "../utils/svg";

export default class WarbandSummaryCard implements View {
	private _stats: HTMLDivElement = document.createElement("div");

	private _container: Card = new Card();

	public constructor() {
		this._container.type = CardType.FILLED;
	}

	public set warband(withWarband: WarbandSummaryDao) {
		this._stats.classList.add("mwm-component-warbandSummaryCard-stats");
		this._container.headline = withWarband.name;
		this._container.subhead = withWarband.type;

		// const coinChip = new AssistChip();
		// coinChip.label = "" + withWarband.goldCrowns;
		// coinChip.svg = svg.circleMultipleOutline();
		// coinChip.htmlElements().forEach((htmlElement) => this._container.appendChild(htmlElement));

		// const wyrdstoneChip = new AssistChip();
		// wyrdstoneChip.label = "" + withWarband.wyrdstoneFragments;
		// wyrdstoneChip.svg = svg.diamondStone();
		// wyrdstoneChip.htmlElements().forEach((htmlElement) => this._container.appendChild(htmlElement));

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
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return this._container.htmlElements();
	}
}
