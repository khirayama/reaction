const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');

const postcss = require('gulp-postcss');
const csseasyimport = require('postcss-easy-import');
const csssimplevars = require('postcss-simple-vars');
const cssnested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const SRC_ROOT = 'client';
const DIST_ROOT = 'server/public';

const options = {
  scripts: {
    browserify: {
      entries: ['tmp/client/index.js'],
    },
    watchify: {
      entries: ['tmp/client/index.js'],
      debug: true,
      cache: {},
      packageCache: {},
      plugin: [watchify],
    },
  },
  styles: {
    csseasyimport: {
      glob: true
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
    },
  },
};

function buildStyles(isWatch) {
  function build() {
    console.log('build: styles');
    console.time('timer');

    const processors = [
      csseasyimport(options.styles.csseasyimport),
      csssimplevars,
      cssnested,
      autoprefixer(options.styles.autoprefixer),
      cssnano,
    ];
    return gulp.src('src/client/styles/index.css')
      .pipe(plumber())
      .pipe(postcss(processors))
      .pipe(gulp.dest('dist/public'))
      .on('end', () => {
        console.log('finish to build: styles');
        console.timeEnd('timer');
      });
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch('src/**/*.css', build);
    };
  }
  return () => {
    build();
  };
}

function buildScripts(isWatch) {
  const options_ = (isWatch) ? options.scripts.watchify : options.scripts.browserify;
  const bundler = browserify(options_);

  function build() {
    return () => {
      console.log('build: scripts');
      console.time('timer');
      bundler.bundle().on('error', error => {
        console.error(error.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist/public'))
      .on('end', () => {
        console.log('finish to build: scripts');
        console.timeEnd('timer');
      });
    };
  }

  bundler.on('update', build());
  return build();
}

function copyFiles(isWatch) {
  function copy() {
    return gulp.src('src/**/*.{csv,json,ico,txt,woff2}')
      .pipe(changed('tmp'))
      .pipe(gulp.dest('tmp'));
  }

  if (isWatch) {
    return () => {
      copy();
      gulp.watch(`src/**/*.{csv,json,ico,txt,woff2}`, copy);
    };
  }
  return () => {
    copy();
  };
}

function copyUniversalToDist(isWatch) {
  function copy() {
    return gulp.src('tmp/universal/**/*')
      .pipe(changed('dist/universal'))
      .pipe(gulp.dest('dist/universal'));
  };

  if (isWatch) {
    return () => {
      copy();
      gulp.watch('tmp/universal/**/*', copy);
    };
  }
  return () => {
    copy();
  };
}

function copyServerToDist(isWatch) {
  function copy() {
    return gulp.src('tmp/server/**/*.js')
      .pipe(changed('dist'))
      .pipe(gulp.dest('dist'));
  };

  if (isWatch) {
    return () => {
      copy();
      gulp.watch('tmp/server/**/*.js', copy);
    };
  }
  return () => {
    copy();
  };
}

function buildFiles(isWatch) {
  function build() {
    console.log('build: files');
    console.time('timer');

    return gulp.src('src/client/**/*.{csv,json,ico,txt,woff2}')
      .pipe(plumber())
      .pipe(gulp.dest('dist/public'))
      .on('end', () => {
        console.log('finish to build: files');
        console.timeEnd('timer');
      });
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch(`src/client/**/*.{csv,json,ico,txt,woff2}`, build);
    };
  }
  return () => {
    build();
  };
}

// tasks
gulp.task('copy:files', copyFiles(false));
gulp.task('copy:files:watch', copyFiles(true));

gulp.task('copy:universal', copyUniversalToDist(false));
gulp.task('copy:universal:watch', copyUniversalToDist(true));

gulp.task('copy:server', copyServerToDist(false));
gulp.task('copy:server:watch', copyServerToDist(true));

gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
gulp.task('build:scripts', ['copy:universal', 'copy:server'], buildScripts(false));
gulp.task('watch:scripts', ['copy:universal:watch', 'copy:server:watch'], buildScripts(true));
gulp.task('build:files', buildFiles(false));
gulp.task('watch:files', buildFiles(true));
gulp.task('build', ['build:styles', 'build:scripts', 'build:files']);
gulp.task('watch', ['watch:styles', 'watch:scripts', 'build:files']);
