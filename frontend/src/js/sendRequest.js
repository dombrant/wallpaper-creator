import getDimensions from "./getDimensions.js";

const sendRequest = async () => {
  const { width, height } = getDimensions();

  const formData = new FormData();
  formData.append("image", document.querySelector("input").files[0]);
  formData.append("width", width);
  formData.append("height", height);

  try {
    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export default sendRequest;
