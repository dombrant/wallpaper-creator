const activateSpinner = () => {
  document.querySelector(".main-section").innerHTML = `
    <div class="vertical-center">
      <h3>Generating wallpaper</h3>
      <div class="spinner"></div>
      <canvas></canvas>
    </div>`;
};

export default activateSpinner;
