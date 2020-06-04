const express = require("express");
const multer = require("multer");
const createWallpaper = require("./backend/createWallpaper");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/frontend/dist"));

app.get("/", (request, response) =>
  response.sendFile(__dirname + "/frontend/dist/index.html")
);

app.post("/api", upload.single("image"), async (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .send(`Please upload a file in JPG or PNG format`);
  }

  try {
    createWallpaper(
      request.file.buffer,
      parseInt(request.body.width),
      parseInt(request.body.height)
    );
    return response.status(200).send("It worked!");
  } catch (error) {
    return response.status(500).send(`Error processing image: ${error}`);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
