import React, { useState, useEffect } from "react";
import ProgressRing from "./ProgressRing";

function Clock(props) {
    try {
        let time = 0;
        let percentage = 0;

        if (props.time > 0 && props.target > 0) {
            time = 360 - (props.time / props.target) * 360;
            percentage = (time / 360) * 100;
        }

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <article
                    className="clock"
                    style={{ padding: props.size ? props.size + "px" : "50px" }}
                >
                    <div style={{ position: "absolute" }}>
                        <ProgressRing progress={percentage || 0} radius={100} />
                    </div>
                    <div className="clock-hand-wrapper">
                        <div
                            className="clock-hand"
                            style={{
                                transform: "rotateZ(" + time + "deg)",
                                height: props.size ? props.size + "px" : "50px",
                                marginTop: props.size
                                    ? -props.size + "px"
                                    : "-50px",
                            }}
                        />
                    </div>
                </article>
            </div>
        );
    } catch (e) {
        console.log(e);
        return <div>error</div>;
    }
}

export default Clock;
