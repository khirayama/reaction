/* eslint-env browser */

const createElement = require('react').createElement;

const MicroContainer = require('universal/libs/micro-container');

const HomePage = require('universal/views/universal/pages/home-page');
const FeedPage = require('universal/views/universal/pages/feed-page');
const StyleguidePage = require('universal/views/universal/pages/styleguide-page');
const Link = require('universal/views/universal/components/link.js');

class PageContainer extends MicroContainer {
  _updateTitle(title) {
    window.document.title = title;
  }
  _createPageElement() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        if (!state.isAuthenticated) {
          return createElement(HomePage, {state});
        }
        return createElement(FeedPage, {state});
      case '/styleguide':
        if (!state.isAuthenticated) {
          return createElement(HomePage, {state});
        }
        return createElement(StyleguidePage, {state});
      default:
        return createElement('section', {className: 'page'},
          createElement('h1', null, 'Not found.'),
          createElement(Link, {href: '/'}, 'top')
        );
    }
  }
  render() {
    const state = this.props.store.getState();
    const pageElement = this._createPageElement();

    if (typeof window === 'object') {
      this._updateTitle(state.title);
    }

    return createElement('section', {className: "page-container"}, pageElement);
  }
}

PageContainer.propTypes = {};

module.exports = PageContainer;
