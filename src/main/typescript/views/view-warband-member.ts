import ExperienceGrid from "../components/experience-grid";
import TopAppBar from "../elements/top-app-bar";
import { TopAppBarStyle } from "../enums/top-app-bar-style";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import View from "../sdk/view";
import dom from "../utils/dom";

export default class ViewWarbandMemberView implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _member: WarbandMemberModel;
	private _topAppBar: TopAppBar = new TopAppBar();

	private _experienceGrid: ExperienceGrid = new ExperienceGrid();

	public constructor(withMember: WarbandMemberModel) {
		this._container.classList.add("mwm-view-viewWarbandMember-container");

		this._member = withMember;

		this._topAppBar.showBackButton = true;
		this._topAppBar.style = TopAppBarStyle.LARGE;
		this._topAppBar.headline = withMember.name || "???";
		this._topAppBar.subhead = withMember.type || "Unknown";

		this._experienceGrid.experience = withMember.experience;
		this._experienceGrid.designation = withMember.designation;
		if ([WarbandDesignation.LEADER, WarbandDesignation.HERO, WarbandDesignation.HENCHMEN].includes(withMember.designation)) {
			dom.appendView(this._container, this._experienceGrid);
		}
	}
	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), this._container];
	}
}
