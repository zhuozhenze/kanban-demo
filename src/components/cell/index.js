import React from "react";
import Card from "./card";
import Axis from "./axis";
import "./index.css";

const Cell = ({ cell, className, onClick, axisValue, axisAmount, style }) => {
  return (
    <td
      onClick={onClick(cell)}
      rowSpan={cell.rowSpan}
      colSpan={cell.colSpan}
      className={"cell " + className}
      style={
        cell.orderId
          ? {
              ...style,
              backgroundColor:
                cell.order.status === 1
                  ? "#f07882"
                  : cell.order.status === 2
                  ? "#2ba0ff"
                  : "#00d884",
              color: "#fff",
            }
          : { ...style }
      }
    >
      {axisValue ? (
        <Axis value={axisValue} amount={axisAmount} />
      ) : (
        <Card cell={cell} />
      )}
    </td>
  );
};

export default React.memo(Cell);
