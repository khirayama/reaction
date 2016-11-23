import React from 'react';

import MicroContainer from 'universal/libs/micro-container';

import PageContainer from 'universal/views/page-container';

export default class Container extends MicroContainer {
  render() {
    return (
      <section className="application-content">
        <PageContainer store={this.props.store}/>
      </section>
    );
  }
}

Container.propTypes = {};
