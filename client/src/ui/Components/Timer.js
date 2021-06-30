import React, { useState, useEffect } from "react";
import Express from "../../middleware/middleware_controller";
import { subscribe } from "../../globalHelpers/StateTree";
import Clock from "./Clock";

let timer = null;
let target = 0;
let _id = null;
let subscribed = false;

function Timer(props) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!subscribed) {
            Express.call("get-time", {}, (results) => {
                Express.call("get-current-challenge", {}, (challenge) => {
                    if (challenge) {
                        target = challenge.duration;
                    } else {
                        target = results || 0;
                    }
                    setTime(results || 0);
                });
            });
        }

        if (!subscribed) {
            subscribe("time", (results) => {
                try {
                    subscribed = true;
                    if (results.time && results.time != time) {
                        target = results.duration;
                        setTime(results.time);
                        setRunning(results.running || false);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }
    });

    try {
        if (_id != props._id) {
            _id = props._id;
        }

        return (
            <div
                className="timer-style"
                style={{
                    width: "20%",
                    height: "unset",
                    border: "solid thin lightgray",
                    background: "#404040",
                }}
            >
                {renderTimerBody([time, setTime, running])}
                {renderButtons([time, setTime, running, setRunning])}
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>error</div>;
    }
}

function startTimer([time, setTime, running, setRunning]) {
    if (time > 0 && !running) {
        setRunning(true);
        timer = setInterval(() => {
            setTime(time--);
        }, 1000);
    }
}

function stopTimer([time, setTime, running, setRunning]) {
    if (running) {
        setRunning(false);
        clearInterval(timer);
    }
}

function renderTimerBody([time, setTime, running]) {
    try {
        const formattedTime = convertTime(time);
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "80%",
                }}
            >
                <div
                    className="time-tracker-wrapper"
                    style={{ marginBottom: "10px" }}
                >
                    <div className="time-tracker">{formattedTime.minutes}</div>
                    <div className="time-tracker">:</div>
                    <div className="time-tracker">{formattedTime.seconds}</div>
                </div>
                <Clock
                    size={100}
                    running={running}
                    time={time}
                    target={target}
                />
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

function renderButtons([time, setTime, running, setRunning]) {
    try {
        if (time <= 0) {
            stopTimer([time, setTime, running, setRunning]);
        }
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "20%",
                }}
            >
                <div
                    className="fancy-button"
                    style={{ marginBottom: "5px" }}
                    onClick={() => {
                        if (running) {
                            setRunning(false);
                            Express.call("stop-time", {}, () => {});
                        } else {
                            setRunning(true);
                            Express.call("start-time", {}, () => {});
                        }
                    }}
                >
                    {running ? "PAUSE" : "START"}
                </div>
                <div
                    className="fancy-button"
                    onClick={() => {
                        Express.call("get-current-challenge", {}, (results) => {
                            if (results) {
                                Express.call("set-time", {
                                    timeInput: results.duration,
                                });
                            } else {
                                Express.call("set-time", { timeInput: 0 });
                            }
                        });
                    }}
                >
                    RESET
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

const convertTime = (secs) => {
    try {
        const hours = Math.floor(secs / 3600) + "";

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60) + hours * 60;

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return { hours, minutes, seconds };
    } catch (e) {
        console.log(e);
        return {};
    }
};

export default Timer;
