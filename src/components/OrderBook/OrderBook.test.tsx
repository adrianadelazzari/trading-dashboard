import React from "react";
import ReactDOM from "react-dom";
import OrderBook from "./OrderBook";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<OrderBook asset={"BTC"} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
