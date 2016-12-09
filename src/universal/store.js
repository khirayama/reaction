const types = require('universal/constants/action-types');
const {subscribe} = require('universal/libs/micro-dispatcher');
const MicroStore = require('universal/libs/micro-store');

const READY_APPLICATION = '__READY_APPLICATION';

class Store extends MicroStore {
  constructor(state) {
    super();

    this.state = Object.assign({
      locale: '',
      ui: '',
      pathname: '',
      title: '',
      isAuthenticated: false,

      posts: null,
      activities: null,
    }, state);

    this._subscribe();
  }
  _subscribe() {
    subscribe(action => {
      switch (action.type) {
        case types.START_APP:
          this.state.locale = action.locale;
          this.state.ui = action.ui;
          this.state.pathname = action.pathname;
          this.state.isAuthenticated = action.isAuthenticated;

          this._dispatchReady();
          break;
        case types.CHANGE_LOCATION:
          this.state.pathname = action.pathname;
          break;
        case types.UPDATE_TITLE:
          this.state.title = action.title;
          break;

        case types.FETCH_POSTS:
          this.state.posts = action.posts;
          break;

        case types.FETCH_ACTIVITIES:
          this.state.activities = action.activities;
          break;

        default:
          break;
      }

      // console.log(action, this.state);
      this.dispatchChange();
    });
  }
  _dispatchReady() {
    this.emit(READY_APPLICATION);
  }
  ready(callback) {
    this.addListener(READY_APPLICATION, callback);
  }
}

module.exports = Store;
