const sharp = require("sharp");

const createWallpaper = async (image, width, height) => {
  try {
    const overlay = await sharp(image)
      .resize({ width: width, height: height / 3 })
      .toBuffer();

    const wallpaper = await sharp(overlay)
      .resize({
        fit: "fill",
        width: width,
        height: height,
      })
      .blur(100)
      .composite([{ input: overlay }])
      .toBuffer();

    return wallpaper;
  } catch (error) {
    return error;
  }
};

module.exports = createWallpaper;
