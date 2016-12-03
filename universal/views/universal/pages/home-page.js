import React from 'react';

import i18n from 'universal/locales';

export default function HomePage(props) {
  return (
    <section>
      <h1>Reaction</h1>
      <p>{i18n.t('description')}</p>
      <a href="/auth/twitter">Login with Twitter</a>
      <ul>
        <li><a href="?lang=en">English</a></li>
        <li><a href="?lang=ja">日本語</a></li>
      </ul>
    </section>
  );
}
