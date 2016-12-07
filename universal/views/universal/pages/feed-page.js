const Component = require('react').Component;
const PropTypes = require('react').PropTypes;
const createElement = require('react').createElement;

const Link = require('universal/views/universal/components/link');
const IconButton = require('universal/views/universal/components/icon-button');

class ApplicationHeader extends Component {
  render() {
    return createElement('section', { className: 'application-header' },
      createElement(Link, {
        href: '/setting',
        className: 'setting-link link__plain'
      },
        createElement('div', { className: 'setting-link-content' })
      ),
      createElement('div', { className: 'search-button-container' },
        createElement(IconButton, { className: 'search-button' }, 'search')
      )
    );
  }
}

class FeedContainer extends Component {
  render() {
    return createElement('section', { className: 'feed' },
      createElement(FeedTab, null),
      createElement('section',{ className: 'feed-list-container' },
        createElement(FeedList, null)
      )
    );
  }
}

class FeedTab extends Component {
  render() {
    return createElement('ul', { className: 'feed-tab' },
      createElement('li',{ className: 'feed-tab-item feed-tab-item__active' },
        createElement('i', { className: 'icon' },'library_books')
      ),
      createElement('li',{ className: 'feed-tab-item' },
        createElement('i',{ className: 'icon' },'question_answer')
      )
    );
  }
}

class FeedList extends Component {
  render() {
    const items = [];
    for (let index = 0; index < 1000; index++) {
      items.push({id: index, title: `Feed ${index}`});
    }
    return createElement('ul',{ className: 'feed-list' },
      items.map((item) => createElement(FeedListItem, { key: item.id, feed: item }))
    );
  }
}

class FeedListItem extends Component {
  render() {
    const feed = this.props.feed;

    return createElement('li',{ className: 'feed-list-item' },
      createElement('span',{ className: 'feed-list-item-title' },feed.title),
      createElement(ReactionList, null)
    );
  }
}
FeedListItem.propTypes = {
  feed: PropTypes.object.isRequired,
};

class ReactionList extends Component {
  render() {
    return createElement('ul', { className: 'reaction-list' },
      createElement('li',{ className: 'reaction-list-item' },
        createElement('i',{ className: 'icon' },'favorite')
      ),
      createElement('li',{ className: 'reaction-list-item' },
        createElement('i',{ className: 'icon' },'comment')
      ),
      createElement('li',{ className: 'reaction-list-item' },
        createElement('i',{ className: 'icon' },'watch_later')
      ),
      createElement('li',{ className: 'reaction-list-item' },
        createElement('i',{ className: 'icon' },'bookmark'
        )
      )
    );
  }
}

function FeedPage() {
  return createElement('section',{ className: 'page feed-page' },
    createElement('section',{ className: 'page-content' },
      createElement(ApplicationHeader, null),
      createElement(FeedContainer, null)
    )
  );
}

module.exports = FeedPage;
