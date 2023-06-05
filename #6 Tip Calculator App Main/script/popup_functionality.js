warningButton.addEventListener("click", () => {
  popupWarning.classList.toggle("hidden");
  background.classList.toggle("hidden");
  customInput.value = "";
  restoreStyleCustomInput();
});

buttonFirstTime.addEventListener("click", () => {
  background.classList.toggle("hidden");
  firstTimePopup.classList.toggle("hidden");
});
