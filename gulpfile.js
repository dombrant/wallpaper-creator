import gulp from "gulp";
import { red } from "chalk";
import del from "del";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import uncss from "postcss-uncss";
import cssnano from "cssnano";
import concat from "gulp-concat";
import stripDebug from "gulp-strip-debug";
import terser from "gulp-terser";
import htmlReplace from "gulp-html-replace";
import { statSync } from "fs";
import prettyBytes from "pretty-bytes";

const deleteFiles = async (extension = "", directory = "dist") => {
  try {
    await del(`${directory}/*${extension}`);
  } catch (error) {
    console.log(
      `${red(`Error deleting ${extension} files in dist folder`)}: ${error}`
    );
  }
  // Delete any files in the directory argument matching the extension argument
};

const plumberErrorHandler = (error) => console.log(`${red("Error:")} ${error}`);
// Create a function for handling errors caught by the plumber plugin

const css = async () => {
  deleteFiles(".css");

  const postCssPlugins = [
    uncss({
      html: ["src/index.html"],
      ignore: [],
    }),
    cssnano(),
  ];

  return new Promise((resolve, reject) => {
    gulp
      .src("src/css/**/*.css")
      .pipe(plumber({ errorHandler: plumberErrorHandler }))
      .pipe(concat("style.min.css"))
      .pipe(postcss(postCssPlugins))
      .pipe(gulp.dest("dist"))
      .on("error", reject)
      .on("end", resolve);
  });
};

const js = async () => {
  deleteFiles(".js");

  return new Promise((resolve, reject) => {
    gulp
      .src("src/js/**/*.js")
      .pipe(plumber({ errorHandler: plumberErrorHandler }))
      .pipe(stripDebug())
      .pipe(terser())
      .pipe(concat("script.min.js"))
      .pipe(gulp.dest("dist"))
      .on("error", reject)
      .on("end", resolve);
  });
};

const html = async () => {
  deleteFiles("index.html");

  return new Promise((resolve, reject) => {
    gulp
      .src("src/index.html")
      .pipe(plumber({ errorHandler: plumberErrorHandler }))
      .pipe(
        htmlReplace({
          css: "dist/style.min.css",
          js: "dist/script.min.js",
        })
      )
      .pipe(gulp.dest("./"))
      .on("error", reject)
      .on("end", resolve);
  });
};

const logCssSize = () =>
  new Promise((resolve, reject) => {
    try {
      let cssSize = statSync("dist/style.min.css").size;
      resolve(console.log(`CSS Size Minified: ${prettyBytes(cssSize)}`));
      // Use prettyBytes to display the number of bytes in the main CSS file in Kb or Mb
    } catch (error) {
      reject(error);
    }
  });

const logJsSize = () =>
  new Promise((resolve, reject) => {
    try {
      let jsSize = statSync("dist/script.min.js").size;
      resolve(console.log(`JS Size Minified: ${prettyBytes(jsSize)}`));
      // Use prettyBytes to display the number of bytes in the main JS file in Kb or Mb
    } catch (error) {
      reject(error);
    }
  });

const watch = () => {
  gulp.watch("src/css/**/*.css", gulp.series(css, logCssSize));
  gulp.watch("src/js/**/*.js", gulp.series(js, logJsSize));
  gulp.watch("src/index.html", html);
};

gulp.task("default", gulp.series(css, js, html, logCssSize, logJsSize));
gulp.task("watch", gulp.series(css, js, html, logCssSize, logJsSize, watch));
