import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main1 from "./Main1";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
const initialState = {
    questions: [],
    //'loading','error','ready','active','finished'
    status: "loading",
    index: 0,
    points: 0,
    answer: null,
};
function reducer(state, action) {
    switch (action.type) {
        case "reStart":
            return { ...state,index:0, answer: null,points: 0, status: "ready" };
        case "dataRecived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return { ...state, status: "active" };
        case "newAnswer":
            const question = state.questions[state.index];
            // const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
            };
        default:
            throw new Error("Action unkonwn");
    }
}
function App() {
    const [{ questions, status, index, answer, points }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const questionsNumber = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataRecived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main1>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen questionsNumber={questionsNumber} dispatch={dispatch} />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            answer={answer}
                            index={index}
                            numQuestions={questionsNumber}
                            points={points}
                            maxPoints={maxPoints}
                        />
                        <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                        {answer !== null && (
                            <NextButton dispatch={dispatch} numQuestions={questionsNumber} index={index} answer={answer} />
                        )}
                    </>
                )}
                {status === "finished" && <FinishScreen maxPoint={maxPoints} points={points} dispatch={dispatch} />}
            </Main1>
        </div>
    );
}

export default App;
