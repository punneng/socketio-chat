const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('backend', () => {
  nodemon({
    script: 'build/dev-server.js',
    ext: 'js',
    ignore: [
      'node_modules/**',
      'test/**',
      'dist/**',
      'src/**',
      'api/test/**'
    ]
  })
  .on('restart', () => { console.log(`Server restarted!`) })
})

gulp.task('dev', ['backend'])
