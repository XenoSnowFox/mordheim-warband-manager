import BottomSheet from "../elements/bottom-sheet";
import Button from "../elements/button";
import TextField from "../elements/text-field";
import WordedDivider from "../elements/worded-divider";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import viewManager from "../utils/view-manager";

export default class WyrdstoneBottomSheet extends BottomSheet {
	public constructor(withWarband: WarbandModel) {
		super();

		this.rootElement.classList.add("mwm-component-wyrdstoneBottomSheet");

		this.title = "Wyrdstone Fragments";

		const adjustTextField: TextField = new TextField();
		adjustTextField.label = "Current Wyrdstone Fragments";
		adjustTextField.value = "" + withWarband.wyrdstoneFragments;
		this.appendView(adjustTextField);

		this.appendNode(document.createElement("br"));

		const updateButton: Button = new Button();
		updateButton.label = "Update";
		updateButton.onClick = () => {
			const newAmount = Math.max(0, parseInt(adjustTextField.value));
			withWarband.addWyrdstoneFragments(newAmount - withWarband.wyrdstoneFragments);
			warbandRepository.store(withWarband);
			viewManager.pop();
		};
		this.appendView(updateButton);

		this.appendView(new WordedDivider("or"));

		const sellHeading = document.createElement("h3");
		sellHeading.textContent = "Sell Wyrdstone";
		this.appendNode(sellHeading);

		const sellTextField: TextField = new TextField();
		sellTextField.label = "Amount to sell";
		sellTextField.value = "";
		sellTextField.onChange = (textField) =>
			(sellButton.label = "Sell for " + this.calculateSellPrice(withWarband.totalMemberCount, parseInt(textField.value)) + " Gold Crowns");
		this.appendView(sellTextField);

		this.appendNode(document.createElement("br"));

		const sellButton: Button = new Button();
		sellButton.label = "Sell for 0 Gold Crowns";
		sellButton.onClick = () => {
			const sellCount = Math.max(0, parseInt(sellTextField.value));
			withWarband.addWyrdstoneFragments(0 - sellCount);
			withWarband.addGoldCrowns(this.calculateSellPrice(withWarband.totalMemberCount, sellCount));
			warbandRepository.store(withWarband);
			viewManager.pop();
		};
		this.appendView(sellButton);
	}

	private calculateSellPrice(warbandSize: number, sellAmount: number): number {
		if (sellAmount <= 0) {
			return 0;
		}

		const buckets = [
			[45, 60, 75, 90, 110, 120, 145, 155],
			[40, 55, 70, 80, 100, 110, 130, 140],
			[35, 50, 65, 70, 90, 100, 120, 130],
			[30, 45, 60, 65, 80, 90, 110, 120],
			[30, 40, 55, 60, 70, 80, 100, 110],
			[25, 35, 50, 55, 65, 70, 90, 100],
		];

		const bucket = Math.min(Math.floor((warbandSize - 1) / 3), buckets.length - 1);

		const tiers = buckets[bucket];

		return tiers[Math.min(sellAmount, 8) - 1];
	}
}
