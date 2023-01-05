import WarbandSummaryCard from "../components/warband-summary-card";
import Fab from "../elements/fab";
import TopAppBar from "../elements/top-app-bar";
import { TopAppBarStyle } from "../enums/top-app-bar-style";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import svg from "../utils/svg";
import Svg from "../utils/svg";
import ViewManager from "../utils/view-manager";
import CreateWarbandView from "./create-warband";

export default class AboutView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();
	private _fab: Fab = new Fab();

	private _container: HTMLDivElement = document.createElement("div");

	public constructor() {
		this._container.classList.add("mwm-view-about-container");

		this._topAppBar.headline = "Mordheim Warband Manager";
		this._topAppBar.subhead = "Build: 0.0.0";
		this._topAppBar.style = TopAppBarStyle.LARGE;
		this._topAppBar.showBackButton = true;

		this._fab.label = "View on GitHub";
		this._fab.svg = Svg.github();
		this._fab.addOnClickListener({ onClick: () => window.open("https://github.com/XenoSnowFox/mordheim-warband-manager", "_blank").focus() });
	}

	private onFabClicked() {
		const view = new CreateWarbandView();
		ViewManager.push(view);
	}

	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), ...this._fab.htmlElements(), this._container];
	}
}
