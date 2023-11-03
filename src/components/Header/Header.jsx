import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./Header.css";
import categories from "../../data/category";

function Header({ category, setCategory, word, setWord, lightmode }) {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightmode ? "#000" : "#fff",
      },
      mode: lightmode ? "light" : "dark",
    },
  });

  const handleChange = (language) => {
    setCategory(language);
    setWord("");
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Word Hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            // id="standard-basic"
            label="Search a Word"
            variant="standard"
            className="search"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <TextField
            // id="standard-select-currency"
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
            // helperText="Please select your language"
            variant="standard"
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Header;
