const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

gulp.task('build', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], () => gulp.watch('src/**/*.ts', ['build']));
