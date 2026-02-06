import { useEffect, useState } from 'react';
import './ProgressBars.scss';

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);
      if (percentage === 100) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function ProgressBars() {
  const [bars, setBars] = useState<number[]>([]);

  return (
    <div className="progress-container">
      <button className="add-btn" onClick={() => setBars((b) => [...b, Date.now()])}>
        + Add Progress Bar
      </button>

      <div className="bars-list">
        {bars.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', margin: 0 }}>Click button to add bars</p>
        ) : (
          bars.map((id) => <ProgressBar key={id} />)
        )}
      </div>
    </div>
  );
}
