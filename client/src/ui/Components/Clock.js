import React, { useState, useEffect } from "react";
import ProgressRing from "./ProgressRing";

function Clock(props) {
    try {
        const time = 360 - (props.time / props.target) * 360;
        const percentage = (time / 360) * 100;

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <article
                    class="clock"
                    style={{ padding: props.size ? props.size + "px" : "50px" }}
                >
                    <div style={{ position: "absolute" }}>
                        <ProgressRing progress={percentage || 0} radius={100} />
                    </div>
                    <div class="clock-hand-wrapper">
                        <div
                            class="clock-hand"
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
