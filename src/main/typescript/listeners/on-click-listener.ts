import View from "../sdk/view";

export default interface OnClickListener {
	onClick: (withView: View) => void;
}
