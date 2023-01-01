import View from "../sdk/view";

const viewStack: Array<View> = [];
const domBody: HTMLElement = document.body;

const renderDom = () => {
	while (domBody.children.length) {
		domBody.removeChild(domBody.children[0]);
	}

	if (viewStack.length == 0) {
		return;
	}

	const currentView = viewStack.pop();
	viewStack.push(currentView);
	currentView.htmlElements().forEach((element) => domBody.appendChild(element));
};

const pushView = (nextView: View) => {
	// call the unload on the previous
	if (viewStack.length > 0) {
		const currentView = viewStack.pop();
		viewStack.push(currentView);
		currentView.onDomUnload();
	}

	// add the new view
	viewStack.push(nextView);

	// rerender the dom
	renderDom();

	// call the load on the new
	nextView.onDomLoad();
};

const popView = () => {
	// no items to remove
	if (viewStack.length <= 1) {
		return;
	}

	// remove the last view added
	const previousView = viewStack.pop();
	previousView.onDomUnload();

	// rerender the dom
	renderDom();

	// call the load on the new
	const currentView = viewStack.pop();
	viewStack.push(currentView);
	currentView.onDomLoad();
};

export default {
	push: pushView,
	pop: popView,
};
