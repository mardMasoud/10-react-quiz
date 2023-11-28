import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main1 from "./Main1";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
const initialState = {
    questions: [],
    //'loading','error','ready','active','finished'
    status: "loading",
};
function reducer(state, action) {
    switch (action.type) {
        case "dataRecived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return { ...state, status: "active" };
        default:
            throw new Error("Action unkonwn");
    }
}
function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
    const questionsNumber = questions.length;
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataRecived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    function handleBtn() {
        dispatch({ type: "start" });
        console.log("ghfghgfhfgh")
    }
    return (
        <div className="app">
            <Header />
            <Main1>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen questionsNumber={questionsNumber} dispatch={dispatch} />
                )}
                {status === "active" && <Question />}
            </Main1>
        </div>
    );
}

export default App;
