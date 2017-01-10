import gulp           from 'gulp';
import gulpCleanCss   from 'gulp-clean-css';
import gulpHtmlmin    from 'gulp-htmlmin';
import gulpPostcss    from 'gulp-postcss';
import gulpSourcemaps from 'gulp-sourcemaps';
import postcssCssnext from 'postcss-cssnext';
import postcssImport  from 'postcss-import';
import stylelint      from 'stylelint';

const dirs = {
  source: './source',
  dest  : './dist'
};

gulp.task('css', () => {
  return gulp.src(`${dirs.source}/assets/css/style.css`)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpPostcss([
      postcssImport(),
      postcssCssnext({
        features: {
          rem: false
        }
      })
    ]))
    .pipe(gulpCleanCss())
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(`${dirs.dest}/assets/css`));
});

gulp.task('html', () => {
  return gulp.src(`${dirs.source}/**/*.html`)
    .pipe(gulpHtmlmin({
      caseSensitive                : false,
      collapseBooleanAttributes    : true,
      collapseInlineTagWhitespace  : true,
      collapseWhitespace           : true,
      conservativeCollapse         : false,
      decodeEntities               : false,
      html5                        : true,
      includeAutoGeneratedTags     : false,
      keepClosingSlash             : false,
      minifyCSS                    : true,
      minifyJS                     : true,
      minifyURLs                   : true,
      preserveLineBreaks           : false,
      preventAttributesEscaping    : false,
      processConditionalComments   : false,
      processScripts               : false,
      quoteCharacter               : false,
      removeAttributeQuotes        : true,
      removeComments               : true,
      removeEmptyAttributes        : true,
      removeEmptyElements          : true,
      removeOptionalTags           : true,
      removeRedundantAttributes    : true,
      removeScriptTypeAttributes   : true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace          : true,
      sortAttributes               : true,
      sortClassName                : true,
      trimCustomFragments          : true,
      useShortDoctype              : true
    }))
    .pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('lint:css', () => {
  return gulp.src(`${dirs.source}/assets/css/**/*.css`)
    .pipe(gulpPostcss([
      stylelint()
    ]));
})

gulp.task('watch', () => {
  gulp.watch(`${dirs.source}/**/*.html`, ['html']);
  gulp.watch(`${dirs.source}/assets/css/**/*.css`, ['lint:css', 'css']);
});

gulp.task('default', [
  'lint',
  'css',
  'html',
  'watch'
]);

gulp.task('lint', [
  'lint:css'
]);

gulp.task('build', [
  'lint',
  'css',
  'html'
]);
