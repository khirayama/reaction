const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

const postcss = require('gulp-postcss');
const csseasyimport = require('postcss-easy-import');
const csssimplevars = require('postcss-simple-vars');
const cssnested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const options = {
  styles: {
    csseasyimport: {
      glob: true,
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
    },
  },
};

function buildStyles(isWatch) {
  function build() {
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
      .pipe(gulp.dest('dist/public'));
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

function copyFiles(src, dist, isWatch) {
  function copy() {
    return gulp.src(src)
      .pipe(changed(dist))
      .pipe(gulp.dest(dist));
  }

  if (isWatch) {
    return () => {
      copy();
      gulp.watch(src, copy);
    };
  }
  return () => {
    copy();
  };
}

// tasks
gulp.task('copy:tmp', copyFiles('src/**/*.{csv,json,ico,txt,woff2}', 'tmp', false));
gulp.task('copy:tmp:watch', copyFiles('src/**/*.{csv,json,ico,txt,woff2}', 'tmp', true));
gulp.task('copy:server', copyFiles('tmp/server/**/*.js', 'dist', false));
gulp.task('copy:server:watch', copyFiles('tmp/server/**/*.js', 'dist', true));
gulp.task('copy:universal', copyFiles('tmp/universal/**/*', 'dist/universal', false));
gulp.task('copy:universal:watch', copyFiles('tmp/universal/**/*', 'dist/universal', true));
gulp.task('copy:assets', copyFiles('src/client/assets/**/*', 'dist/public', false));
gulp.task('copy:assets:watch', copyFiles('src/client/assets/**/*', 'dist/public', true));
gulp.task('copy:files', ['copy:tmp', 'copy:server', 'copy:universal', 'copy:assets']);
gulp.task('copy:files:watch', ['copy:tmp:watch', 'copy:server:watch', 'copy:universal:watch', 'copy:assets:watch']);

gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
