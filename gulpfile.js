const gulp = require('gulp');
const plumber = require('gulp-plumber');

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

// tasks
gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
