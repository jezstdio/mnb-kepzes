import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quiz(props) {
    const [data, setData] = useState();

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
    
    useEffect(() => {
        axios.get(`database/${props.quiz}.json`)
        .then(res => {
            const questions = shuffleArray(res.data.map(data => {
                data.score = 0

                return data;
            }));

            setData(questions);
        });
    }, []);

    return (
        <React.Fragment>
            { data && <GameSpace
                data={data}
                setData={setData}
                setQuiz={props.setQuiz}
                setProgress={props.setProgress}
            />}
        </React.Fragment>
    )
}

function GameSpace(props) {
    const questions = props.data;
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(undefined);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleLinks(quiz, progress) {
        props.setQuiz(quiz);
        props.setProgress(progress);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    useEffect(() => {
        if (isAnswerCorrect) { questions[0].score = questions[0].score + 1 }
    }, [isAnswerCorrect]);

    return (
        <div className={`relative height-100vh width-100 padding-x-24 padding-t-56 padding-b-80 text-center max_width-512px margin-x-auto`}>
            <span>{correctAnswers}/{questions.length}</span>
            <div className={`animating ${isAnimating ? 'animating-on' : ''}`}>
                <span className="block font_size-24 font_weight-bold margin-b-56">{ questions[0]["Kérdés"] }</span>
                <div className="padding-b-128">
                    { questions[0]["Válaszok"].map(answer => <AnswerButton
                        key={answer}
                        setCorrectAnswers={setCorrectAnswers}
                        isAnswerCorrect={isAnswerCorrect}
                        setIsAnswerCorrect={setIsAnswerCorrect}
                        answer={answer} />) }
                </div>
                
                <div className="relative floating max_width-512px flex end">
                    <button
                        className={`absolute right-0 button ${isAnswerCorrect !== undefined && correctAnswers < questions.length && !isAnimating ? 'visible' : 'hidden opacity-0'}`}
                        onClick={() => {
                            setIsAnimating(true);
                            setTimeout(() => {
                                props.setData(shuffleArray(questions.map(question => {
                                    question["Válaszok"] = shuffleArray(question["Válaszok"]);
                                    return question;
                                })).sort((a, b) => a.score - b.score));
                                setIsAnswerCorrect(undefined);
                            }, 500);
                            setTimeout(() => setIsAnimating(false), 500)
                        }}
                        disabled={!(isAnswerCorrect !== undefined && correctAnswers < questions.length)}
                    >Következő</button>
                    <button
                        className={`absolute right-0 button ${correctAnswers >= questions.length && !isAnimating? 'visible' : 'hidden opacity-0'}`}
                        onClick={() => { handleLinks("", "End") }}
                        disabled={!(correctAnswers >= questions.length)}
                    >Vége</button>
                </div>
            </div>
        </div>
    )
}

function AnswerButton(props) {
    const [status, setStatus] = useState();

    return (
        <button
            className={`margin-x-auto margin-b-16--d padding-y-16 ${props.isAnswerCorrect === false ? props.answer[1] ? "correct" : '' : ''} ${status ? status : ''}`.trim()}
            onClick={() => {
                if (props.answer[1]) {
                    setStatus("correct");
                    props.setCorrectAnswers(count => count + 1)
                    props.setIsAnswerCorrect(true);
                } else {
                    setStatus("wrong");
                    props.setIsAnswerCorrect(false);
                }
            }}
            disabled={props.isAnswerCorrect !== undefined}
        >{props.answer[0]}</button>
    )
}

export default Quiz;