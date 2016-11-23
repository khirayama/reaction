import React, {Component, PropTypes} from 'react';

export default class FeedBox extends Component {
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
