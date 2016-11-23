const gulp = require('gulp');
const plumber = require('gulp-plumber');

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
const DIST_ROOT = 'public';

const options = {
  scripts: {
    browserify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
    },
    watchify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
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

    const processors = [
      csseasyimport(options.styles.csseasyimport),
      csssimplevars,
      cssnested,
      autoprefixer(options.styles.autoprefixer),
      cssnano,
    ];
    return gulp.src(`${SRC_ROOT}/styles/index.css`)
      .pipe(plumber())
      .pipe(postcss(processors))
      .pipe(gulp.dest(DIST_ROOT));
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch(`${SRC_ROOT}/styles/**/*.css`, build);
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
      bundler.bundle().on('error', error => {
        console.error(error.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(DIST_ROOT));
    };
  }

  bundler.on('update', build());
  return build();
}

function buildFiles(isWatch) {
  function build() {
    console.log('build: files');

    return gulp.src(`${SRC_ROOT}/**/*.{csv,json,ico,txt,woff2}`)
      .pipe(plumber())
      .pipe(gulp.dest(DIST_ROOT));
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch(`${SRC_ROOT}/**/*.{csv,json,ico,txt,woff2}`, build);
    };
  }
  return () => {
    build();
  };
}

// tasks
gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
gulp.task('build:scripts', buildScripts(false));
gulp.task('watch:scripts', buildScripts(true));
gulp.task('build:files', buildFiles(false));
gulp.task('watch:files', buildFiles(true));
gulp.task('build', ['build:styles', 'build:scripts', 'build:files']);
gulp.task('watch', ['watch:styles', 'watch:scripts', 'build:files']);
