import React, { useState, useEffect } from "react";
import Express from "../../middleware/middleware_controller";
import { subscribe } from "../../globalHelpers/StateTree";
import ReverseString from "../Challenges/ReverseString";
import Mississippi from "../Challenges/Mississippi";
import FindID from "../Challenges/FindID";
import RomanNumerals from "../Challenges/RomanNumerals";
import _ from "lodash";

const challengeOptions = [ReverseString, Mississippi, FindID, RomanNumerals];
let subscribed = false;

function ChallengeSelector() {
    const [state, setState] = useState({ challenge: null });

    useEffect(() => {
        if (!subscribed) {
            Express.call("get-current-challenge", {}, (challenge) => {
                if (challenge) {
                    for (let i = 0; i < challengeOptions.length; i++) {
                        const challengeOpt = challengeOptions[i];
                        if (challengeOpt.name === challenge.name) {
                            Express.call("change-code", {
                                sessionId:
                                    window.sessionStorage.getItem("sessionId"),
                                code: challengeOpt.defaultCode,
                                force: true,
                            });
                            setState({ challenge: challengeOpt });
                        }
                    }
                }
            });
        }

        if (!subscribed) {
            subscribe("challenge", (challenge) => {
                try {
                    console.log(challenge);
                    subscribed = true;
                    if (challenge) {
                        if (
                            state.challenge &&
                            state.challenge.name === challenge.name
                        ) {
                            return;
                        }

                        for (let i = 0; i < challengeOptions.length; i++) {
                            const challengeOpt = challengeOptions[i];
                            if (challengeOpt.name === challenge.name) {
                                setState({ ...state, challenge: challengeOpt });
                            }
                        }
                    } else {
                        setState({ ...state, challenge: null });
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }
    });

    try {
        return (
            <div
                style={{
                    border: "solid thin lightgray",
                    padding: "20px",
                    background: "#121112",
                    color: "white",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {state.challenge
                    ? renderChallenge([state, setState])
                    : renderOptions([state, setState])}
                {renderButtons(state.challenge)}
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>error</div>;
    }
}

function renderOptions([state, setState]) {
    try {
        return (
            <div
                style={{
                    background: "#e3e3e3",
                    padding: "10px",
                    color: "black",
                    borderRadius: "5px",
                    width: "79%",
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                }}
            >
                {_.map(challengeOptions, (challenge, index) => {
                    return (
                        <div
                            className="challenge-option"
                            key={index}
                            onClick={() => {
                                setState({ ...state, challenge });
                            }}
                        >
                            {renderOption(challenge)}
                        </div>
                    );
                })}
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

function renderOption(challenge) {
    try {
        return <div>{challenge.name}</div>;
    } catch (e) {
        console.log(e);
        return <div />;
    }
}

function renderChallenge([state, setState]) {
    try {
        const challenge = state.challenge;

        return (
            <div
                style={{
                    background: "#e3e3e3",
                    padding: "10px",
                    color: "black",
                    borderRadius: "5px",
                    width: "79%",
                }}
            >
                <div
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                    {challenge.name}:
                </div>
                <div
                    style={{
                        borderBottom: "dotted gray",
                        paddingBottom: "10px",
                    }}
                >
                    {challenge.body()}
                </div>
                <div
                    className="fancy-button"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                        setState({ ...state, challenge: null });
                        Express.call("set-current-challenge", {
                            challenge: null,
                        });
                        Express.call("set-time", { timeInput: 0 });
                    }}
                >
                    Clear
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>ERROR</div>;
    }
}

function renderButtons(challenge) {
    return (
        <div
            style={{
                width: "18%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="fancy-button"
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={() => {
                    if (challenge) {
                        Express.call("change-code", {
                            sessionId:
                                window.sessionStorage.getItem("sessionId"),
                            code: challenge.defaultCode,
                            force: true,
                        });
                        Express.call("set-current-challenge", { challenge });
                        Express.call("set-time", {
                            timeInput: challenge.duration,
                        });
                    }
                }}
            >
                BEGIN
            </div>
        </div>
    );
}

export default ChallengeSelector;
