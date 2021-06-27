import React, { useState, useEffect } from "react";
import { subscribe } from "../../globalHelpers/StateTree";
import Clock from "./Clock";

let timer = null;
let target = 0;
let _id = null;

function Timer(props) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {});

    try {
        if (_id != props._id) {
            _id = props._id;
        }

        return (
            <div
                class="timer-style"
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
                    class="time-tracker-wrapper"
                    style={{ marginBottom: "10px" }}
                >
                    <div class="time-tracker">{formattedTime.minutes}</div>
                    <div class="time-tracker">:</div>
                    <div class="time-tracker">{formattedTime.seconds}</div>
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
                    class="fancy-button"
                    style={{ marginBottom: "5px" }}
                    onClick={() => {
                        if (!running) {
                            startTimer([time, setTime, running, setRunning]);
                        } else {
                            stopTimer([time, setTime, running, setRunning]);
                        }
                    }}
                >
                    {running ? "PAUSE" : "START"}
                </div>
                <div
                    class="fancy-button"
                    onClick={() => {
                        target = 20;
                        setTime(20);
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
        let minutes = Math.floor(divisor_for_minutes / 60);

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
