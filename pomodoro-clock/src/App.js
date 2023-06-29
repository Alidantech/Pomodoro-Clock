import React, { useState, useEffect } from 'react';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            playSound();
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              setTime(breakLength * 60);
            } else {
              setTimerLabel('Session');
              setTime(sessionLength * 60);
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, breakLength, sessionLength, timerLabel]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(prevLength => prevLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(prevLength => prevLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(prevLength => prevLength - 1);
      if (!isRunning) {
        setTime(prevTime => prevTime - 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(prevLength => prevLength + 1);
      if (!isRunning) {
        setTime(prevTime => prevTime + 60);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime(25 * 60);
    setTimerLabel('Session');
    setIsRunning(false);
    stopSound();
  };

  const playSound = () => {
    const audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play();
  };

  const stopSound = () => {
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">25 + 5 Clock</h1>
      <div className="row mt-4">
        <div className="col text-center">
          <h2 id="break-label">Break Length</h2>
          <div className="btn-group">
            <button className="btn btn-secondary" id="break-decrement" onClick={handleBreakDecrement}>
              <i className="fas fa-minus"></i>
            </button>
            <span id="break-length" className="btn btn-light">
              {breakLength}
            </span>
            <button className="btn btn-secondary" id="break-increment" onClick={handleBreakIncrement}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="col text-center">
          <h2 id="session-label">Session Length</h2>
          <div className="btn-group">
            <button className="btn btn-secondary" id="session-decrement" onClick={handleSessionDecrement}>
              <i className="fas fa-minus"></i>
            </button>
            <span id="session-length" className="btn btn-light">
              {sessionLength}
            </span>
            <button className="btn btn-secondary" id="session-increment" onClick={handleSessionIncrement}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col text-center">
          <h3 id="timer-label">{timerLabel}</h3>
          <div id="time-left" className="display-1">
            {formatTime(time)}
          </div>
          <button className="btn btn-primary" id="start_stop" onClick={handleStartStop}>
            {isRunning ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
          </button>
          <button className="btn btn-danger" id="reset" onClick={handleReset}>
            <i className="fas fa-redo-alt"></i>
          </button>
          <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"></audio>
        </div>
      </div>
    </div>
  );
};

export default App;
