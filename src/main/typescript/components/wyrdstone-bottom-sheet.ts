import BottomSheet from "../elements/bottom-sheet";

export default class WyrdstoneBottomSheet extends BottomSheet {
	public constructor(withWyrdstoneAmount: number) {
		super();

		const p = document.createElement("p");
		p.textContent = `Your warband current has ${withWyrdstoneAmount} Wyrdstone Fragments.`;
		this.appendNode(p);
	}
}
