import van from "vanjs-core";
import "./counter.css";

const { div, span, button } = van.tags;

export function Counter() {
  const counter = van.state(0);
  return div(
    div(
      "カウント: ",
      span({ class: "count-value" }, counter),
      " ",
      div(
        button({ onclick: () => (counter.val = 0) }, "リセット"),
        button({ onclick: () => ++counter.val }, "　＋　")
      )
    )
  );
}
