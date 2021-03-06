import React from 'react';

import i18n from 'universal/locales';

export default function HomePage() {
  return (
    <section className="page home-page">
      <header>
        <h1>Reaction</h1>
        <p>{i18n.t('home.description')}</p>
        <a href="/auth/twitter">Login with Twitter</a>
      </header>
      <div className="lang-list-container">
        <ul className="lang-list">
          <li><a href="?lang=en"><small>English</small></a></li>
          <li><a href="?lang=ja"><small>日本語</small></a></li>
        </ul>
      </div>
    </section>
  );
}
