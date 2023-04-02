import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";

interface Range {
  start: number;
  end: number;
}

function getDefault(): Range {
  return {
    start: -Date.now(),
    end: Date.now()
  };
}

export function App() {
  const [range, setRange] = useState<Range>(getDefault());

  const middle = Math.floor((range.start + range.end) / 2);
  const date = new Date(middle);

  function handleEarlier() {
    setRange(r => ({ ...r, end: middle }));
  }

  function handleLater() {
    setRange(r => ({ ...r, start: middle }));
  }

  function handleReset() {
    setRange(getDefault());
  }

  return (
    <>
      <p>Please enter your birthday</p>

      <p>
        <button onClick={handleEarlier}>earlier</button>
        &nbsp;
        <span>{date.toLocaleDateString()}</span>
        &nbsp;
        <button onClick={handleLater}>later</button>
      </p>

      <p>
        <button onClick={handleReset}>i fucked up, reset</button>
      </p>
    </>
  );
}
