import { Container, Switch } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import { grey } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightmode, setLightmode] = useState(false);

  const DarkMode = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: grey[300],
      "&:hover": {
        backgroundColor: alpha(grey[300], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: grey[300],
    },
  }));

  console.log(word);

  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightmode ? "white" : "#282c34",
        color: lightmode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 15 }}>
          <span>{lightmode ? "Dark" : "Light"} Mode</span>
          <DarkMode
            checked={lightmode}
            onChange={() => setLightmode(!lightmode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightmode={lightmode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightmode={lightmode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
