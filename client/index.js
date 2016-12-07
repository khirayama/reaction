/* eslint-env browser */

const createElement = require('react').createElement;
const ReactDOM = require('react-dom');

const Store = require('universal/store');

const ApplicationContainer = require('universal/views/application-container');

const i18n = require('universal/locales');
const changeLocation = require('universal/actions/application-action-creators').changeLocation;

window.addEventListener('popstate', () => {
  changeLocation(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.locale);

  const store = new Store(window.state);

  ReactDOM.render(createElement(ApplicationContainer, {store}), document.querySelector('.application'));
});
