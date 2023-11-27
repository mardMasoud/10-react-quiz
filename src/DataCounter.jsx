import { useReducer } from "react";
const initialState = { step: 1, count: 0 };
function reducer(state, action) {
    switch (action.type) {
        case "inc":
            return { ...state, count: state.count + state.step };
        case "dec":
            return { ...state, count: state.count - state.step };
        case "setCount":
            return { ...state, count: action.playload };
        case "setStep":
            return { ...state, step: action.playload };
        case "rest":
            return initialState;
        default:
            throw new Error("Unknow action");
    }
}
function DateCounter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const date = new Date("june 21 2027");
    //   date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec" });
    };

    const inc = function () {
        dispatch({ type: "inc" });
    };

    const defineCount = function (e) {
        dispatch({ type: "setCount", playload: Number(e.target.value) });
    };

    const defineStep = function (e) {
        dispatch({ type: "setStep", playload: Number(e.target.value) + 1 });
    };

    const reset = function () {
        dispatch({ type: "rest" });
    };

    return (
        <div className="counter">
            <div>
                <input type="range" min="0" max="10" value={state.step} onChange={defineStep} />
                <span>{state.step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={state.count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
