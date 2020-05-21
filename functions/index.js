const sharp = require("sharp");

const createWallpaper = async (width, height) => {
  try {
    await sharp("./test2.jpg")
      .resize({ width: width, height: height / 3 })
      .toFile("./test2-transformed.jpg");
    await sharp("./test.jpg")
      .resize({
        fit: "fill",
        width: width,
        height: height,
      })
      .blur(100)
      .composite([{ input: "./test2-transformed.jpg" }])
      .toFile("./test-transformed.jpg");
  } catch (error) {
    console.log(error);
  }
  console.log("Done!");
};

exports.handler = async (event, context) => {
  const width = event.body.width;
  const height = event.body.height;

  // await createWallpaper(width, height);

  return {
    statusCode: 200,
    body: `${width}, ${height}`,
  };
};
