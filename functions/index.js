const sharp = require("sharp");

const transform = async (width, height) => {
  try {
    await sharp("./test2.jpg")
      .resize({ width: 300, height: 300 })
      .toFile("./test2-transformed.jpg");
    await sharp("./test.jpg")
      .resize({
        fit: "fill",
        width: width,
        height: height,
      })
      .blur(100)
      .composite([{ input: "test2-transformed.jpg" }])
      .toFile("./test-transformed.jpg");
  } catch (error) {
    console.log(error);
  }
  console.log("Done!");
};

transform(1242, 2688);
