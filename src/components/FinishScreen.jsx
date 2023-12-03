import React from "react";

export default function FinishScreen({ points, maxPoint,dispatch }) {
    const per = (points / maxPoint) * 100;
    return (
        <>
            {" "}
            <p className="result">
                You scored <strong>{points}</strong>
                out of {maxPoint} {Math.ceil(per)}
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "reStart" })}>
                Restart Quiz
            </button>
        </>
    );
}
