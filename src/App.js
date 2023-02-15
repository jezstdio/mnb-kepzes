import { Fragment, useState } from 'react';

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import End from "./pages/End";

import "./8px-grid-min.css";
import "./style.scss";

function App() {
  const [progress, setProgress] = useState("Home");
  const [quiz, setQuiz] = useState("");

  function handleLinks(quiz, progress) {
    setQuiz(quiz);
    setProgress(progress);
  }

  return (
    <Fragment>
      { progress === "Home" && <Home
        setProgress={setProgress}
        setQuiz={setQuiz}
        handleLinks={handleLinks}
        />
      }
      { progress === "Quiz" && <Quiz
        quiz={quiz} 
        setQuiz={setQuiz}
        setProgress={setProgress}
        handleLinks={handleLinks}
        />
      }
      { progress === "End" && <End
        setProgress={setProgress}
        setQuiz={setQuiz} />
      }
    </Fragment>
  );
}

export default App;
