const info = document.querySelector(".info");
const cellues = document.querySelectorAll(".cell");

let sperrung = true;
let dabeispieler = "X";

info.innerHTML = `an der reihe ${dabeispieler}`;

const alignementsGewinn = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let teilimSpiel = ["", "", "", "", "", "", "", "", ""];

cellues.forEach((cellues) => {
  cellues.addEventListener("click", clicaufCase);
});

function clicaufCase(e) {
  let caseCliick = e.target;
  let caseIndex = caseCliick.getAttribute("data-index");

  if (teilimSpiel[caseIndex] !== "" || !sperrung) {
    return;
  }

  teilimSpiel[caseIndex] = dabeispieler;
  caseCliick.innerHTML = dabeispieler;

  validationResultats();
}

function validationResultats() {
  let endeTeil = false;
  for (let i = 0; i < alignementsGewinn.length; i++) {
    const checkGewin = alignementsGewinn[i];

    let a = teilimSpiel[checkGewin[0]];
    let b = teilimSpiel[checkGewin[1]];
    let c = teilimSpiel[checkGewin[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      endeTeil = true;
      break;
    }
  }
  if (endeTeil) {
    info.innerText = `der spieler ${dabeispieler} hat gewonnen!`;
    sperrung = false;
    return;
  }

  //wenn es im aktuellen Spiel keine leere Zeichenkette gibt
  let matchNull = !teilimSpiel.includes("");
  if (matchNull) {
    info.innerText = "draw";
    sperrung = false;
    return;
  }

  spielerChange();
}

function spielerChange() {
  dabeispieler = dabeispieler === "X" ? "O" : "X";
  info.innerText = `an der reihe ${dabeispieler}`;
}
