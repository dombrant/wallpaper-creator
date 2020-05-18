import getDimensions from "./getDimensions.js";
import activateSpinner from "./activateSpinner.js";

document.querySelector("button").addEventListener("click", () => {
  const { width, height } = getDimensions();
  activateSpinner();
});
