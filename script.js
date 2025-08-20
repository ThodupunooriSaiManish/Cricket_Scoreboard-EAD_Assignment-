// Cricket Scoreboard Logic
(() => {
  const els = {
    teamScore: document.getElementById('team-score'),
    overs: document.getElementById('overs'),
    sai: {
      card: document.getElementById('sai-card'),
      runs: document.getElementById('sai-runs'),
      status: document.getElementById('sai-status'),
      strike: document.getElementById('sai-strike')
    },
    manish: {
      card: document.getElementById('manish-card'),
      runs: document.getElementById('manish-runs'),
      status: document.getElementById('manish-status'),
      strike: document.getElementById('manish-strike')
    },
    buttons: {
      runBtns: Array.from(document.querySelectorAll('[data-run]')),
      wicket: document.getElementById('wicket'),
      lbw: document.getElementById('lbw'),
      wide: document.getElementById('wide'),
      bye: document.getElementById('bye'),
      legBye: document.getElementById('leg-bye'),
      noBall: document.getElementById('no-ball'),
      freeHit: document.getElementById('free-hit'),
      switchStriker: document.getElementById('switch-striker'),
      reset: document.getElementById('reset')
    }
  };

  const initialState = () => ({
    team: { runs: 0, wickets: 0 },
    balls: 0,
    get overs() { return `${Math.floor(this.balls/6)}.${this.balls%6}`; },
    players: {
      sai: { name: 'Sai', runs: 0, out: false, striker: true },
      manish: { name: 'Manish', runs: 0, out: false, striker: false }
    },
    freeHitNext: false
  });

  let state = initialState();

  function currentStrikerKey() {
    return state.players.sai.striker ? 'sai' : 'manish';
  }

  function switchStriker() {
    state.players.sai.striker = !state.players.sai.striker;
    state.players.manish.striker = !state.players.manish.striker;
  }

  function updateUI() {
    els.teamScore.textContent = `${state.team.runs}/${state.team.wickets}`;
    els.overs.textContent = `${state.overs} Overs`;

    els.sai.runs.textContent = state.players.sai.runs;
    els.manish.runs.textContent = state.players.manish.runs;

    els.sai.status.textContent = state.players.sai.out ? 'Out' : 'Not Out';
    els.manish.status.textContent = state.players.manish.out ? 'Out' : 'Not Out';

    els.sai.strike.textContent = state.players.sai.striker && !state.players.sai.out ? '*' : '';
    els.manish.strike.textContent = state.players.manish.striker && !state.players.manish.out ? '*' : '';

    els.sai.card.classList.toggle('active', state.players.sai.striker && !state.players.sai.out);
    els.manish.card.classList.toggle('active', state.players.manish.striker && !state.players.manish.out);
  }

  function addRunsToStriker(n) {
    state.players[currentStrikerKey()].runs += n;
    state.team.runs += n;
  }

  function handleRun(n) {
    addRunsToStriker(n);
    if (n % 2 === 1) switchStriker();
    state.balls++;
    updateUI();
  }

  function handleWicket() {
    state.team.wickets++;
    state.players[currentStrikerKey()].out = true;
    state.balls++;
    updateUI();
  }

  function handleWide() {
    state.team.runs++;
    updateUI();
  }

  function handleBye() {
    state.team.runs++;
    state.balls++;
    updateUI();
  }

  function handleNoBall() {
    addRunsToStriker(1);
    updateUI();
  }

  function resetAll() {
    state = initialState();
    updateUI();
  }

  // Wire up events
  els.buttons.runBtns.forEach(btn => {
    btn.addEventListener('click', () => handleRun(parseInt(btn.dataset.run)));
  });
  els.buttons.wicket.addEventListener('click', handleWicket);
  els.buttons.lbw.addEventListener('click', handleWicket);
  els.buttons.wide.addEventListener('click', handleWide);
  els.buttons.bye.addEventListener('click', handleBye);
  els.buttons.legBye.addEventListener('click', handleBye);
  els.buttons.noBall.addEventListener('click', handleNoBall);
  els.buttons.freeHit.addEventListener('click', () => { state.team.runs++; updateUI(); });
  els.buttons.switchStriker.addEventListener('click', () => { switchStriker(); updateUI(); });
  els.buttons.reset.addEventListener('click', resetAll);

  updateUI();
})();
