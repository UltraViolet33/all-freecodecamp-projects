import { useEffect, useState } from "react";
import audioBeep from "./assets/beep.wav";
import { Length } from "./components/Length";
import "./App.css";

export const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRunning, setCurrentRunning] = useState("Session");

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const [state, setState] = useState({
    minutes: 25,
    seconds: 0,
  });

  const startTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setCurrentRunning("Session");
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setState({ minutes: 25, seconds: 0 });
    const audioElement = document.getElementById("beep");
    audioElement.pause();
    audioElement.currentTime = 0;
  };

  const decrementSession = () => {
    if (sessionLength - 1 <= 0) {
      return;
    }
    setSessionLength(sessionLength - 1);
    setState({ ...state, minutes: sessionLength - 1 });
  };

  const incrementSession = () => {
    if (sessionLength + 1 > 60) {
      return;
    }
    setSessionLength(sessionLength + 1);
    setState({ ...state, minutes: sessionLength + 1 });
  };

  const decrementBreak = () => {
    if (breakLength - 1 <= 0) {
      return;
    }

    setBreakLength(breakLength - 1);
  };

  const incrementBreak = () => {
    if (breakLength + 1 > 60) {
      return;
    }
    setBreakLength(breakLength + 1);
  };

  const playAudioBeep = () => {
    const audioElement = document.getElementById("beep");
    audioElement.play();
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        const { seconds, minutes } = state;

        if (seconds > 0) {
          const newState = { minutes: minutes, seconds: seconds - 1 };
          setState(newState);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            if (currentRunning === "Session") {
              setCurrentRunning("Break");
              setState({ minutes: breakLength, seconds: 0 });
              playAudioBeep();
            } else {
              setCurrentRunning("Session");
              setState({ minutes: sessionLength, seconds: 0 });
              playAudioBeep();
            }
          } else {
            const newState = { minutes: minutes - 1, seconds: 59 };
            setState(newState);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, isRunning, breakLength, currentRunning, sessionLength]);

  return (
    <div>
      <h1 className="center">25 + 5 Clock</h1>
      <div className="control-container">
        <Length
          labelId="break-label"
          spanId="break-length"
          title="Break"
          lengthDuration={breakLength}
          incrementId="break-increment"
          decrementId="break-decrement"
          decrement={decrementBreak}
          increment={incrementBreak}
        />
        <Length
          labelId="session-label"
          spanId="session-length"
          title="Session"
          lengthDuration={sessionLength}
          incrementId="session-increment"
          decrementId="session-decrement"
          decrement={decrementSession}
          increment={incrementSession}
        />
      </div>
      <div className="session-container">
        <p id="timer-label">{currentRunning}</p>
        <p id="time-left">
          {state.minutes < 10 ? `0${state.minutes}` : state.minutes}:
          {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
        </p>
      </div>
      <div className="control-container">
        <button id="start_stop" onClick={startTimer}>
          Start
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <audio style={{ display: "none" }} id="beep" src={audioBeep}></audio>
    </div>
  );
};
