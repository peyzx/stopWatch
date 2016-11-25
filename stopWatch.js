/**
 * Created by Александр on 26.04.2016.
 */
function StopWatch(container) {
    this.container = container;
    console.log(container);
    this.clocktimer = 0;
    this.resultSpan = container.getElementsByClassName('result-span')[0];
    this.startTime = 0;
    this.pauseTime = 0;
    this.resultSpan.innerHTML = "00 : 00 : 00.000";
    this.lapBlock = container.getElementsByClassName('list-group')[0];
}

StopWatch.prototype.init = function() {
    var self = this;
    this.container.getElementsByClassName('btn-start')[0].onclick = self.start.bind(this);
    this.container.getElementsByClassName('btn-stop')[0].onclick = self.stop.bind(this);
    this.container.getElementsByClassName('btn-lap')[0].onclick = self.lap.bind(this);
    this.container.getElementsByClassName('btn-clear')[0].onclick = self.clear.bind(this);
    return this;
};

StopWatch.prototype.start = function() {
    if (this.clocktimer) {
        return false;
    }
    this.startTime += (new Date()).getTime() - this.pauseTime;
    var self = this;
    this.clocktimer = setInterval(function() {
        self.show();
    }, 100);
};

StopWatch.prototype.stop = function() {
    if (!this.clocktimer) {
        return false;
    }
    clearInterval(this.clocktimer);
    this.clocktimer = false;
    this.pauseTime = (new Date()).getTime();
};

StopWatch.prototype.lap = function() {
    if (!this.clocktimer) {
        return false;
    }
    var diffDate = (new Date()).getTime() - this.startTime;
    var d = new Date(diffDate);
    var lap = document.createElement('li');
    lap.classList.add('list-group-item');
    lap.innerHTML = d.getUTCHours() + ' : ' +
        d.getUTCMinutes() + ' : ' + d.getUTCSeconds() + ' : ' +
        d.getUTCMilliseconds();
    this.lapBlock.appendChild(lap);
};

StopWatch.prototype.clear = function() {
    clearInterval(this.clocktimer);
    this.startTime = 0;
    this.pauseTime = 0;
    this.clocktimer = 0;
    this.resultSpan.innerHTML = "00 : 00 : 00.000";
    clearChildren(this.lapBlock)
};

StopWatch.prototype.show = function() {
    var diffDate = (new Date()).getTime() - this.startTime;
    var d = new Date(diffDate);
    this.resultSpan.innerHTML = (d.getUTCHours() < 10 ? '0' : '') +
        d.getUTCHours() + " : " + (d.getUTCMinutes() < 10 ? '0' : '') +
        d.getUTCMinutes() + " : " + (d.getUTCSeconds() < 10 ? '0' : '') +
        d.getUTCSeconds() + " . " + d.getUTCMilliseconds();
};
$.fn.stopwatch = function() {
    for (var i = 0; i < this.length; i++) {
        new StopWatch(this[i]).init();
    }
};

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}