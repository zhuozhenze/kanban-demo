import React from "react";
import dayjs from "dayjs";
import "./index.css";

const Card = ({ cell }) => {
  return cell.orderId ? (
    <>
      <div className="card">
        name：
        {cell.order.name ? cell.order.name : "未安排"}
      </div>
      <div className="card">
        time：
        {cell.order.shootTime
          ? dayjs(cell.order.shootTime).format("HH:mm")
          : "未安排"}
      </div>
    </>
  ) : (
    ""
  );
};

export default React.memo(Card);
