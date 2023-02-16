import React from "react";
import dayjs from "dayjs";
import { Layout } from "antd";

const { Sider } = Layout;

const OrderList = ({ orderList }) => {
  return (
    <Sider theme="light" style={{ overflow: "auto" }}>
      <div style={{ padding: "10px" }}>新增订单列表</div>
      {orderList.map((order, index) => {
        return (
          <div key={index} style={{ padding: "0 10px" }}>
            <div>{index + 1}</div>
            <div>name：{order.name ? order.name : "未安排"}</div>
            <div>
              time：
              {order.shootTime
                ? dayjs(order.shootTime).format("HH:mm")
                : "未安排"}
            </div>
            <div
              style={{
                margin: "5px 0",
                height: "1px",
                width: "100%",
                backgroundColor: "black",
              }}
            ></div>
          </div>
        );
      })}
    </Sider>
  );
};

export default React.memo(OrderList);
