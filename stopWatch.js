/**
 * Created by Александр on 26.04.2016.
 */

function StopWatch() {
    this.clocktimer;
    this.resultSpan;
    this.startTime = 0;
    this.pauseTime = 0;
       resultSpan.innerHTML = "00 : 00 : 00.000";

};

StopWatch.prototype.init = function () {
    var self = this;
    self.resultSpan = document.getElementById('resultSpan');
    document.getElementById('startBtn').onclick = function () {
        self.start();
    };
    document.getElementById('stopBtn').onclick = function () {
        self.stop();
    };
    document.getElementById('lapBtn').onclick = function () {
        self.lap();
    };
    document.getElementById('clearBtn').onclick = function () {
        self.clear();
    };
};

StopWatch.prototype.start = function () {
    if (this.clocktimer) {
        return false;
    }
    this.startTime += (new Date()).getTime() - this.pauseTime;
    var self = this;
    this.clocktimer = setInterval(function () {
        self.show();
    }, 100);
};

StopWatch.prototype.stop = function () {
    if (!this.clocktimer){
        return false;
    }
    clearInterval(this.clocktimer);
    this.clocktimer = false;
    this.pauseTime = (new Date()).getTime();
};

StopWatch.prototype.lap = function () {
    if(!this.clocktimer){
        return false;
    }
    var diffDate = (new Date()).getTime() - this.startTime;
    var d = new Date(diffDate);
    var lap = document.createElement('li');
    lap.classList.add('list-group-item');
    lap.innerHTML = d.getUTCHours() + ' : ' + d.getUTCMinutes() + ' : ' + d.getUTCSeconds() + ' : ' + d.getUTCMilliseconds();
    document.getElementById('list').appendChild(lap);
};

StopWatch.prototype.clear = function () {
    clearInterval(this.clocktimer);
    this.startTime = 0;
    this.pauseTime = 0;
    this.clocktimer = 0;
    resultSpan.innerHTML = "00 : 00 : 00.000";
};

StopWatch.prototype.show = function () {
    var diffDate = (new Date()).getTime() - this.startTime;
    var d = new Date(diffDate);
    this.resultSpan.innerHTML = (d.getUTCHours() < 10 ? '0' : '') + d.getUTCHours() + " : " + (d.getUTCMinutes() < 10 ? '0' : '') + d.getUTCMinutes() + " : " + (d.getUTCSeconds() < 10 ? '0' : '') + d.getUTCSeconds() + " . " + d.getUTCMilliseconds();
};