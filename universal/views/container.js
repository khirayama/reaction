import React, {Component, PropTypes} from 'react';

import {dispatch} from 'universal/libs/micro-dispatcher';
import types from 'universal/constants/action-types';

import MicroContainer from 'universal/libs/micro-container';

import Link from 'universal/views/universal/components/link.js';
import FeedBox from 'universal/views/universal/components/feed-box.js';

export default class Container extends MicroContainer {
  _updateTitle(title) {
    window.document.title = title;
  }
  render() {
    const state = this.props.store.getState();

    if (typeof window === 'object') {
      this._updateTitle(state.title);
    }

    switch (state.pathname) {
      case '/':
        return (
          <section>
            <FeedBox posts={state.posts} activities={state.activities} />
          </section>
        );
      case '/dashboard':
        return (
          <section>
            <h1>Dashboard</h1>
            <Link href="/">to top</Link>
          </section>
        );
      default:
        return (
          <section>
            <h1>Not Found</h1>
            <Link href="/">to top</Link>
          </section>
        );
    }
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
