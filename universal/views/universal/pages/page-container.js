/* eslint-env browser */

const {createElement} = require('react');
const jsx = require('universal/libs/jsx-template');

const MicroContainer = require('universal/libs/micro-container');

const HomePage = require('universal/views/universal/pages/home-page');
const FeedPage = require('universal/views/universal/pages/feed-page');
const StyleguidePage = require('universal/views/universal/pages/styleguide-page');
const Link = require('universal/views/universal/components/link');

class PageContainer extends MicroContainer {
  _updateTitle(title) {
    window.document.title = title;
  }
  _createPageElement() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        if (!state.isAuthenticated) {
          return eval(jsx`<HomePage state={state}/>`);
        }
        return eval(jsx`<FeedPage state={state}/>`);
      case '/styleguide':
        if (!state.isAuthenticated) {
          return eval(jsx`<HomePage state={state}/>`);
        }
        return eval(jsx`<StyleguidePage state={state}/>`);
      default:
        return eval(jsx`
          <section className="page">
            <h1>Not Found</h1>
            <Link href="/">top</Link>
          </section>
        `);
    }
  }
  render() {
    const state = this.props.store.getState();
    const pageElement = this._createPageElement();

    if (typeof window === 'object') {
      this._updateTitle(state.title);
    }

    return eval(jsx`<section className="page-container">{pageElement}</section>`);
  }
}

PageContainer.propTypes = {};

module.exports = PageContainer;
