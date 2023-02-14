function App(props) {

  function handleLinks(quiz, progress) {
    props.setQuiz(quiz);
    props.setProgress(progress);
  }

  return (
    <div className="text-center padding-y-64 padding-x-24 max_width-512px margin-x-auto">
      <span className="block font_size-24 font_weight-bold margin-b-16">Kezdődhet a gyakorlás?</span>
      <span className="block font_size-40 margin-b-48">👇</span>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("penzugyi-piacok", "Quiz")}
      >Pénzügyi piacok</button>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("altalanos-jogi-ismeretek", "Quiz")}
      >Általános jogi ismeretek</button>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("lakossagi-megtakaritasi-termekek", "Quiz")}
      >Lakossági megtakarítási termékek</button>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("hitelezesi-alapfogalmak", "Quiz")}
      >Hitelezési alapfogalmak</button>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("hiteltipusok-es-hiteltermekek", "Quiz")}
      >Hiteltípusok és hiteltermékek</button>
      <button
        className="block underline padding-y-16"
        onClick={() => handleLinks("a-mikro-kis-es-kozepvallalati-uzletag-fobb-termekei-es-szolgaltatasai", "Quiz")}
      >A mikro-, kis- és középvállalati üzletág főbb termékei és szolgáltatásai</button>
    </div>
  );
}

export default App;
