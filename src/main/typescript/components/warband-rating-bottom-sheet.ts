import BottomSheet from "../elements/bottom-sheet";
import WarbandModel from "../models/warband-model";

export default class WarbandRatingBottomSheet extends BottomSheet {
	public constructor(withWarband: WarbandModel) {
		super();

		this.title = "Warband Rating: " + withWarband.rating;

		const p = document.createElement("p");
		this.appendNode(p);

		const div = document.createElement("div");
		div.classList.add("mwm-component-warbandRatingBottomSheet-calculations");
		this.appendNode(div);

		const appendRow = (withLabel: string, withValue: string) => {
			const labelSpan = this.span(withLabel);
			labelSpan.classList.add(withValue == "" ? "heading" : "label");
			div.appendChild(labelSpan);

			div.appendChild(this.span(withValue != "" ? "" + withValue : ""));
		};

		// add calculations
		this.appendExperienceCalculations(withWarband, appendRow);
		this.appendMemberCountCalculations(withWarband, appendRow);
		this.appendLargeCreatureCountCalculations(withWarband, appendRow);
		this.appendHiredSwordsCountCalculations(withWarband, appendRow);
		this.appendDramatisPersonaeCountCalculations(withWarband, appendRow);

		// add divider
		div.appendChild(document.createElement("hr"));
		div.appendChild(document.createElement("hr"));

		// add grand total
		appendRow("Grand Total", "");
		appendRow("", "" + withWarband.rating);
	}

	private span(withContent: string): HTMLSpanElement {
		const span = document.createElement("span");
		span.textContent = withContent;
		return span;
	}

	private appendExperienceCalculations(withWarband: WarbandModel, appendRow: (withLabel: string, withValue: string) => void) {
		appendRow("Total Experience", "");
		appendRow("Leader", "+" + (withWarband.hasLeader() ? withWarband.leader.experience : 0).toString());
		appendRow(
			"Heros",
			"+" +
				withWarband.heros
					.map((hero) => hero.experience)
					.reduce((a, b) => a + b, 0)
					.toString()
		);
		appendRow(
			"Henchmen",
			"+" +
				withWarband.henchmen
					.map((henchmen) => henchmen.experience * henchmen.memberCount)
					.reduce((a, b) => a + b, 0)
					.toString()
		);
	}

	private appendMemberCountCalculations(withWarband: WarbandModel, appendRow: (withLabel: string, withValue: string) => void) {
		appendRow("Total Members (5 points per member)", "");
		appendRow((withWarband.hasLeader() ? "1" : "No") + " Leader", "+" + (withWarband.hasLeader() ? 5 : 0).toString());
		appendRow(
			(withWarband.heroCount() ? withWarband.heroCount() : "No") + " Hero" + (withWarband.heroCount() == 1 ? "" : "es"),
			"+" + (withWarband.heroCount() * 5).toString()
		);
		appendRow((withWarband.henchmenCount() ? withWarband.henchmenCount() : "No") + " Henchmen", "+" + (withWarband.henchmenCount() * 5).toString());
	}

	private appendLargeCreatureCountCalculations(withWarband: WarbandModel, appendRow: (withLabel: string, withValue: string) => void) {
		appendRow("Large Creatures (20 points each)", "");

		appendRow("You have no large creatures.", "+0");
	}

	private appendHiredSwordsCountCalculations(withWarband: WarbandModel, appendRow: (withLabel: string, withValue: string) => void) {
		appendRow("Hired Swords", "");

		appendRow("You have no Hired Swords.", "+0");
	}

	private appendDramatisPersonaeCountCalculations(withWarband: WarbandModel, appendRow: (withLabel: string, withValue: string) => void) {
		appendRow("Dramatis Personae", "");

		appendRow("You have no Dramatis Personae.", "+0");
	}
}
