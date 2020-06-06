import getDimensions from "./getDimensions.js";
import getImage from "./getImage.js";
import activateSpinner from "./activateSpinner.js";
import sendRequest from "./sendRequest.js";

document.querySelector("button").addEventListener("click", async () => {
  try {
    const { width, height } = getDimensions();
    const image = await getImage();
    activateSpinner();
    // Activate the spinner after the width, height, and image are fetched
    // Otherwise the image can't be located becuase activateSpinner() removes the input tag from the HTML
    const request = await sendRequest(image, width, height);
    console.log(request);
  } catch (error) {
    return error;
  }
});
