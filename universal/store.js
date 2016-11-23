import types from 'universal/constants/action-types';
import {subscribe} from 'universal/libs/micro-dispatcher';
import MicroStore from 'universal/libs/micro-store';

const READY_APPLICATION = '__READY_APPLICATION';

export default class Store extends MicroStore {
  constructor(state) {
    super();

    this.state = Object.assign({
      pathname: '',
      title: '',

      posts: null,
      activities: null,
    }, state);

    this._subscribe();
  }
  _subscribe() {
    subscribe(action => {
      switch (action.type) {
        case types.START_APP:
          this.state.pathname = action.pathname;

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
      }

      console.log(action, this.state);
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
