restoreStyle = function (item) {
  item.addEventListener("click", () => {
    try {
      item.focus((item.style.border = "3px solid hsl(185, 41%, 84%)"));
    } catch (e) {
      //console.clear();
    }
  });
};

function restoreStylePeopleInput() {
  warning.style.display = "none";
  peopleInput.style.border = "none";
  restoreStyle(peopleInput);
}

function restoreStyleCustomInput() {
  customInput.style.border = "none";
  restoreStyle(customInput);
}

function restoreStyleBillInput() {
  warning2.style.display = "none";
  billInput.style.border = "none";
  restoreStyle(billInput);
}

//check what button was click to change style

function btnClicked(number) {
  let buttnClicked = document.getElementsByClassName("btn");

  for (i = 0; i < buttnClicked.length; i++) {
    buttnClicked.item(i).classList.remove("btn-click-style");
    if (i == number) buttnClicked.item(number).classList.add("btn-click-style");
  }
}
