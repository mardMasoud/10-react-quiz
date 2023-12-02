import React from "react";

export default function Progress({ numQuestions, index,points,maxPoints,answer }) {

    return (
        <header className="progress">
          <progress max={numQuestions} value={index+Number(answer!==null)} />
            <p>
                Question <strong>{index}</strong>/{numQuestions}
            </p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    );
}
