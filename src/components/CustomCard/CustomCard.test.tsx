import React from "react";
import ReactDOM from "react-dom";
import CustomCard from "./CustomCard";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CustomCard title={""} children={undefined} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
