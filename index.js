const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/frontend/dist"));

app.get("/", (request, response) =>
  response.sendFile(__dirname + "/frontend/dist/index.html")
);

app.listen(port, () => console.log(`Server started on port ${port}`));
