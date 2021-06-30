import React, { useState, useEffect } from "react";
import { update } from "../../globalHelpers/StateTree";
import CodeBox from "../Components/CodeBox";
import Timer from "../Components/Timer";
import ChallengeSelector from "../Components/ChallengeSelector";
import _ from "lodash";

const headerLayout = [CodeBox, Timer];
const bodyLayout = [ChallengeSelector];

function PageViewer() {
    const [state, setState] = useState({});

    useEffect(() => {
        let sessionId = window.sessionStorage.getItem("sessionId");

        if (!sessionId) {
            sessionId = createId(10);
            window.sessionStorage.setItem("sessionId", sessionId);
        }

        const route = window.location.origin.includes("localhost")
            ? "http://localhost:4000/events/"
            : "/events/";
        let events = new EventSource(route + sessionId);
        events.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            try {
                update(
                    parsedData.observable ? parsedData.observable : "code",
                    parsedData
                );
            } catch (e) {}
        };

        events.onerror = (event) => {
            events = new EventSource(route + sessionId);
        };
    });
    try {
        return <div>{renderComponents()}</div>;
    } catch (e) {
        console.log(e);
    }
}

function renderComponents() {
    try {
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {_.map(headerLayout, (component, index) => {
                        return React.createElement(component, { key: index });
                    })}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {_.map(bodyLayout, (component, index) => {
                        return React.createElement(component, { key: index });
                    })}
                </div>
            </div>
        );
    } catch (e) {
        console.log(e);
    }
}

function createId(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export default PageViewer;
