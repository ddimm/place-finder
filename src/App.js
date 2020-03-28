import {
  AppBar,
  Button,
  CssBaseline,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Picker from "./Picker";
import Search from "./Search";
import Review from "./Review";
import { styles } from "./Styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const steps = ["Look for a place", "Select what you want", "Check them out"];
const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});
function App() {
  const classStyles = styles(darkTheme);
  const [results, setResults] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep - 1 === 0) {
      setResults([]);
    } else if (activeStep === steps.length - 1) {
      setSelected(null);
    }
    setActiveStep(activeStep - 1);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Search search={search} setSearch={newText => setSearch(newText)} />
        );
      case 1:
        if (search === "") {
          handleBack();
          return (
            <Search search={search} setSearch={newText => setSearch(newText)} />
          );
        }
        return (
          <Picker
            search={search}
            setSelected={newData => {
              setSelected(newData);
            }}
            results={results}
            setResults={newData => {
              setResults(newData);
            }}
          />
        );
      case 2:
        if (selected === null) {
          handleBack();

          return (
            <Picker
              search={search}
              setSelected={newData => {
                setSelected(newData);
              }}
              results={results}
              setResults={newData => {
                setResults(newData);
              }}
            />
          );
        } else {
          return <Review selected={selected} />;
        }

      default:
        throw new Error("Error");
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          className={classStyles.appBar}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              What's Cookin'?
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classStyles.layout}>
          <Paper className={classStyles.paper}>
            <Typography component="h1" variant="h4" align="center">
              What's Good?
            </Typography>
            <Stepper activeStep={activeStep} className={classStyles.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classStyles.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classStyles.button}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <></>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classStyles.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}
              </div>
            </React.Fragment>
          </Paper>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
