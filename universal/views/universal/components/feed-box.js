import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class FeedBox extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 'posts',
      selectedPostId: null,
      selectedActivityId: null,
    };

    this.handleClickTabButton = this._handleClickTabButton.bind(this);
    this.handleClickPostListItem = this._handleClickPostListItem.bind(this);
    this.handleClickActivityListItem = this._handleClickActivityListItem.bind(this);
  }
  _handleClickTabButton(event) {
    const activeTab = event.currentTarget.name;
    this.setState({activeTab});
  }
  _handleClickPostListItem(event) {
    this.setState({selectedPostId: event.currentTarget.value});
  }
  _handleClickActivityListItem(event) {
    this.setState({selectedActivityId: event.currentTarget.value});
  }
  render() {
    let content = null;
    switch (this.state.activeTab) {
      case 'posts':
        content = this.props.posts.map(post => {
          if (post.id === this.state.selectedPostId) {
            return (
              <li key={post.id} onClick={this.handleClickPostListItem} value={null}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <ul className="reaction-list">
                  <li>いいね！</li>
                  <li>コメント</li>
                  <li>あとでよむ</li>
                  <li>ブックマーク</li>
                </ul>
              </li>
            );
          }
          return <li key={post.id} onClick={this.handleClickPostListItem} value={post.id}>{post.title}</li>;
        });
        break;
      case 'activities':
        content = this.props.activities.map(activity => {
          if (activity.id === this.state.selectedActivityId) {
            return (
              <li key={activity.id} onClick={this.handleClickActivityListItem} value={null}>
                <h2><a href="/">{activity.post.name}</a></h2>
                <hr/>
                <h3>{activity.user.name}さんが「{activity.post.name}」に {activity.type} しました！</h3>
                <ul className="reaction-list">
                  <li>いいね！</li>
                  <li>コメント</li>
                  <li>あとでよむ</li>
                  <li>ブックマーク</li>
                </ul>
              </li>
            );
          }
          return (
            <li key={activity.id} onClick={this.handleClickActivityListItem} value={activity.id}>
              {activity.user.name}
              さんが「
                <a href="/">{activity.post.name}</a>
              」に {activity.type} しました！
            </li>
          );
        });
        break;
      default:
        return null;
    }
    return (
      <section className="feed-box">
        <div className="feed-box-tab">
          <button
            className={classNames('feed-box-tab-button', {'feed-box-tab-button__active': this.state.activeTab === 'posts'})}
            onClick={this.handleClickTabButton}
            name="posts"
            >POSTS</button>
          <button
            className={classNames('feed-box-tab-button', {'feed-box-tab-button__active': this.state.activeTab === 'activities'})}
            onClick={this.handleClickTabButton}
            name="activities"
            >ACTIVITIES</button>
        </div>
        <ul className="feed-list">{content}</ul>
      </section>
    );
  }
}

FeedBox.propTypes = {
  posts: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
};
