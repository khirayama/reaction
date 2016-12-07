// universal
const createElement = require('react').createElement;
const renderToString = require('react-dom/server').renderToString;

const i18n = require('universal/locales');
const Store = require('universal/store');
const ApplicationContainer = require('universal/views/application-container');
const startApplication = require('universal/actions/application-action-creators').startApplication;
const unsubscribeAll = require('universal/libs/micro-dispatcher').unsubscribeAll;

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${state.title}</title>

        <!-- standalone for android-->
        <link rel="manifest" href="manifest.json">
        <!-- standalone for ios-->
        <meta name="apple-mobile-web-app-capable" content="yes">

        <link rel="stylesheet" href="/index.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section class="application">${content}</section>
      </body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `;
}

function applicationHandler(req, res) {
  i18n.setLocale(req.getLocale());

  unsubscribeAll();

  const store = new Store();
  store.ready(() => {
    const content = renderToString(createElement(ApplicationContainer, {store}));
    res.send(layout(content, store.getState()));
  });

  startApplication(
    req.path,
    req.useragent,
    req.getLocale(),
    req.isAuthenticated()
  );
}

module.exports = {applicationHandler};
