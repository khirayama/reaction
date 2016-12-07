/* eslint-env browser */

import React from 'react';

import MicroContainer from 'universal/libs/micro-container';

import HomePage from 'universal/views/universal/pages/home-page';
import FeedPage from 'universal/views/universal/pages/feed-page';
import StyleguidePage from 'universal/views/universal/pages/styleguide-page';
import Link from 'universal/views/universal/components/link.js';

export default class PageContainer extends MicroContainer {
  _updateTitle(title) {
    window.document.title = title;
  }
  _createPageElement() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        if (!state.isAuthenticated) {
          return <HomePage state={state}/>;
        }
        return <FeedPage state={state}/>;
      case '/styleguide':
        if (!state.isAuthenticated) {
          return <HomePage state={state}/>;
        }
        return <StyleguidePage state={state}/>;
      default:
        return (
          <section className="page">
            <h1>Not Found</h1>
            <Link href="/">top</Link>
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
