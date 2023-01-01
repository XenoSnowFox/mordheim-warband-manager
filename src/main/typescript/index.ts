import localStorageAvailable from "./utils/local-storage-available";
import FullPageError from "./components/full-page-error";

// run main application
(() => {
	// The app requires the use of local storage in order to persist data.
	if (!localStorageAvailable()) {
		FullPageError.withMessage("Your browser is unable to run this application.").appendTo(document.body);
		return;
	}

	// do any initial setup

	// run the application
})();
