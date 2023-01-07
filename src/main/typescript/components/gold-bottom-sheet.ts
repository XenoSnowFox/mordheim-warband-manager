import BottomSheet from "../elements/bottom-sheet";

export default class GoldBottomSheet extends BottomSheet {
	public constructor(withGoldCrownsAmount: number) {
		super();

		const p = document.createElement("p");
		p.textContent = `Your warband current has ${withGoldCrownsAmount} Gold Crowns.`;
		this.appendNode(p);
	}
}
