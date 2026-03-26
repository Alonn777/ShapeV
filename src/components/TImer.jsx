import { useState, useEffect, useContext } from "react";
import { Clock, Play, Trophy } from "lucide-react";
import { TimerContext } from "../context/TimerContext.jsx";

const Timer = () => {
  const {
    TimerValueContext,
    SetTimerValueContext,
    paused,
    SetPause,
    finishedTimer,
    SetFinnished,
  } = useContext(TimerContext);
  const [TimerValue, SetTimerValue] = useState(0);
  const [FirstStep, SetFirstStep] = useState(false);

  useEffect(() => {
    let interval;
    if (paused === true) {
      interval = setInterval(() => {
        SetTimerValue((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    SetTimerValueContext(TimerFormatado);
  }, [TimerValue]);

  const horas = Math.floor(TimerValue / 3600);
  const minutos = Math.floor((TimerValue % 3600) / 60);
  const segundos = TimerValue % 60;
  const TimerFormatado =
    String(horas).padStart(2, "0") +
    ":" +
    String(minutos).padStart(2, "0") +
    ":" +
    String(segundos).padStart(2, "0");
  // Buttons

  const StartTimer = () => {
    SetPause(true);
    SetFirstStep(true);
  };

  return (
    <div className="timer-container">
      {FirstStep ? (
        <div className="timer-content">
          {finishedTimer ? (
            <div className="finnished-content">
              <Trophy color="#15fd21" />
              <h3>Parabéns por ter finalizado!</h3>
              <p className="clock">{TimerFormatado}</p>
            </div>
          ) : (
            <div className="timer-clock">
              {paused ? (
                <div className="timer-box">
                  <div className="timer">
                    <div className="on"></div>
                    <p>treino em andamento</p>
                    <p className="clock">{TimerFormatado}</p>
                  </div>
                  <button onClick={() => SetPause(false)}>Pausar</button>
                </div>
              ) : (
                <div className="timer-box">
                  <div className="timer">
                    <div className="pause"></div>
                    <p>pausado</p>
                    <p className="clock">{TimerFormatado}</p>
                  </div>
                  <button onClick={() => SetPause(true)}>Retomar</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="FirstStep-timer">
          <div className="icon-timer">
            <Clock color="#1581fdc2" size={30} />
          </div>
          <h3>Pronto para treinar ?</h3>
          <p>Inicie o cronômetro para contabilizar seu treino</p>
          <button onClick={StartTimer}>
            <Play color="#fff" />
            Iniciar Cronomêtro
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
