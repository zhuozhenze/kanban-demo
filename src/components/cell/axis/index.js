import React from "react";
import "./index.css";

const Axis = ({ value, amount, style }) => {
  return (
    <div className="axis" style={style}>
      {value}
      <span style={{ color: "red" }}>{amount ? "(" + amount + ")" : ""}</span>
    </div>
  );
};

export default React.memo(Axis);
