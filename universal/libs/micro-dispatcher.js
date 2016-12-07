const EventEmitter = require('events').EventEmitter;

const ACTION_DISPATCH = '__ACTION_DISPATCH';

const dispatcher = new EventEmitter();

function dispatch(action) {
  dispatcher.emit(ACTION_DISPATCH, action);
}

function subscribe(callback) {
  dispatcher.addListener(ACTION_DISPATCH, callback);
}

function unsubscribeAll() {
  dispatcher.removeAllListeners();
}

module.exports = {
  dispatch,
  subscribe,
  unsubscribeAll
};
