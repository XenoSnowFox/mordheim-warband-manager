export default interface View {
	onDomLoad: () => void;
	onDomUnload: () => void;
	htmlElements: () => Array<HTMLElement>;
}
