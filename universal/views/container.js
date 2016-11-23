import React, {Component, PropTypes} from 'react';

import {dispatch} from 'universal/libs/micro-dispatcher';
import types from 'universal/constants/action-types';

import {changeLocation} from 'universal/actions/application-action-creators';

class Link extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.preventDefault();

    const pathname = this.props.href;

    if (history) {
      history.pushState(null, null, pathname);
    }
    changeLocation(pathname);
  }
  render() {
    return <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>;
  }
}

class FeedBox extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 'posts',
      selectedPostId: null,
      selectedActivityId: null,
    };
  }
  render() {
    let content = null;
    switch(this.state.activeTab) {
      case 'posts':
        content = this.props.posts.map((post) => {
          if (post.id === this.state.selectedPostId) {
            return (
              <li key={post.id} onClick={() => this.setState({selectedPostId: null})}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <ul className="response-list">
                  <li>いいね！</li>
                  <li>コメント</li>
                  <li>あとでよむ</li>
                  <li>ブックマーク</li>
                </ul>
              </li>
            );
          } else {
            return <li key={post.id} onClick={() => this.setState({selectedPostId: post.id})}>{post.title}</li>;
          }
        });
        break;
      case 'activities':
        content = this.props.activities.map((activity) => {
          if (activity.id === this.state.selectedActivityId) {
          return (
            <li key={activity.id} onClick={() => this.setState({selectedActivityId: null})}>
              <h2><a href="/">{activity.post.name}</a></h2>
              <hr/>
              <h3>{activity.user.name}さんが「{activity.post.name}」に {activity.type} しました！</h3>
              <ul className="response-list">
                <li>いいね！</li>
                <li>コメント</li>
                <li>あとでよむ</li>
                <li>ブックマーク</li>
              </ul>
            </li>
            );
          }
          return (
            <li key={activity.id} onClick={() => this.setState({selectedActivityId: activity.id})}>
              {activity.user.name}
              さんが「
                <a href="/">{activity.post.name}</a>
              」に {activity.type} しました！
            </li>
            );
        })
        break;
    }
    return (
      <section className="FeedBox">
        <div className="tab">
          <button className={(this.state.activeTab === 'posts') ? 'active' : ''} onClick={() => this.setState({activeTab: 'posts'})}>POSTS</button>
          <button className={(this.state.activeTab === 'activities') ? 'active' : ''} onClick={() => this.setState({activeTab: 'activities'})}>ACTIVITIES</button>
        </div>
        <ul className="feed-list">{content}</ul>
      </section>
    );
  }
}

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }
  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
  }
  _updateState() {
    this.setState({store: this.props.store});
  }
  getStore() {
    return this.props.store;
  }
  updateTitle(title) {
    window.document.title = title;
  }
  render() {
    const state = this.props.store.getState();

    if (typeof window === 'object') {
      this.updateTitle(state.title);
    }

    switch (state.pathname) {
      case '/':
        return (
          <section>
            <FeedBox posts={state.posts} activities={state.activities} />
          </section>
        );
      case '/dashboard':
        return (
          <section>
            <h1>Dashboard</h1>
            <Link href="/">to top</Link>
          </section>
        );
      default:
        return (
          <section>
            <h1>Not Found</h1>
            <Link href="/">to top</Link>
          </section>
        );
    }
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
