var timeInSecs;
var ticker;
var start_time;
function Countdown(start) {
    this.start_time = start === undefined ? "1:00" : start ;
    this.target_id = "#timer";
    this.name = "timer";
    start_time = this.start_time;
}

Countdown.prototype.init = function () {
    this.reset();
    ticker = setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.reset = function () {
    time = this.start_time.split(":");
    this.minutes = parseInt(time[0]);
    this.seconds = parseInt(time[1]);
    this.update_target();
}

Countdown.prototype.tick = function () {
    if (this.seconds > 0 || this.minutes > 0) {
        if (this.seconds == 0) {
            this.minutes = this.minutes - 1;
            this.seconds = 59
        } else {
            this.seconds = this.seconds - 1;
        }
    }
    this.update_target()
}

Countdown.prototype.update_target = function () {
    seconds = this.seconds;
    if (seconds < 10) seconds = "0" + seconds;
    $(this.target_id).val(this.minutes + ":" + seconds)
}


var timer = new Countdown();
timer.init();


function start() {
    var s = document.getElementById("period").value;
    document.getElementById("period").disabled = true;
    startTimer(s);
}

function startTimer(secs) {
    timeInSecs = parseInt(secs);
    document.getElementById("countdown").style.color = "black";
    clearInterval(ticker);

    ticker = setInterval("tick()", 1000);
    tick(); // to start counter display right away
}

function tick() {
    var secs = timeInSecs;
    if (secs > 0) {
        timeInSecs--;
        showTime(secs);
    } else {
        timeInSecs--;
        document.getElementById("countdown").style.color = "red";
        document.getElementById("countdown").innerHTML = "You have exceeded your time by " + (hhmmss(Math.abs(timeInSecs)));
        document.getElementById("period").disabled = false;
    }
}

function showTime(secs) {
    var hours = Math.floor(secs / 3600);
    secs %= 3600;
    var mins = Math.floor(secs / 60);
    secs %= 60;
    var result = ((hours < 10) ? "0" : "") + hours + ":" + ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;
    document.getElementById("countdown").innerHTML = result;
}

function stopwatch(btn) {
    if (btn.value == "Pause") {
        clearInterval(ticker);
        btn.value = "Resume";
    } else {
        btn.value = "Pause"
        var timer = new Countdown($('#timer').val());
        timer.init();
    }
}

function hhmmss(secs) {
    var hrs = Math.floor(secs / 3600);
    var mns = Math.floor(secs / 60) % 60;
    secs = secs % 60;
    if (hrs < 10) hrs = "0" + hrs;
    if (mns < 10) mns = "0" + mns;
    if (secs < 10) secs = "0" + secs;
    return mns + " minutes " + secs + " seconds";
}