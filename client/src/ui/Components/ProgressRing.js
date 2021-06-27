import React, { useState, useEffect } from "react";

function ProgressRing(props) {
    const { radius, stroke, progress } = props;
    let normalizedRadius = radius - stroke * 2;
    let circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="red"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                stroke-width={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
}

function Progress(props) {
    const progress = props.progress || 0;

    return <ProgressRing stroke={4} progress={progress} {...props} />;
}

export default Progress;
