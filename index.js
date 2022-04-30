const express = require("express");
const multer = require("multer");
const createWallpaper = require("./backend/createWallpaper");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
// Tells multer to store the file in memory and not on the disk
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/frontend"));

app.get("/", (request, response) =>
  response.sendFile(__dirname + "/frontend/index.html")
);

app.post("/api", upload.single("image"), async (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .send({ msg: `Please upload a file in JPG or PNG format` });
  }

  try {
    const wallpaperBuffer = await createWallpaper(
      request.file.buffer,
      parseInt(request.body.width),
      parseInt(request.body.height)
    );
    const wallpaperBase64 = Buffer.from(wallpaperBuffer, "binary").toString(
      "base64"
    );
    // Send the image in base64 form
    return response.status(200).send({ file: wallpaperBase64 });
  } catch (error) {
    return response
      .status(500)
      .send({ msg: `Error processing image: ${error}` });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
