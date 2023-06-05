function getInputData(inputValue) {
  let data = inputValue.value;

  data = parseFloat(data);

  return data;
}

function getButtonData(name) {
  let buttonData = document.getElementById(name).id;
  buttonData = parseFloat(buttonData);

  return buttonData;
}
