const ErrorData = document.getElementById("email");
const ErrorText = document.getElementById("error-text");
const ErrorImg = document.getElementById("error-img");

function removeEvent(event) {
  ErrorData.removeEventListener(removeEvent);
}

function validator() {
  event.preventDefault();
  const Pattern =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

  let errorData = ErrorData.value;
  if (errorData.match(Pattern)) {
    ErrorData.style.borderColor = "hsl(167, 71%, 47%)";
    ErrorText.style.visibility = "hidden";
    ErrorImg.style.visibility = "hidden";
  } else {
    ErrorText.style.visibility = "visible";
    ErrorImg.style.visibility = "visible";
    ErrorData.style.borderColor = "hsl(0, 93%, 68%)";
  }
}
