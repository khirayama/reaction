const {createElement} = require('react');
const classNames = require('classnames');
const jsx = require('universal/libs/jsx-template');

const MicroContainer = require('universal/libs/micro-container');

const PageContainer = require('universal/views/universal/pages/page-container');

class ApplicationContainer extends MicroContainer {
  render() {
    const state = this.props.store.getState();

    return eval(jsx`
      <section className={classNames("application-content", state.ui)}>
        <PageContainer store={this.props.store}/>
      </section>`);
  }
}

ApplicationContainer.propTypes = {};

module.exports = ApplicationContainer;
