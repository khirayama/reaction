const {Component, createElement, PropTypes} = require('react');
const jsx = require('universal/libs/jsx-template');

const Link = require('universal/views/universal/components/link');
const IconButton = require('universal/views/universal/components/icon-button');

class ApplicationHeader extends Component {
  render() {
    return eval(jsx`
      <section className="application-header">
        <Link href="/setting" className="setting-link link__plain">
          <div className="setting-link-content"/>
        </Link>
        <div className="search-button-container">
          <IconButton className="search-button">search</IconButton>
        </div>
      </section>
    `);
  }
}

class FeedContainer extends Component {
  render() {
    return eval(jsx`
      <section className="feed">
        <FeedTab/>
        <section className="feed-list-container">
          <FeedList/>
        </section>
      </section>
    `);
  }
}

class FeedTab extends Component {
  render() {
    return eval(jsx`
      <ul className="feed-tab">
        <li className="feed-tab-item feed-tab-item__active">
          <i className="icon">library_books</i>
        </li>
        <li className="feed-tab-item">
          <i className="icon">question_answer</i>
        </li>
      </ul>
    `);
  }
}

class FeedList extends Component {
  render() {
    const items = [];
    for (let index = 0; index < 100; index++) {
      items.push({id: index, title: `Feed ${index}`});
    }
    return eval(jsx`<ul className="feed-list">{items.map(item => <FeedListItem key={item.id} feed={item}/>)}</ul>`);
  }
}

class FeedListItem extends Component {
  render() {
    const feed = this.props.feed;

    return eval(jsx`
      <li className="feed-list-item">
        <span className="feed-list-item-title">{feed.title}</span>
        <ReactionList/>
      </li>
    `);
  }
}
FeedListItem.propTypes = {
  feed: PropTypes.object.isRequired,
};

class ReactionList extends Component {
  render() {
    return eval(jsx`
      <ul className="reaction-list">
        <li className="reaction-list-item"><i className="icon">favorite</i></li>
        <li className="reaction-list-item"><i className="icon">comment</i></li>
        <li className="reaction-list-item"><i className="icon">watch_later</i></li>
        <li className="reaction-list-item"><i className="icon">bookmark</i></li>
      </ul>
    `);
  }
}

function FeedPage() {
  return eval(jsx`
    <section className="page feed-page">
      <section className="page-content">
        <ApplicationHeader/>
        <FeedContainer/>
      </section>
    </section>
  `);
}

module.exports = FeedPage;
