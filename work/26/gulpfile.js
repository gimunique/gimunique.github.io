/* 
 * 파일명: gulpfile.js
 * 설명: gulp 버전 4.0이상 build file
 * 작성자: EUGENE KIM
 * 참고사항: gulp 4.0부터는 Task함수를 사용하기 보다 일반 기명함수로 Task를 만들고 CommonJS 모듈 형식으로 내보내기를 권장한다.
 * 참고 url: https://gulpjs.com/docs/en/getting-started/quick-start
 * 파일 구조 예시
    |- node_modules/
    |- public/
        |- dist/
            |- css/
            |- js/
                |- lib/
        |- src
            |- scss/
            |- js/
                |- lib/
        |- index.html
    |- .babelrc
    |- gulpfile.js
    |- package.json
*/

// load plugins
const gulp = require("gulp");                           // gulp 호출
const browsersync = require("browser-sync").create();   // browser-sync 호출, create 메서드로 생성을 먼저 해줘야 함(브라우저 자동 *refresh 어플리케이션)
const del = require("del");                             // 폴더, 파일 초기화
const concat = require("gulp-concat");                  // 파일 병합
const merge = require('merge-stream');                  // 여러 stream 병합
const uglify = require("gulp-uglify");                  // js 압축
const rename = require("gulp-rename");                  // 이름 변경
const babel = require("gulp-babel");                    // js 컴파일
const sass = require("gulp-sass");                      // scss 컴파일
const autoprefixer = require('gulp-autoprefixer');      // css prefix
const gcmq = require("gulp-group-css-media-queries");   // 중복되는 mediaquery 구문 merge
const cleanCSS = require('gulp-clean-css');             // css minify -> gcmq 사용 시 sass outputStyle이 적용이 안되므로 css compressed를 위해 추가
const imagemin = require("gulp-imagemin");              // 이미지 압축
const newer = require("gulp-newer");                    // dist 폴더의 결과물보다 최신의 timestamp를 가진 경우만 실행
const sourcemaps = require("gulp-sourcemaps");          // 배포용으로 빌드한 파일과 원본 파일을 연결시켜주는 기능(파일 에러 디버깅 시 소스맵을 이용해 배포용 파일 특정 부분이 원본 소스의 어떤 부분인지 확인 하는 것)
                                                        // -> gulp4 이상 부터는 gulp-sourcemaps를 사용하지 않고도 gulp.src 메서드를 사용할때 옵션으로 소스맵 처리 가능 

// 경로 변수(src: 작업용 폴더, dist: 배포용 폴더)
var src = "public/src";
var dist = "public/dist";

// 작업용 폴더 파일 path
var path = {
    scss: src + "/scss/*.scss",
    cssLib: src + "/scss/lib/*",
    js: src + "/js/*.js",
    jsLib: src + "/js/lib/*.js",
    images: src + "/images/*"
};

// js, scss concat(병합) 시 파일 이름 지정
var fileName = {
    style: "forum.css",
    javascript: "forum.js"
};

// scss options
var scssOptions = {
    // 코드 스타일 / values: nested, expanded, compact, compressed
    outputStyle : "expanded",
    // 들여쓰기 / values : space , tab
    indentType : "tab",
    // 들여쓰기 갯수 / default: 2
    indentWidth : 1,
    // 컴파일 된 css에 원본 소스이 위치와 줄 수 주석 표시
    sourceComments: false
}

// browser-sync index file name(띄워질 html)
var browserSyncFileName = "main.html";

/* 
 * ==============================
 * task start!
 * ==============================
*/
// dist 폴더 정리
function clean () { 
    return del([dist + "/*"]);
}

// css task
function style () {
    return merge(
        gulp.src(path.scss)
        // .pipe(concat(fileName.style))     // 파일 합칠 필요 없을 때 주석 처리
        .pipe(sass(scssOptions).on("error", sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())         // mediaquery 미사용 시 주석 처리
        .pipe(cleanCSS())     // gcmq 플러그인 사용시 sass outputStyle 지정이 안되므로 file minify를 원할 시 실행, mediaquery 미사용 시 주석 처리
        .pipe(gulp.dest(dist + "/css"))
        .pipe(browsersync.stream()),
        gulp.src(path.cssLib)
        .pipe(gulp.dest(dist + "/css/lib"))
        .pipe(browsersync.stream())
    )
}

// js task
function javascript () {
    return merge(
        gulp.src(path.js, {sourcemaps: true})
        .pipe(concat(fileName.javascript))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ 
            suffix: ".min" 
        }))             
        .pipe(gulp.dest(dist + "/js"))
        .pipe(browsersync.stream()),
        gulp.src(path.jsLib)
        .pipe(gulp.dest(dist + "/js/lib"))
        .pipe(browsersync.stream())
    )
}

// image task
function images () {
    return gulp.src(path.images)
        .pipe(newer(dist + "/images"))
        .pipe(imagemin([
            // customize image optimize
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(dist + "/images"))
        .pipe(browsersync.stream());
}

// browser-sync
function setBrowserSync () {
    browsersync.init({
        server: {
            baseDir: "./public",
            index: browserSyncFileName
        },
        // 두번째 방법
        /* proxy: "http://eugene.estgames.com/",
        serveStatic: ["./" + dist],
        startPath: "./game/cabal-global/gsp-site/Event/210419_event/event.html" */
    });
}

// watch files
function watch () {
    gulp.watch(path.scss, style);
    gulp.watch(path.js, javascript);
    gulp.watch(path.images, images);
    gulp.watch("public/*.html").on("change", browsersync.reload);
}

/* 
 * ==============================
 * gulp 실행
 * Command Line Texting: watch: gulp, build: gulp build
 * series 함수는 Task를 순차적으로 실행
 * parallel 함수는 Task를 병렬로 실행
 * ==============================
*/
module.exports = {
    default: gulp.parallel(watch, setBrowserSync),
    build: gulp.series(clean, gulp.parallel(style, javascript, images))
};
/* exports.default = gulp.parallel(watch, setBrowserSync);
exports.build = gulp.series(clean, gulp.parallel(style, javascript, images)); */