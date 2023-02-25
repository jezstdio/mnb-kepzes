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
        handleLinks={handleLinks}
        />
      }
      { progress === "Quiz" && <Quiz
        quiz={quiz}
        handleLinks={handleLinks}
        />
      }
      { progress === "End" && <End
        handleLinks={handleLinks}
        />
      }
    </Fragment>
  );
}

export default App;
