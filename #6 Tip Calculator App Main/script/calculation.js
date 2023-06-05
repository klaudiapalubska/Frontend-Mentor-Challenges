function calculation() {
  if (
    validation[0] === true &&
    validation[1] === true &&
    validation[2] === true
  ) {
    if (
      Object.is(billInputValue, NaN) ||
      Object.is(buttonValue, NaN) ||
      Object.is(peopleInputValue, NaN)
    ) {
      tipAmountParagraph.textContent = "$0.00";
      totalParagraph.textContent = "$0.00";
    } else {
      buttonValue = Math.ceil(buttonValue * 0.01 * 100) / 100;

      tipAmount[0] =
        Math.floor(((billInputValue * buttonValue) / peopleInputValue) * 100) /
        100;
      tipAmount[1] =
        Math.ceil(((billInputValue * buttonValue) / peopleInputValue) * 100) /
        100;
      total =
        Math.ceil((billInputValue / peopleInputValue + tipAmount[1]) * 100) /
        100;

      //output
      tipAmountParagraph.textContent = `$${tipAmount[0]}`;
      totalParagraph.textContent = `$${total}`;

      //save counting
      if (valueCookie == undefined) valueCookie = 0;

      countCookie(
        billInputValue,
        buttonValue,
        peopleInputValue,
        tipAmount[0],
        total,
        valueCookie
      );

      controlCookie(valueCookie);
      deleteCookie("cookieAvailable");
      setCookie("cookieAvailable", ++valueCookie, 7);
    }
  }
}
