import BottomSheet from "../elements/bottom-sheet";
import View from "../sdk/view";
import dom from "./dom";

interface VisibleNodes {
	bottomSheet?: BottomSheet;
}

const viewStack: Array<View> = [];
const visibleNodes: VisibleNodes = {};
const domBody: HTMLElement = document.body;

const renderDom = () => {
	while (domBody.lastChild) {
		domBody.removeChild(domBody.lastChild);
	}

	if (viewStack.length != 0) {
		const currentView = viewStack.pop();
		viewStack.push(currentView);
		dom.appendView(domBody, currentView);
	}

	visibleNodes.bottomSheet && domBody.appendChild(visibleNodes.bottomSheet.rootElement);
};

const pushView = (nextView: View) => {
	window.history.pushState(null, null, document.URL);

	// call the unload on the previous
	if (viewStack.length > 0) {
		const currentView = viewStack.pop();
		viewStack.push(currentView);
		currentView.onDomUnload();
	}

	// add the new view
	viewStack.push(nextView);

	// call the load on the new
	nextView.onDomLoad();

	// rerender the dom
	renderDom();

	setTimeout(() => window.scrollTo(0, 0), 1);
};

const popView = () => {
	if (visibleNodes.bottomSheet) {
		removeBottomSheet();
		return;
	}

	// no items to remove
	if (viewStack.length <= 1) {
		return;
	}

	// remove the last view added
	const previousView = viewStack.pop();
	previousView.onDomUnload();

	// call the load on the new
	const currentView = viewStack.pop();
	viewStack.push(currentView);
	currentView.onDomLoad();

	// rerender the dom
	renderDom();

	setTimeout(() => window.scrollTo(0, 0), 1);
};

const addBottomSheet = (withBottomSheet: BottomSheet) => {
	window.history.pushState(null, null, document.URL);

	removeBottomSheet();

	visibleNodes.bottomSheet = withBottomSheet;

	withBottomSheet.onShow();
	domBody.appendChild(visibleNodes.bottomSheet.rootElement);
};

const removeBottomSheet = () => {
	if (!visibleNodes.bottomSheet) {
		return;
	}

	visibleNodes.bottomSheet.onDismiss();
	visibleNodes.bottomSheet.rootElement.remove();
	delete visibleNodes.bottomSheet;
};

window.addEventListener("popstate", (evt) => popView());

export default {
	push: pushView,
	pop: popView,

	showBottomSheet: addBottomSheet,
};
