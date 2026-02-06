import { useEffect, useRef, useState } from 'react';
import './Stopwatch.scss';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startRef.current);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button
          className={`start-stop ${isRunning ? 'running' : ''}`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
