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
  _createPageContainer() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        return (
          <section className="page">
            <Link href="/dashboard">to dashboard</Link>
            <FeedBox posts={state.posts} activities={state.activities} />
          </section>
        );
      case '/dashboard':
        return (
          <section className="page">
            <h1>Dashboard</h1>
            <Link href="/">to top</Link>
          </section>
        );
      default:
        return (
          <section className="page">
            <h1>Not Found</h1>
            <Link href="/">to top</Link>
          </section>
        );
    }
  }
  render() {
    const state = this.props.store.getState();
    const pageContainer = this._createPageContainer();

    if (typeof window === 'object') {
      this._updateTitle(state.title);
    }

    return (
      <section className="application-content">
        <section className="page-container">{pageContainer}</section>
      </section>
    );
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
