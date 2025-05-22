import React from "react";
import ReactDOM from "react-dom";
import OrderEntry from "./OrderEntry";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<OrderEntry asset={"BTC"} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
