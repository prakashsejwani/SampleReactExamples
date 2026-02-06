import { useState } from "react";
import useTimeout from "./use-timeout";

export default function UseTimeoutDemo() {
  const [loading, setLoading] = useState(true);

  useTimeout(() => setLoading(false), 1000);

  return (
    <div>
      <p>{loading ? 'Loading' : 'Ready'}</p>
    </div>
  );
}