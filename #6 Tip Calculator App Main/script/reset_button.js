document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("form").reset();
  restoreStylePeopleInput();
  restoreStyleCustomInput();
  restoreStyleBillInput();
  btnClicked(9);
  tipAmountParagraph.textContent = "$0.00";
  totalParagraph.textContent = "$0.00";
  peopleInputValue = NaN;
  billInputValue = NaN;
  buttonValue = NaN;
});
