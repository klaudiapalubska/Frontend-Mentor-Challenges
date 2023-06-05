function setCookie(cookieName, cookieValue, expirationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(
    cookieValue
  )};expires=${expirationDate.toUTCString()};path=/`;

  document.cookie = cookieString;
}

// Usage

function getCookieValue(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return false; // Cookie not found
}

function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function checkCookieExists(cookieName) {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var cookieParts = cookie.split("=");
    var name = cookieParts[0];

    if (name === cookieName) {
      return true;
    }
  }

  return false;
}

// Usage

let firstPopup = getCookieValue("isCookie");

if (firstPopup == false) {
  firstTimePopup.classList.remove("hidden");
  background.classList.remove("hidden");
  setCookie("isCookie", true, 7);
  setCookie("cookieAvailable", 0, 7);
}

function countCookie(bill, precent, people, tip, total, i) {
  setCookie(`bill${i}`, bill, 7);
  setCookie(`precent${i}`, precent, 7);
  setCookie(`people${i}`, people, 7);
  setCookie(`tip${i}`, tip, 7);
  setCookie(`total${i}`, total, 7);
}

function deleteAllCookiesExcept(cookieToKeep) {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    var cookieName = cookie.split("=")[0];
    if (cookieName !== cookieToKeep) {
      document.cookie =
        cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}

const table = document.getElementById("table-body");
function controlCookie(i) {
  const rowCheck = document.getElementById(`row-${i}`);
  if (rowCheck != null) {
    rowCheck.remove();
  } else {
    let bill = getCookieValue(`bill${i}`),
      precent = getCookieValue(`precent${i}`) * 1000,
      people = getCookieValue(`people${i}`),
      tip = getCookieValue(`tip${i}`),
      total = getCookieValue(`total${i}`),
      row = table.insertRow(0),
      cell1 = row.insertCell(0),
      cell2 = row.insertCell(1),
      cell3 = row.insertCell(2),
      cell4 = row.insertCell(3),
      cell5 = row.insertCell(4);
    precent = Math.round(precent) / 10;
    row.setAttribute("id", `row-${i}`);
    cell1.innerHTML = `<p class="td-table paragraph-style--1 td-bill-${i}">$${bill}</p>`;
    cell2.innerHTML = `<p class="td-table paragraph-style--1 td-precent-${i}">${precent}%</p>`;
    cell3.innerHTML = `<p class="td-table paragraph-style--1 td-people-${i}">${people}</p>`;
    cell4.innerHTML = `<p class="td-table paragraph-style--1 td-tip-${i}">$${tip}</p>`;
    cell5.innerHTML = `<p class="td-table paragraph-style--1 td-total-${i}">$${total}</p>`;
  }
}

function ifDataCookieExists(i) {
  for (j = 0; j < i; j++) {
    controlCookie(j);
  }
}

if (checkCookieExists("cookieAvailable") == true)
  valueCookie = getCookieValue("cookieAvailable");

if (valueCookie != 0) ifDataCookieExists(valueCookie);

function deleteData() {
  deleteAllCookiesExcept("isCookie");
  table.classList.add("hidden");
  window.location.reload();
}
