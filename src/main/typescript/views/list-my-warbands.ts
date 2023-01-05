import EmptyStateComponent from "../components/empty-state";
import WarbandSummaryCard from "../components/warband-summary-card";
import Button from "../elements/button";
import Fab from "../elements/fab";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import dom from "../utils/dom";
import svg from "../utils/svg";
import Svg from "../utils/svg";
import viewManager from "../utils/view-manager";
import ViewManager from "../utils/view-manager";
import AboutView from "./about";
import CreateWarbandView from "./create-warband";

export default class ListMyWarbandsView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();
	private _fab: Fab = new Fab();

	private _showFab: boolean = true;

	private _container: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._container.classList.add("mwm-view-listMyWarbands-container");

		this._topAppBar.headline = "My Warbands";

		this._fab.label = "Create Warband";
		this._fab.svg = Svg.plus();
		this._fab.addOnClickListener({ onClick: this.onFabClicked });

		const aboutAction = svg.informationOutline();
		aboutAction.onclick = () => viewManager.push(new AboutView());
		this._topAppBar.addAction(aboutAction);
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

		this._showFab = this._container.childNodes.length > 0;

		if (!this._container.childNodes.length) {
			const createButton = new Button();
			createButton.label = "Create a New Warband";
			createButton.type = ButtonType.FILLED;
			createButton.addOnClickListener({ onClick: () => this.onFabClicked() });

			const emptyState = new EmptyStateComponent();
			emptyState.title = "No Warbands Have Been Formed.";
			emptyState.svg = svg.campfire();
			emptyState.addButton(createButton);
			dom.appendView(this._container, emptyState);
		}
	}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), ...(this._showFab ? this._fab.htmlElements() : []), this._container];
	}
}
