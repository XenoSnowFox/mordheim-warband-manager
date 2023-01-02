import { SvgElement } from "./svg-element";

const domParser = new DOMParser();
const parseSvg =
	(svg: string): (() => SvgElement) =>
	() =>
		domParser.parseFromString(svg, "image/svg+xml").documentElement;

export default {
	plus: parseSvg(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>'
	),
};
