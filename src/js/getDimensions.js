import devices from "./devices.js";

const getDimensions = () => {
  const device = document.querySelector("select").value;
  const { width, height } = devices[device];
  return { width, height };
};

export default getDimensions;
