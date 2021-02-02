const gulp = require("gulp"); 
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

// 자바스크립트 파일 minify
gulp.task("uglify", function () {
    return gulp.src("src/js/*.js")         // js 폴더 아래의 모든 js 파일을
        .pipe(uglify())                    // minify 해서
        .pipe(rename({ 
            suffix: ".min" 
        }))             
        .pipe(gulp.dest("dist/js"));       // dist/js 폴더에 저장
});

// watch(파일 변경 감지)
gulp.task("watch", function () {
    // js 디렉토리 안에 js 확장자를 가진 파일이 변경되면 uglify task 실행
    // gulp.series("uglify")를 통해 직렬로 uglify가 실행
    gulp.watch("src/js/*.js", gulp.series("uglify"));
});

// gulp를 실행하면 default 로 uglify task를 실행 
// gulp.parallel에 의해 병렬로 uglify와 watch가 실행
gulp.task("default", gulp.parallel("uglify", "watch"));