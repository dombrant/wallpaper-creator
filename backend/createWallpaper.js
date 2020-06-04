const sharp = require("sharp");

const createWallpaper = async (image, width, height) => {
  try {
    const overlay = await sharp(image)
      .resize({ width: width, height: height / 3 })
      .toBuffer();

    await sharp(overlay)
      .resize({
        fit: "fill",
        width: width,
        height: height,
      })
      .blur(100)
      .composite([{ input: overlay }])
      .toFile("./uploads/wallpaper.jpg");
  } catch (error) {
    return error;
  }
};

module.exports = createWallpaper;
