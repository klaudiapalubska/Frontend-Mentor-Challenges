const submit = document.getElementById("submit");
const ratingSide = document.getElementById("grade-part");
const thanksSide = document.getElementById("thanks-part");
const selected = document.getElementById("selected");

window.onload = myMain;
function myMain() {
  document.getElementById("buttons").onclick = buton;
}
function buton(e) {
  let valuee;
  if (e.target.classList == "marks") {
    valuee = e.target.value;
    for (i = 1; i < 6; i++) {
      document.getElementById(`mark_${i}`).classList.remove("click-color");
      if (i == valuee) {
        document.getElementById(`mark_${i}`).classList.add("click-color");
      }
    }
  }
  submit.addEventListener("click", function () {
    event.preventDefault();
    ratingSide.classList.add("hidde");
    thanksSide.classList.remove("hidde");
    thanksSide.style.display = "flex";
    selected.textContent = `You selected ${valuee} out of 5`;
  });
}
