import React, { useState, useEffect } from "react";
import { subscribe } from "../../globalHelpers/StateTree";
import Express from "../../middleware/middleware_controller";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-funky.css";

let subscribed = false;
let editing = false;
let sessionId = null;
function CodeBox() {
    const [state, setState] = useState({ code: "console.log('hello')" });
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        if (!subscribed) {
            sessionId = window.sessionStorage.getItem("sessionId");
            subscribe("code", (results) => {
                try {
                    if (
                        !results.force &&
                        (sessionId === results.sessionId || !results)
                    ) {
                        return;
                    }

                    if (!sessionId) {
                        sessionId = window.sessionStorage.getItem("sessionId");
                    }

                    if (
                        results &&
                        results.code &&
                        results.code.length > 0 &&
                        results.code.length != state.code.length
                    ) {
                        setState({ code: results.code });
                    }
                } catch (e) {
                    console.log(e);
                }
            });
            subscribed = true;
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
                    width: "80%",
                }}
            >
                <Editor
                    value={state.code}
                    onValueChange={(code) => {
                        editing = true;
                        Express.call("change-code", {
                            sessionId:
                                window.sessionStorage.getItem("sessionId"),
                            code,
                        });
                        setState({ code });
                    }}
                    onBlur={() => {
                        editing = false;
                    }}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        minHeight: "400px",
                    }}
                />
                <div>
                    <button
                        style={{ marginBottom: "20px" }}
                        onClick={() => {
                            try {
                                const f = new Function(state.code);
                                setAnswer(JSON.stringify(f()));
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Run
                    </button>
                </div>
                <div>{answer}</div>
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>error</div>;
    }
}

export default CodeBox;
