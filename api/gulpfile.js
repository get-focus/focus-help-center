const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

gulp.task('build', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(["src/**/*.ts", "typings/**/*.ts", "!src/**/__tests__/**"])
        .pipe(ts(tsProject))
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], () => gulp.watch('src/**/*.ts', ['build']));
