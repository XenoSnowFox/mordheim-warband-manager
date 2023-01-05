import WarbandMemberSummaryCard from "../components/warband-member-summary-card";
import AssistChip from "../elements/assist-chip";
import Button from "../elements/button";
import Fab from "../elements/fab";
import TopAppBar from "../elements/top-app-bar";
import { ButtonType } from "../enums/button-type";
import { TopAppBarStyle } from "../enums/top-app-bar-style";
import { WarbandDesignation } from "../enums/warband-designation";
import WarbandMemberModel from "../models/warband-member-model";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import View from "../sdk/view";
import dom from "../utils/dom";
import svg from "../utils/svg";
import Svg from "../utils/svg";
import viewManager from "../utils/view-manager";
import EditWarbandView from "./edit-warband";
import RecruitWarbandMemberView from "./recruit-warband-member";

export default class ViewWarbandView implements View {
	private _warband: WarbandModel;
	private _topAppBar: TopAppBar = new TopAppBar();
	private _fab: Fab = new Fab();

	private _container: HTMLDivElement = document.createElement("div");

	private _leaderHeading: HTMLDivElement = document.createElement("div");
	private _leaderCounter: AssistChip = new AssistChip();
	private _hireLeaderButton: Button = new Button();

	private _heroHeading: HTMLDivElement = document.createElement("div");
	private _heroCounter: AssistChip = new AssistChip();
	private _hireHeroButton: Button = new Button();

	private _henchmenHeading: HTMLDivElement = document.createElement("div");
	private _henchmenCounter: AssistChip = new AssistChip();
	private _hireHenchmenButton: Button = new Button();

	private _hiredSwordHeading: HTMLDivElement = document.createElement("div");
	private _hiredSwordCounter: AssistChip = new AssistChip();
	private _hireHiredSwordButton: Button = new Button();

	private _dramaticPersonaHeading: HTMLDivElement = document.createElement("div");
	private _dramaticPersonaCounter: AssistChip = new AssistChip();
	private _hireDramaticPersonaButton: Button = new Button();

	public constructor(withWarband: WarbandModel) {
		this._warband = withWarband;

		this._container.classList.add("mwm-view-viewWarband-container");

		this._topAppBar.showBackButton = true;
		this._topAppBar.style = TopAppBarStyle.LARGE;

		const editAction = svg.pencil();
		editAction.onclick = () => viewManager.push(new EditWarbandView(withWarband));
		this._topAppBar.addAction(editAction);

		this._fab.label = "Hire Member";
		this._fab.svg = Svg.plus();
		this._fab.addOnClickListener({ onClick: this.onFabClicked });

		this._leaderHeading.classList.add("mwm-view-viewWarband-memberHeading");
		this._leaderHeading.appendChild(
			(() => {
				const heading = document.createElement("span");
				heading.textContent = "Leader";
				return heading;
			})()
		);
		dom.appendView(this._leaderHeading, this._leaderCounter);
		this._hireLeaderButton.label = "Recruit a Leader";
		this._hireLeaderButton.type = ButtonType.FILLED;
		this._hireLeaderButton.addOnClickListener({ onClick: () => this.onRecruitMemberClicked(WarbandDesignation.LEADER) });

		this._heroHeading.classList.add("mwm-view-viewWarband-memberHeading");
		this._heroHeading.appendChild(
			(() => {
				const heading = document.createElement("span");
				heading.textContent = "Heros & Heroines";
				return heading;
			})()
		);
		dom.appendView(this._heroHeading, this._heroCounter);
		this._hireHeroButton.label = "Recruit a Hero or Heroine";
		this._hireHeroButton.type = ButtonType.FILLED;
		this._hireHeroButton.addOnClickListener({ onClick: () => this.onRecruitMemberClicked(WarbandDesignation.HERO) });

		this._henchmenHeading.classList.add("mwm-view-viewWarband-memberHeading");
		this._henchmenHeading.appendChild(
			(() => {
				const heading = document.createElement("span");
				heading.textContent = "Henchmen";
				return heading;
			})()
		);
		dom.appendView(this._henchmenHeading, this._henchmenCounter);
		this._hireHenchmenButton.label = "Recruit a Henchmen";
		this._hireHenchmenButton.type = ButtonType.FILLED;
		this._hireHenchmenButton.addOnClickListener({ onClick: () => this.onRecruitMemberClicked(WarbandDesignation.HENCHMEN) });

		this._hiredSwordHeading.classList.add("mwm-view-viewWarband-memberHeading");
		this._hiredSwordHeading.appendChild(
			(() => {
				const heading = document.createElement("span");
				heading.textContent = "Hired Swords";
				return heading;
			})()
		);
		dom.appendView(this._hiredSwordHeading, this._hiredSwordCounter);
		this._hireHiredSwordButton.label = "Recruit a Hired Sword";
		this._hireHiredSwordButton.type = ButtonType.FILLED;
		this._hireHiredSwordButton.addOnClickListener({ onClick: () => this.onRecruitMemberClicked(WarbandDesignation.HIRED_SWORD) });

		this._dramaticPersonaHeading.classList.add("mwm-view-viewWarband-memberHeading");
		this._dramaticPersonaHeading.appendChild(
			(() => {
				const heading = document.createElement("span");
				heading.textContent = "Dramatic Personas";
				return heading;
			})()
		);
		dom.appendView(this._dramaticPersonaHeading, this._dramaticPersonaCounter);
		this._hireDramaticPersonaButton.label = "Recruit a Dramatic Persona";
		this._hireDramaticPersonaButton.type = ButtonType.FILLED;
		this._hireDramaticPersonaButton.addOnClickListener({ onClick: () => this.onRecruitMemberClicked(WarbandDesignation.DRAMATIC_PERSONA) });
	}

	private onRecruitMemberClicked(withDesignation: WarbandDesignation) {
		const view = new RecruitWarbandMemberView(withDesignation);
		viewManager.push(view);

		view.onRecruitCallback = (withMember: WarbandMemberModel) => {
			const warband = warbandRepository.fetch(this._warband.id);

			const recruitmentCost = withMember.recruitmentCost;
			if (warband.goldCrowns < recruitmentCost) {
				// #TODO show insufficient funds error
				alert("Not enough gold.");
				return;
			}

			// recruit and save
			warband.recruitMember(withMember);
			warbandRepository.store(warband);
			viewManager.pop();
		};
	}

	private onFabClicked() {
		// const view = new CreateWarbandView();
		// ViewManager.push(view);
	}

	public onDomLoad() {
		// clear the container
		while (this._container.childNodes.length) {
			this._container.removeChild(this._container.childNodes[0]);
		}

		// reload the warband
		this._warband = warbandRepository.fetch(this._warband.id);

		// update the top app bar
		this._topAppBar.headline = this._warband.name || "??";
		this._topAppBar.subhead = this._warband.type || "Unknown";

		// add leader list
		this._leaderCounter.label = (this._warband.hasLeader() ? "1" : "0") + " of 1";
		this._container.appendChild(this._leaderHeading);
		if (this._warband.hasLeader()) {
			const card = new WarbandMemberSummaryCard();
			card.warbandMember = this._warband.leader;
			dom.appendView(this._container, card);
		} else {
			dom.appendView(this._container, this._hireLeaderButton);
		}

		// add hero list
		this._heroCounter.label = this._warband.heroCount() + " of " + this._warband.availableHeroSlots;
		this._container.appendChild(this._heroHeading);
		this._warband.heros
			.map((hero) => {
				const card = new WarbandMemberSummaryCard();
				card.warbandMember = hero;
				return card;
			})
			.forEach((card) => dom.appendView(this._container, card));
		if (this._warband.heroCount() < this._warband.availableHeroSlots) {
			dom.appendView(this._container, this._hireHeroButton);
		}

		// add henchmen list
		this._henchmenCounter.label = this._warband.henchmenCount() + " of " + this._warband.availableHenchmenSlots;
		this._container.appendChild(this._henchmenHeading);
		this._warband.henchmen
			.map((henchmen) => {
				const card = new WarbandMemberSummaryCard();
				card.warbandMember = henchmen;
				return card;
			})
			.forEach((card) => dom.appendView(this._container, card));
		if (this._warband.henchmenCount() < this._warband.availableHenchmenSlots) {
			dom.appendView(this._container, this._hireHenchmenButton);
		}

		// add hired swords list
		this._hiredSwordCounter.label = "0 of ∞";
		// this._container.appendChild(this._hiredSwordHeading);
		// dom.appendView(this._container, this._hireHiredSwordButton);

		// add dramatic persona list
		this._dramaticPersonaCounter.label = "0 of ∞";
		// this._container.appendChild(this._dramaticPersonaHeading);
		// dom.appendView(this._container, this._hireDramaticPersonaButton);
	}

	public onDomUnload() {}

	public htmlElements(): Array<HTMLElement> {
		return [...this._topAppBar.htmlElements(), /*...this._fab.htmlElements(),*/ this._container];
	}
}
