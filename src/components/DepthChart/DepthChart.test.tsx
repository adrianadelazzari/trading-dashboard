import React from "react";
import ReactDOM from "react-dom";
import DepthChart from "./DepthChart";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DepthChart asset={"BTC"} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
