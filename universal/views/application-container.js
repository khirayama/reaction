const createElement = require('react').createElement;

const MicroContainer = require('universal/libs/micro-container');

const PageContainer = require('universal/views/universal/pages/page-container');

class ApplicationContainer extends MicroContainer {
  render() {
    const state = this.props.store.getState();

    return createElement(
      'section', {className: `application-content ${state.ui}`},
        createElement(PageContainer, {store: this.props.store})
    );
  }
}

ApplicationContainer.propTypes = {};

module.exports = ApplicationContainer;
