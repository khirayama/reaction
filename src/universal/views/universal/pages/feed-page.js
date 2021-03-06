import React, {Component, PropTypes} from 'react';

import Link from 'universal/views/universal/components/link';
import IconButton from 'universal/views/universal/components/icon-button';

class ApplicationHeader extends Component {
  render() {
    return (
      <section className="application-header">
        <Link href="/setting" className="setting-link link__plain">
          <div className="setting-link-content"/>
        </Link>
        <div className="search-button-container">
          <IconButton className="search-button">search</IconButton>
        </div>
      </section>
    );
  }
}

class FeedContainer extends Component {
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

class FeedTab extends Component {
  render() {
    return (
      <ul className="feed-tab">
        <li className="feed-tab-item feed-tab-item__active">
          <i className="icon">library_books</i>
        </li>
        <li className="feed-tab-item">
          <i className="icon">question_answer</i>
        </li>
      </ul>
    );
  }
}

class FeedList extends Component {
  render() {
    const items = [];
    for (let index = 0; index < 100; index++) {
      items.push({id: index, title: `Feed ${index}`});
    }
    const itemElements = items.map(item => {
      return <FeedListItem key={item.id} feed={item}/>;
    });
    return <ul className="feed-list">{itemElements}</ul>;
  }
}

class FeedListItem extends Component {
  render() {
    const feed = this.props.feed;

    return (
      <li className="feed-list-item">
        <span className="feed-list-item-title">{feed.title}</span>
        <ReactionList/>
      </li>
    );
  }
}
FeedListItem.propTypes = {
  feed: PropTypes.object.isRequired,
};

class ReactionList extends Component {
  render() {
    return (
      <ul className="reaction-list">
        <li className="reaction-list-item"><i className="icon">favorite</i></li>
        <li className="reaction-list-item"><i className="icon">comment</i></li>
        <li className="reaction-list-item"><i className="icon">watch_later</i></li>
        <li className="reaction-list-item"><i className="icon">bookmark</i></li>
      </ul>
    );
  }
}

export default function FeedPage() {
  return (
    <section className="page feed-page">
      <section className="page-content">
        <ApplicationHeader/>
        <FeedContainer/>
      </section>
    </section>
  );
}
