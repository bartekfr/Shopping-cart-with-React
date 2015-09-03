var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _selected = 0, _updateId = false;

function setSelected(data) {
	_selected = data.index;
	_updateId = data.product.id;
}


var ProductStore = _.extend({}, EventEmitter.prototype, {
	getSelected: function(){
		return {
			selected: _selected,
			updateId: _updateId
		};
	},
	emitChange: function() {
		this.emit('change', {updateId: _updateId});
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {this.removeListener('change', callback); }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case CartConstants.SELECT_PRODUCT:
			setSelected(action.data);
			break;
		default:
			return true;
	}

	ProductStore.emitChange();
	return true;

});

module.exports = ProductStore;
