var speedcontrolBundle = 'nodecg-speedcontrol';

var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
runDataActiveRun.on('change', (newVal, oldVal) => {
    if (newVal)
        updateSceneFields(newVal);
});

var timer = nodecg.Replicant('timer', speedcontrolBundle);
timer.on('change', (newVal, oldVal) => {
    if (newVal)
        updateTimer(newVal, oldVal);
});


function updateSceneFields(runData) {
    document.getElementById(`gameTitle`).innerHTML = runData.game;
    document.getElementById(`gameCategory`).innerHTML = runData.category;
    document.getElementById(`gameEstimate`).innerHTML = runData.estimate;

    var team = runData.teams[0];


    // If a team has multiple players, this currently just outputs them in a comma'd list.
    if (team) {
        document.getElementById(`playerName`).innerHTML = team.players.map((player) => player.name).join(', ');
        document.getElementById(`playerAt`).innerHTML = team.players.map((player) => player.social.twitch).join(', ');
    }

}

// Sets the timer text and classes.
function updateTimer(newVal, oldVal) {
    var timerElem = document.getElementById(`timerElem`);
    if (oldVal) timerElem.classList.toggle('timer_'+oldVal.state, false);
    timerElem.classList.toggle('timer_'+newVal.state, true);
    timerElem.innerHTML = newVal.time;
}
