import "./Definitions.css";

function Definitions({ word, category, meanings, lightmode }) {
  return (
    <div className="meanings">
      {word && meanings[0] && category === "en" && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          style={{ backgroundColor: "#fff", borderRadius: 30 }}
          controls
        >
          Your Broswer doesn't support audio element.
        </audio>
      )}

      {word === "" ? (
        <span className="subTitle">Start by typing a word in Search</span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              // eslint-disable-next-line react/jsx-key
              <div
                className="singleMean"
                style={{
                  backgroundColor: lightmode ? "#3b5360" : "white",
                  color: lightmode ? "white" : "black",
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example : </b>
                    {def.example}
                  </span>
                )}
                {def.synonyms.length === 0 ? null : (
                  <span>
                    <b>Synonyms : </b>
                    {def.synonyms.join(", ")}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
}

export default Definitions;
