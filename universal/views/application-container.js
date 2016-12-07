import React from 'react';

import MicroContainer from 'universal/libs/micro-container';

import PageContainer from 'universal/views/universal/pages/page-container';

export default class ApplicationContainer extends MicroContainer {
  render() {
    const state = this.props.store.getState();
    return (
      <section className={`application-content ${state.ui}`}>
        <PageContainer store={this.props.store}/>
      </section>
    );
  }
}

ApplicationContainer.propTypes = {};
