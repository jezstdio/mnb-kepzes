import { Fragment, useState } from 'react';

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import End from "./pages/End";

import "./8px-grid-min.css";
import "./style.scss";

function App() {
  const [progress, setProgress] = useState("Home");
  const [quiz, setQuiz] = useState("");

  return (
    <Fragment>
      { progress === "Home" && <Home
        setProgress={setProgress}
        setQuiz={setQuiz} />
      }
      { progress === "Quiz" && <Quiz
        quiz={quiz} 
        setQuiz={setQuiz}
        setProgress={setProgress}
        />
      }
      { progress === "End" && <End
        setProgress={setProgress}
        setQuiz={setQuiz} />
      }
    </Fragment>
    /*
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/penzugyi-piacok" element={<Quiz />} />
        <Route exact path="/altalanos-jogi-ismeretek" element={<Quiz />} />
        <Route exact path="/lakossagi-megtakaritasi-termekek" element={<Quiz />} />
        <Route exact path="/hitelezesi-alapfogalmak" element={<Quiz />} />
        <Route exact path="/hiteltipusok-es-hiteltermekek" element={<Quiz />} />
        <Route exact path="/a-mikro-kis-es-kozepvallalati-uzletag-fobb-termekei-es-szolgaltatasai" element={<Quiz />} />

        <Route exact path="/osszefoglalo" element={<End />} />
      </Routes>
    </Router>
    */
  );
}

export default App;
