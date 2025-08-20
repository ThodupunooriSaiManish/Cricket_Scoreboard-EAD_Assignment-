#  Cricket Scoreboard Web Application

A simple, responsive cricket scoreboard built with *HTML, **CSS, and **JavaScript*.  
This app simulates real-time scoring for two players (*Sai* and *Manish*) and allows updating the score using buttons for common cricket events.

---

##  Features
- *Team Score:* Displayed in runs/wickets format.
- *Individual Player Stats:* Runs and status (Not Out / Out).
- *Striker Indicator:* Current striker marked with * and highlighted.
- *Overs Tracking:* Shown as overs.balls (e.g., 5.3 Overs).
- *Event Buttons:*
  - Runs → 1, 2, 3, 4, 6
  - Wicket / LBW
  - Wide
  - Bye / Leg Bye
  - No Ball
  - Free Hit
- *Controls:*
  - Switch Striker
  - Reset

---

##  Scoring Rules (Implemented)
- *Runs (1/2/3/4/6):*
  - Added to team and striker.
  - Odd runs (1, 3) → strike changes.
  - Counts as a *valid ball*.
- *Wide:* +1 team run, *does not* count as a ball.
- *Bye / Leg Bye:* +1 team run, *counts as a ball*.
- *No Ball:* +1 team run *and* +1 to striker, *does not* count as a ball.
- *Free Hit (as per assignment):* +1 run to team and makes *next ball* a Free Hit → no wicket and no ball increment on that delivery.
- *Wicket / LBW:* +1 wicket, current striker marked as *Out*. (New batsman is assumed to be Rahul.)
- *Overs:* Computed from valid balls (e.g., after 6 balls → next over).
- *Reset:* Resets everything to starting state.

---

##  How to Run
### Option 1 – Open directly
1. Extract or create the project folder.
2. Open index.html in your browser.

