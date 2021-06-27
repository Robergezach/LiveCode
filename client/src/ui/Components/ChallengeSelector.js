import React, { useState, useEffect } from "react";
import Express from "../../middleware/middleware_controller";
import { subscribe } from "../../globalHelpers/StateTree";
import ReverseString from "../Challenges/ReverseString";

function ChallengeSelector() {
    const [state, setState] = useState({ challenge: ReverseString });

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
                {renderChallenge(state.challenge)}
                {renderButtons(state.challenge)}
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>error</div>;
    }
}

function renderChallenge(challenge) {
    try {
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
                {challenge.body()}
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
                class="fancy-button"
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={() => {
                    console.log(challenge);
                    Express.call("session", {
                        sessionId: window.sessionStorage.getItem("sessionId"),
                        code: challenge.defaultCode,
                        force: true,
                    });
                }}
            >
                BEGIN
            </div>
        </div>
    );
}

export default ChallengeSelector;
