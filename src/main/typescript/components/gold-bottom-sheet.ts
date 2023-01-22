import BottomSheet from "../elements/bottom-sheet";
import Button from "../elements/button";
import TextField from "../elements/text-field";
import WarbandModel from "../models/warband-model";
import warbandRepository from "../repositories/warband-repository";
import viewManager from "../utils/view-manager";

export default class GoldBottomSheet extends BottomSheet {
	public constructor(withWarband: WarbandModel) {
		super();

		this.rootElement.classList.add("mwm-component-goldBottomSheet");

		this.title = "Gold Crowns";

		const goldCoinsTextField: TextField = new TextField();
		goldCoinsTextField.label = "Current Gold Crowns";
		goldCoinsTextField.value = "" + withWarband.goldCrowns;
		this.appendView(goldCoinsTextField);

		this.appendNode(document.createElement("br"));

		const updateButton: Button = new Button();
		updateButton.label = "Update";
		updateButton.onClick = () => {
			const newAmount = Math.max(0, parseInt(goldCoinsTextField.value));
			withWarband.addGoldCrowns(newAmount - withWarband.goldCrowns);
			warbandRepository.store(withWarband);
			viewManager.pop();
		};
		this.appendView(updateButton);
	}
}
