const sendRequest = async (width, height) => {
  try {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ width: width, height: height }),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

export default sendRequest;
