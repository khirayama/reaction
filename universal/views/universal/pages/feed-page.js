import React from 'react';

import Link from 'universal/views/universal/components/link';
import IconButton from 'universal/views/universal/components/icon-button';

class ApplicationHeader extends React.Component {
  render() {
    return (
      <section className="application-header">
        <Link href="/setting" className="setting-link link__plain">
          <div className="setting-link-content"></div>
        </Link>
        <div className="search-button-container">
          <IconButton className="search-button">search</IconButton>
        </div>
      </section>
    );
  }
}

class FeedContainer extends React.Component {
  render() {
    return (
      <section className="feed">
        <FeedTab/>
        <section className="feed-list-container">
          <FeedList/>
        </section>
      </section>
    );
  }
}

class FeedTab extends React.Component {
  render() {
    return (
      <ul className="feed-tab">
        <li className="feed-tab-item feed-tab-item__active">
          <i className="icon">view_headline</i>
        </li>
        <li className="feed-tab-item">
          <i className="icon">compare_arrow</i>
        </li>
      </ul>
    );
  }
}

class FeedList extends React.Component {
  render() {
    let listItems = [];
    for (let index = 0; index < 100; index++) {
      listItems.push(<li key={index} className="feed-list-item">Feed {index}</li>);
    }
    return (
      <ul className="feed-list">{listItems}</ul>
    );
  }
}

export default function FeedPage() {
  return (
    <section className="page feed-page">
      <section className="page-content">
        <ApplicationHeader />
        <FeedContainer />
      </section>
    </section>
  );
}
