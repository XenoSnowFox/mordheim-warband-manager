import TopAppBar from "../components/top-app-bar";
import View from "../sdk/view";

export default class ListMyWarbandsView implements View {
	private _topAppBar: TopAppBar = new TopAppBar();

	public constructor() {
		this._topAppBar.title = "My Warbands";
	}

	public onDomLoad() {
		// #TODO: reload warband list from storage
	}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements()];
	}
}
