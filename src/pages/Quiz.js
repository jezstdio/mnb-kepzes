import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { shuffleArray } from '../utils';

function Quiz(props) {
    const [data, setData] = useState();
    
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
                handleLinks={props.handleLinks}
            />}
        </React.Fragment>
    )
}

function GameSpace(props) {
    const questions = props.data;
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(undefined);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextButton = useRef();
    const endButton = useRef();

    function handleNextClick() {
        setIsAnimating(true);
        setIsAnswerCorrect(undefined);
        setTimeout(() => {
            props.setData(shuffleArray(questions.map(question => {
                question["Válaszok"] = shuffleArray(question["Válaszok"]);
                return question;
            })).sort((a, b) => a.score - b.score));
            window.scrollTo(0, 0);
        }, 500);
        setTimeout(() => setIsAnimating(false), 500);
    }

    function handleEndClick() { props.handleLinks("", "End") }

    function endKeyDown(e) {
        if (e.key === "Enter" && !endButton.current.disabled && isAnswerCorrect === undefined) { handleEndClick() }
    }

    function nextKeyDown(e) {
        if (e.key === "Enter" && !nextButton.current.disabled && isAnswerCorrect === undefined) { handleNextClick() }
    }

    useEffect(() => {
        window.addEventListener("keydown", nextKeyDown);

        return () => {
            window.removeEventListener("keydown", nextKeyDown);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", endKeyDown);

        return () => {
            window.removeEventListener("keydown", endKeyDown);
        }
    }, []);

    useEffect(() => {
        if (isAnswerCorrect) { questions[0].score = questions[0].score + 1 }
    }, [isAnswerCorrect]);

    return (
        <div className={`relative width-100 padding-x-24 padding-t-56 padding-b-104 text-center max_width-512px margin-x-auto`}>
            <span><span className="color--green">{correctAnswers}</span>/{questions.length} - <span className="color--red">{wrongAnswers}</span></span>
            <div className={`animating ${isAnimating ? 'animating-on' : ''}`}>
                <span className="block font_size-24 font_weight-bold margin-b-56">{ questions[0]["Kérdés"] }</span>
                { questions[0]["Válaszok"].map((answer, index) => <AnswerButton
                        key={`${index}${answer}`}
                        index={index}
                        setCorrectAnswers={setCorrectAnswers}
                        setWrongAnswers={setWrongAnswers}
                        isAnswerCorrect={isAnswerCorrect}
                        setIsAnswerCorrect={setIsAnswerCorrect}
                        answer={answer} />) }
                
                <div className="floating max_width-512px flex center">
                    <button
                        ref={nextButton}
                        className={`absolute bottom-24 button ${isAnswerCorrect !== undefined && correctAnswers < questions.length && !isAnimating ? 'visible' : 'hidden opacity-0'}`}
                        onClick={handleNextClick}
                        disabled={!(isAnswerCorrect !== undefined && correctAnswers < questions.length)}
                    >Következő</button>
                    <button
                        ref={endButton}
                        className={`absolute bottom-24 button ${correctAnswers >= questions.length && !isAnimating? 'visible' : 'hidden opacity-0'}`}
                        onClick={handleEndClick}
                        disabled={!(correctAnswers >= questions.length)}
                    >Vége</button>
                </div>
            </div>
        </div>
    )
}

function AnswerButton(props) {
    const [status, setStatus] = useState();
    const button = useRef();

    function handleClick() {
        if (props.answer[1]) {
            setStatus("correct");
            props.setCorrectAnswers(count => count + 1);
            props.setIsAnswerCorrect(true);
        } else {
            setStatus("wrong");
            props.setWrongAnswers(count => count + 1);
            props.setIsAnswerCorrect(false);
        }
    }

    function answerKeyDown(e) {
        if (parseInt(e.key) === parseInt(props.index + 1) && !button.current.disabled) {
            handleClick();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", answerKeyDown);

        return () => {
            window.removeEventListener("keydown", answerKeyDown)
        }
    }, []);

    useEffect(() => {
        props.isAnswerCorrect === undefined && setStatus(undefined)
    }, [props.isAnswerCorrect]);

    return (
        <button
            ref={props.isAnswerCorrect === undefined ? button : undefined}
            className={`${props.index + 1} margin-b-16--d padding-y-16 ${props.isAnswerCorrect === false ? props.answer[1] ? "correct" : '' : ''} ${status ? status : ''}`.trim()}
            onClick={handleClick}
            disabled={props.isAnswerCorrect !== undefined}
        >{props.answer[0]}</button>
    )
}

export default Quiz;