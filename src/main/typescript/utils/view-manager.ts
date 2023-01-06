import View from "../sdk/view";

const viewStack: Array<View> = [];
const domBody: HTMLElement = document.body;

const renderDom = () => {
	while (domBody.lastChild) {
		domBody.removeChild(domBody.lastChild);
	}

	if (viewStack.length == 0) {
		return;
	}

	const currentView = viewStack.pop();
	viewStack.push(currentView);
	currentView.htmlElements().forEach((element) => domBody.appendChild(element));

	setTimeout(() => window.scrollTo(0, 0), 1);
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

	// call the load on the new
	nextView.onDomLoad();

	// rerender the dom
	renderDom();

	window.history.pushState(null, null, document.URL);
};

const popView = () => {
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
};

window.addEventListener("popstate", (evt) => popView());

export default {
	push: pushView,
	pop: popView,
};
