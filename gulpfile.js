const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss"); //used to remove css

function buildStyles(done) {
  src("sass/**/*.scss") // Source Sass files
    .pipe(sass().on("error", sass.logError)) // Compile Sass
    .pipe(purgecss({ content: ["*.html"] })) // Remove unused CSS
    .pipe(dest("css")); // Output to destination folder
  done(); // Signal task completion
}

function watchTask() {
  // Watch for changes in all SCSS files
  watch(["sass/**/*.scss", "*.html"], buildStyles);
  //This will look for all scss files under 'SCSS' and any other sub folders
  //Will also update new code for any top level html files
}

exports.default = series(buildStyles, watchTask);
