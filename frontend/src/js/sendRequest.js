const sendRequest = async (image, width, height) => {
  const formData = new FormData();
  formData.append(image, image);
  formData.append(width, width);
  formData.append(height, height);

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
