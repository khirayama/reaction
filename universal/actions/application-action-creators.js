import {dispatch} from 'universal/libs/micro-dispatcher';
import types from 'universal/constants/action-types';

function updateTitle(title) {
  return new Promise(resolve => {
    dispatch({
      type: types.UPDATE_TITLE,
      title,
    });
    resolve();
  });
}

function fetchPosts() {
  const posts = [];
  for (let index = 0; index < 100; index++) {
    posts.push({
      id: index,
      title: `POST TITLE ${index}`,
      description: 'hoge hoge hoge hoge',
    });
  }
  return new Promise(resolve => {
    dispatch({
      type: types.FETCH_POSTS,
      posts,
    });
    resolve();
  });
}

function fetchActivities() {
  const activities = [];
  for (let index = 0; index < 100; index++) {
    const names = [
      'hirayam',
      'izumiya',
      'yamaguchi',
      'ichikawa',
      'matsuda',
      'kaneko',
    ];
    const name = names[Math.floor(Math.random() * names.length)];

    const postNames = [
      '政治について考えてみた',
      '経済について考えて見た',
      'プログラミングについて考えて見た',
      'Rubyについて考えて見た',
      'サービスについて考えて見た',
      '開発について考えて見た',
      'マネタイズについて考えて見た',
    ];
    const postName = postNames[Math.floor(Math.random() * postNames.length)];

    const activityTypes = [
      'いいね!',
      'コメント!',
      'ブックマーク!',
      'あとで読む!',
    ];
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];

    activities.push({
      id: index,
      type: activityType,
      user: {name},
      post: {name: postName},
    });
  }
  return new Promise(resolve => {
    dispatch({
      type: types.FETCH_ACTIVITIES,
      activities,
    });
    resolve();
  });
}

function initializePage(pathname) {
  switch (pathname) {
    case '/':
      updateTitle('Top');
      fetchPosts();
      fetchActivities();
      break;
    case '/dashboard':
      updateTitle('Dashboard');
      break;
    default:
      updateTitle('Not Found');
      break;
  }
}

export function startApplication(pathname) {
  initializePage(pathname);
  dispatch({
    type: types.START_APP,
    pathname,
  });
}

export function changeLocation(pathname) {
  initializePage(pathname);
  dispatch({
    type: types.CHANGE_LOCATION,
    pathname,
  });
}
