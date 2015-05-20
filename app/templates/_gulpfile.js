var gulp = require('gulp');

<% if(bootstrap) { %>
gulp.task('bootstrap', function() {
	
	return gulp.src('./node_modules/bootstrap/dist/**/*.*')
		.pipe(gulp.dest('wwwroot/lib/bootstrap'));
	
});

gulp.task('default', ['bootstrap']);

<% } else { %>

gulp.task('default', function() {
	console.log('Gulp: nothing to do')
});

<% } %>

