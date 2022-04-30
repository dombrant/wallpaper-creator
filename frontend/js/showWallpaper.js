const showWallpaper = (base64Data) => {
  document.querySelector(".main-section").innerHTML = `
    <div class="vertical-center">
      <h3>Done!</h3>
      <img class="wallpaper" title="wallpaper">
    </div>`;

  document.querySelector(".wallpaper").src =
    "data:image/jpeg;base64," + base64Data;
};

export default showWallpaper;
