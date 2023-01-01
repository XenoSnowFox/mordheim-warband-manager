import localStorageAvailable from "./utils/local-storage-available";
import FullPageError from "./components/full-page-error";
import TestView from "./views/test";
import ViewManager from "./utils/view-manager";

// run main application
(() => {
	// The app requires the use of local storage in order to persist data.
	if (!localStorageAvailable()) {
		ViewManager.push(FullPageError.withMessage("Your browser is unable to run this application."));
		return;
	}

	// do any initial setup
	const initialView = new TestView();

	// run the application
	ViewManager.push(initialView);
})();
