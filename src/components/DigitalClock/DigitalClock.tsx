import { useEffect, useState } from "react";
import './DigitalClock.scss';

const DIGIT_SEGMENTS: Record<string | number, number[]> = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

function Digit({ value }: { value: string | number }) {
  const segments = DIGIT_SEGMENTS[value];

  return (
    <div className="digit">
      {segments.map((on: number, i: number) => (
        <span
          key={i}
          className={`segment segment-${i} ${on ? "on" : ""}`}
        />
      ))}
    </div>
  );
}

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  if (!is24Hour) {
    hours = hours % 12 || 12;
  }

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  const digits = `${hh}${mm}${ss}`.split("");

  return (
    <div className="clock-container">
      {/* Toggle */}
      <button
        className="toggle-btn"
        onClick={() => setIs24Hour((v: boolean) => !v)}
      >
        {is24Hour ? "Switch to 12h" : "Switch to 24h"}
      </button>

      {/* Clock Frame */}
      <div className="clock-wrapper">
        <div className="clock">
          {digits.map((d, i) => (
            <div key={i} className="clock-item">
              <Digit value={d} />
              {(i === 1 || i === 3) && (
                <div className="colon">
                  <span />
                  <span />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
