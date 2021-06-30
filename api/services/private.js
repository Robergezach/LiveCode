let timer = null;
let time = 0;
let currentChallenge = null;

global.services["change-code"] = function (parameters) {
    try {
        global["send-event"](parameters);
        return "done";
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["set-time"] = function ({ timeInput }) {
    try {
        console.log(timeInput);
        time = timeInput;

        clearInterval(timer);

        global["send-event"]({
            observable: "time",
            time: timeInput,
            duration: currentChallenge ? currentChallenge.duration : 0,
            running: false,
        });
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["get-time"] = function () {
    try {
        return time;
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["start-time"] = function () {
    try {
        console.log(time);
        timer = setInterval(() => {
            if (time <= 0) {
                time = 0;
                global["send-event"]({
                    observable: "time",
                    time: 0,
                    duration: currentChallenge ? currentChallenge.duration : 0,
                    running: false,
                });
                clearInterval(timer);
            }
            time--;
            global["send-event"]({
                observable: "time",
                time,
                duration: currentChallenge ? currentChallenge.duration : 0,
                running: true,
            });
        }, 1000);
        return "done";
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["stop-time"] = function () {
    try {
        if (timer != null) {
            global["send-event"]({
                observable: "time",
                time,
                duration: currentChallenge ? currentChallenge.duration : 0,
                running: false,
            });
            clearInterval(timer);
        }
        return "done";
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["set-current-challenge"] = function ({ challenge }) {
    try {
        currentChallenge = challenge;
        global["send-event"]({
            observable: "challenge",
            ...currentChallenge,
        });
        return challenge;
    } catch (e) {
        console.log(e);
        return null;
    }
};

global.services["get-current-challenge"] = function () {
    try {
        global["send-event"]({
            observable: "challenge",
            ...currentChallenge,
        });
        return currentChallenge;
    } catch (e) {
        console.log(e);
        return null;
    }
};
