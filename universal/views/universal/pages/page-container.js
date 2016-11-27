/* eslint-env browser */

import React from 'react';

import MicroContainer from 'universal/libs/micro-container';

import HomePage from 'universal/views/universal/pages/home-page';
import Link from 'universal/views/universal/components/link.js';
import FeedBox from 'universal/views/universal/components/feed-box.js';

export default class PageContainer extends MicroContainer {
  _updateTitle(title) {
    window.document.title = title;
  }
  _createPageElement() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        return <HomePage state={state} />;
      case '/dashboard':
        return (
          <section className="page">
            <Link href="/">to Top</Link>
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
    const pageElement = this._createPageElement();

    if (typeof window === 'object') {
      this._updateTitle(state.title);
    }

    return <section className="page-container">{pageElement}</section>;
  }
}

PageContainer.propTypes = {};
