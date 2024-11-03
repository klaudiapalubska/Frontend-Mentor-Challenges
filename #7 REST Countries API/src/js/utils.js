const loader = document.querySelector(".loader");

export const loadingSpin = (load) =>
  loader.classList.toggle("none-display", !load);

export const numberWithCommas = function (number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
