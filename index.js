const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "./uploads" });
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/frontend/dist"));

app.get("/", (request, response) =>
  response.sendFile(__dirname + "/frontend/dist/index.html")
);

app.post("/api", upload.single("image"), (request, response) => {
  if (!request.file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return error;
  }

  console.log(request.file);
  console.log(request.body);
  return response.status(200).json({ msg: "It worked!" });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
