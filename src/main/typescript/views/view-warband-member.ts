import ConfirmationBottomSheet from "../components/confirmation-bottom-sheet";
import ExperienceGrid from "../components/experience-grid";
import Button from "../elements/button";
import TopAppBar from "../elements/top-app-bar";
import { TopAppBarStyle } from "../enums/top-app-bar-style";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import dom from "../utils/dom";
import viewManager from "../utils/view-manager";

export default class ViewWarbandMemberView implements View {
	private _container: HTMLDivElement = document.createElement("div");
	private _member: WarbandMemberModel;
	private _topAppBar: TopAppBar = new TopAppBar();

	private _experienceGrid: ExperienceGrid = new ExperienceGrid();

	public constructor(withWarband: WarbandModel, withMember: WarbandMemberModel) {
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

		// button to hire additional henchmen
		if (withMember.designation == WarbandDesignation.HENCHMEN && withWarband.totalMemberCount < withWarband.warriorLimit) {
			const div = document.createElement("div");

			const button = new Button();
			button.label = "Hire Additional Member";
			button.onClick = () => {
				const confirmation = new ConfirmationBottomSheet();
				confirmation.title = "Hire Addition Member";
				confirmation.textContent = "Would you like to hire an additional henchmen for this group?";
				confirmation.buttonLabel = "Hire for " + withMember.recruitmentCost + " Gold Crowns";
				confirmation.onConfirmation = () => {
					const hireCost = withMember.recruitmentCost;
					if (withWarband.goldCrowns < hireCost) {
						return;
					}
					withWarband.addGoldCrowns(0 - hireCost);
					withMember.addMembers(1);
					warbandRepository.store(withWarband);
					viewManager.pop();
					this.onDomLoad();
				};
				viewManager.showBottomSheet(confirmation);
			};

			dom.appendView(div, button);
			this._container.appendChild(div);
		}
	}
	public onDomLoad() {}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), this._container];
	}
}
