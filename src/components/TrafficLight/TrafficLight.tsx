import { useEffect, useState } from 'react';
import './TrafficLight.scss';

export default function TrafficLight() {
  const [signal, setSignal] = useState("green");

  useEffect(() => {
    let timeoutId: any;

    if (signal === "green") {
      timeoutId = setTimeout(() => setSignal("yellow"), 3000);
    } else if (signal === "yellow") {
      timeoutId = setTimeout(() => setSignal("red"), 1000);
    } else if (signal === "red") {
      timeoutId = setTimeout(() => setSignal("green"), 4000);
    }

    return () => clearTimeout(timeoutId);
  }, [signal]);

  return (
    <div className="traffic-light-showcase">
      <div className="traffic-light-pole">
        <div className={`light red ${signal === "red" ? "active" : ""}`} />
        <div className={`light yellow ${signal === "yellow" ? "active" : ""}`} />
        <div className={`light green ${signal === "green" ? "active" : ""}`} />
      </div>
      <div className={`status-text ${signal}`}>
        {signal}
      </div>
    </div>
  );
}
