// universal
import React from 'react';
import {renderToString} from 'react-dom/server';

import {unsubscribeAll} from 'universal/libs/micro-dispatcher';
import Store from 'universal/store';
import ApplicationContainer from 'universal/views/application-container';
import {startApplication} from 'universal/actions/application-action-creators';

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${state.title}</title>
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

export function applicationHandler(req, res) {
  unsubscribeAll();

  const store = new Store();
  store.ready(() => {
    const content = renderToString(<ApplicationContainer store={store}/>);
    res.send(layout(content, store.getState()));
  });

  startApplication(req.path);
}
