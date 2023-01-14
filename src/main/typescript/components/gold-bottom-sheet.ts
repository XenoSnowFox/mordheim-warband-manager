import BottomSheet from "../elements/bottom-sheet";

export default class GoldBottomSheet extends BottomSheet {
	public constructor(withGoldCrownsAmount: number) {
		super();

		this.rootElement.classList.add("mwm-component-goldBottomSheet");

		this.title = "Gold Crowns";

		const p = document.createElement("p");
		p.textContent = `Your warband currently has ${withGoldCrownsAmount ? withGoldCrownsAmount : "no"} Gold Crown${
			withGoldCrownsAmount == 1 ? "" : "s"
		}.`;
		this.appendNode(p);
	}
}
