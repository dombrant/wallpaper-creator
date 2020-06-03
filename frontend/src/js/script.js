import getDimensions from "./getDimensions.js";
import getImage from "./getImage.js";
import activateSpinner from "./activateSpinner.js";
import sendRequest from "./sendRequest.js";

document.querySelector("button").addEventListener("click", async () => {
  try {
    const { width, height } = getDimensions();
    const uploadedImage = await getImage();
    activateSpinner();
    // Activate the spinner after the image is loaded
    // Otherwise the image can't be leading becuase activateSpinner() removes the input tag from the HTML
    const request = await sendRequest(uploadedImage, width, height);
  } catch (error) {
    return error;
  }
});
