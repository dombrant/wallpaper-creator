import getDimensions from "./getDimensions.js";
import { checkForImage, getImage } from "./getImage.js";
import activateSpinner from "./activateSpinner.js";
import createWallpaper from "./createWallpaper.js";

document.querySelector("button").addEventListener("click", async () => {
  const { width, height } = getDimensions();

  try {
    await checkForImage();
    await getImage();
    activateSpinner();
    // Activate the spinner after the image is loaded
    // Otherwise the image can't be leading becuase activateSpinner() removes the input tag from the HTML
    createWallpaper(width, height);
  } catch (error) {
    return error;
  }
});
