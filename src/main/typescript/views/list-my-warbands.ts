import WarbandSummaryCard from "../components/warband-summary-card";
import Fab from "../elements/fab";
import TopAppBar from "../elements/top-app-bar";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import Svg from "../utils/svg";
import ViewManager from "../utils/view-manager";
import CreateWarbandView from "./create-warband";

export default class ListMyWarbandsView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();
	private _fab: Fab = new Fab();

	private _container: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._container.classList.add("mwm-view-listMyWarbands-container");

		this._topAppBar.headline = "My Warbands";

		this._fab.label = "Create Warband";
		this._fab.svg = Svg.plus();
		this._fab.addOnClickListener({ onClick: this.onFabClicked });
	}

	private onFabClicked() {
		const view = new CreateWarbandView();
		ViewManager.push(view);
	}

	public onDomLoad() {
		// clear the container
		while (this._container.childNodes.length) {
			this._container.removeChild(this._container.childNodes[0]);
		}

		Object.entries(warbandRepository.list())
			.sort((a, b) => a[1].name.toLowerCase().localeCompare(b[1].name.toLowerCase()))
			.map((entry) => {
				const card = new WarbandSummaryCard();
				card.warband = entry[1];
				return card;
			})
			.flatMap((card) => card.htmlElements())
			.forEach((htmlElement) => this._container.appendChild(htmlElement));
	}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), ...this._fab.htmlElements(), this._container];
	}
}
