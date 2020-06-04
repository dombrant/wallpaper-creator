import checkForImage from "./checkForImage.js";
import activateSpinner from "./activateSpinner.js";
import sendRequest from "./sendRequest.js";

document.querySelector("button").addEventListener("click", async () => {
  try {
    await checkForImage();
    const request = await sendRequest();
    console.log(request);
    activateSpinner();
    // Activate the spinner after the image is sent
    // Otherwise the image can't be located becuase activateSpinner() removes the input tag from the HTML
  } catch (error) {
    return error;
  }
});
