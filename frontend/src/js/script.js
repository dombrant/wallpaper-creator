import checkForImage from "./checkForImage.js";
import activateSpinner from "./activateSpinner.js";
import sendRequest from "./sendRequest.js";

document.querySelector("button").addEventListener("click", async () => {
  try {
    await checkForImage();
    activateSpinner();
    // Activate the spinner after the image is checked
    // Otherwise the image can't be leading becuase activateSpinner() removes the input tag from the HTML
    const request = await sendRequest();
  } catch (error) {
    return error;
  }
});
