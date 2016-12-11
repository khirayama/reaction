const browserSync = require('browser-sync');
const bs = browserSync.create();

bs.init({
  ui: false,
  port: 3001,
  proxy: 'localhost:3000',
  open: false,
});
bs.watch('dist/**/*').on('change', bs.reload);
