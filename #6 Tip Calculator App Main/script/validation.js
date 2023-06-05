warningStyle = function (item, isInputPeople = false, numberWarning = 1) {
  item.style.border = "3px solid hsl(0, 70%, 59%)";
  if (isInputPeople === false && numberWarning === 1)
    warning.style.display = "inline";
  if (isInputPeople === false && numberWarning === 2)
    warning2.style.display = "inline";
};

//Check bill
function checkBill(bill) {
  if (bill < 0) {
    warningStyle(billInput, false, 2);
    warning2.textContent = "Can't be negative (Are u insolvent?)";
    return false;
  } else if (bill === 0) {
    warningStyle(billInput, false, 2);
    warning2.textContent = "Why your bill is 0?";
    return false;
  } else if (bill == NaN) {
    return false;
  } else {
    restoreStyleBillInput();
    return true;
  }
}

//Check percent
function checkPercent(percent) {
  if (percent > 100 || percent < 0) {
    warningStyle(customInput, true);
    popupWarning.classList.toggle("hidden");
    background.classList.toggle("hidden");
    return false;
  } else if (Object.is(percent, NaN)) {
    return false;
  } else {
    restoreStyleCustomInput();
    return true;
  }
}

//Check count of people and set style
function checkPeople(people) {
  if (people === 0) {
    warningStyle(peopleInput);
    warning.textContent = "Can't be zero";
    return false;
  } else if (people < 0) {
    warningStyle(peopleInput);
    warning.textContent = "U can't add negative people";
    return false;
  } else if (bill == NaN) {
    return false;
  } else {
    restoreStylePeopleInput();
    return true;
  }
}
