const checkForImage = () => {
  return new Promise((resolve, reject) => {
    const input = document.querySelector("input");

    if (input.files.length === 0) {
      document.querySelector(".main-section").innerHTML = `
      <h3 class="vertical-center"> Please upload one image </h3> 
      <div class="button-container"> 
        <button onclick="location.reload()">Retry</button> 
      </div>`;
      // Display a message in case the user clicks the create wallpaper button without uploading an image;
      reject("Please upload one image");
    } else {
      resolve();
    }
  });
};

export default checkForImage;
