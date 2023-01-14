import BottomSheet from "../elements/bottom-sheet";

export default class WyrdstoneBottomSheet extends BottomSheet {
	public constructor(withWyrdstoneAmount: number) {
		super();

		this.title = "Wyrdstone Fragments";

		const p = document.createElement("p");
		p.textContent = `Your warband currently has ${withWyrdstoneAmount ? withWyrdstoneAmount : "no"} Wyrdstone Fragment${
			withWyrdstoneAmount == 1 ? "" : "s"
		}.`;
		this.appendNode(p);
	}
}
