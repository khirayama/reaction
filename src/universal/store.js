import types from 'universal/constants/action-types';
import {subscribe} from 'universal/libs/micro-dispatcher';
import MicroStore from 'universal/libs/micro-store';

const READY_APPLICATION = '__READY_APPLICATION';

export default class Store extends MicroStore {
  constructor(state) {
    super();

    this.state = Object.assign({
      locale: '',
      ui: '',
      pathname: '',
      title: '',
      isAuthenticated: false,

      posts: null,
      reactions: null,
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

        case types.FETCH_REACTIONS:
          this.state.reactions = action.reactions;
          break;

        default:
          break;
      }

      console.log('%cAction:', 'color: red; font-weight: bold;', action);
      console.log('%cState:', 'color: blue; font-weight: bold;', this.state);
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
