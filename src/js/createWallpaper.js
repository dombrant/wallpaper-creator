import * as stackBlur from "./stackblur-es.js";

const createWallpaper = (width, height) => {
  const canvas = document.querySelector("canvas");

  canvas
    .getContext("2d")
    .drawImage(document.querySelector("img"), 0, 0, width, height);
};

export default createWallpaper;
