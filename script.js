let teamRuns = 0;
let teamWkts = 0;
let balls = 0;

let players = ["Sai", "Manish", "Arjun", "Ravi", "Teja", "Nikhil", "Rahul", "Varun", "Anil", "Kiran", "Vamsi"];
let batsmen = [
  { name: players[0], runs: 0, out: false, striker: true },
  { name: players[1], runs: 0, out: false, striker: false }
];
let nextBatsmanIndex = 2;
let currentBowler = "-";

function updateBowler() {
  let available = players.filter(p => !batsmen.some(b => b.name === p && !b.out));
  currentBowler = available[Math.floor(Math.random() * available.length)];
}

function updateUI() {
  document.getElementById("teamScore").textContent = teamRuns + "/" + teamWkts;
  document.getElementById("overs").textContent = Math.floor(balls/6) + "." + (balls%6);
  document.getElementById("bowlerName").textContent = currentBowler;

  let striker = batsmen.find(b => b.striker);
  let nonStriker = batsmen.find(b => !b.striker);

  document.getElementById("strikerName").textContent = striker.name + " *";
  document.getElementById("strikerRuns").textContent = striker.runs;
  document.getElementById("strikerStatus").textContent = striker.out ? "Out" : "Not Out";

  document.getElementById("nonStrikerName").textContent = nonStriker.name;
  document.getElementById("nonStrikerRuns").textContent = nonStriker.runs;
  document.getElementById("nonStrikerStatus").textContent = nonStriker.out ? "Out" : "Not Out";
}

function switchStrike() {
  batsmen.forEach(b => b.striker = !b.striker);
}

function addRun(runs) {
  let striker = batsmen.find(b => b.striker);
  striker.runs += runs;
  teamRuns += runs;
  balls++;
  if (runs % 2 === 1) switchStrike();
  if (balls % 6 === 0) updateBowler(); // change bowler every over
  updateUI();
}

function wicket() {
  let striker = batsmen.find(b => b.striker);
  striker.out = true;
  teamWkts++;
  balls++;
  if (nextBatsmanIndex < players.length) {
    batsmen = [
      striker,
      { name: players[nextBatsmanIndex], runs: 0, out: false, striker: true }
    ];
    nextBatsmanIndex++;
  }
  if (balls % 6 === 0) updateBowler();
  updateUI();
}

function wide() {
  teamRuns++;
  updateUI();
}

function noBall() {
  teamRuns++;
  batsmen.find(b => b.striker).runs++;
  updateUI();
}

function resetGame() {
  teamRuns = 0; teamWkts = 0; balls = 0;
  batsmen = [
    { name: players[0], runs: 0, out: false, striker: true },
    { name: players[1], runs: 0, out: false, striker: false }
  ];
  nextBatsmanIndex = 2;
  updateBowler();
  updateUI();
}

updateBowler();
updateUI();
