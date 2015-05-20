var gulp = require('gulp');

gulp.task('bootstrap', function() {
	
	return gulp.src('./node_modules/bootstrap/dist/**/*.*')
		.pipe(gulp.dest('wwwroot/lib/bootstrap'));
	
});

gulp.task('default', ['bootstrap']);