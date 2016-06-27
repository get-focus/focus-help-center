const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge = require('merge2');
const clip = require('gulp-clip-empty-files');

gulp.task('build', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    const tsResult = gulp.src(['src/**/*.ts', 'src/**/*.d.ts', 'typings/**/*.ts', '!src/**/__tests__/**'])
        .pipe(ts(tsProject));
    return merge([
        tsResult.dts,
        tsResult.js.pipe(babel())
    ])
    .pipe(clip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], () => gulp.watch('src/**/*.ts', ['build']));
