const createElement = require('react').createElement;

const i18n = require('universal/locales');

function HomePage() {
  return createElement('section', {
    className: "page home-page",
  },
    createElement('header', null,
      createElement('h1', null, 'Reaction'),
      createElement('p', null, i18n.t('home.description')),
      createElement('a', {href: '/auth/twitter'}, 'Login with Twitter')
    ), createElement('div', {className: 'lang-list-container'},
      createElement('ul', {className: 'lang-list'},
        createElement('li', null,
          createElement('a', {href: '?lang=en'},
            createElement('small', null, 'English'))
        ),
        createElement('li', null,
          createElement('a', {href: '?lang=ja'},
            createElement('small', null, '日本語'))
        )
      )
    )
  );
}

module.exports = HomePage;
