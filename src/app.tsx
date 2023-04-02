import { useEffect, useState } from "preact/hooks";
import "./app.css";

interface Range {
  start: number;
  end: number;
}

interface Action {
  action: "<" | ">";
  dateString: string;
  range: Range;
}

function getDefault(): Range {
  return {
    start: -Date.now(),
    end: Date.now()
  };
}

export function App() {
  const [range, setRange] = useState<Range>(getDefault());
  const [actions, setActions] = useState<Action[]>([]);

  const middle = Math.floor((range.start + range.end) / 2);
  const date = new Date(middle);
  const dateString = date.toLocaleDateString();

  useEffect(() => {
    function listener(ev: KeyboardEvent) {
      if (ev.repeat) return;

      if (ev.key === "z" && ev.ctrlKey) {
        handleGoBack();
      }
    }

    document.addEventListener("keydown", listener, true);

    return document.removeEventListener("keydown", listener);
  }, []);

  function handleEarlier() {
    setActions(a => [{ action: "<", dateString, range }, ...a]);

    setRange(r => ({ ...r, end: middle }));
  }

  function handleLater() {
    setActions(a => [{ action: ">", dateString, range }, ...a]);

    setRange(r => ({ ...r, start: middle }));
  }

  function handleGoBack() {
    const action = actions[0];

    setActions(a => a.slice(1));

    setRange(action?.range ?? getDefault());
  }

  function handleReset() {
    setActions([]);
    setRange(getDefault());
  }

  return (
    <div class="container">
      <p>Please enter your birthday</p>

      <p>
        <button onClick={handleEarlier}>earlier</button>
        &nbsp;
        <span>{dateString}</span>
        &nbsp;
        <button onClick={handleLater}>later</button>
      </p>

      {actions.length > 0 ? (
        <>
          <p>
            <button onClick={handleReset}>i fucked up, reset</button>
            &nbsp;
            <button onClick={handleGoBack}>ctrl + z</button>
          </p>

          <p>
            You have tried {actions.length} time(s).{" "}
            {actions.length > 5 ? "Please be quicker." : ""}
          </p>
        </>
      ) : null}

      {actions.map((act, i) => (
        <p key={act} class={i === 0 ? "last-action" : undefined}>
          {act.action} {act.dateString}
        </p>
      ))}
    </div>
  );
}
