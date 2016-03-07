import {Dispatcher} from 'flux';

// Create dispatcher instance
var appDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
appDispatcher.handleAction = function(action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
};

export default appDispatcher;
