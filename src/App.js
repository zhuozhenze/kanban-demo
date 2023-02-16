import React, { useEffect, useState, useRef, useMemo } from "react";
import dayjs from "dayjs";
import { Layout, Modal } from "antd";
import OrderCreate from "./components/order-create";
import OrderList from "./components/order-list";
import Cell from "./components/cell";
import { data as initData } from "./config";
import { initTable, adjustPosition, calculateAxis } from "./utils";
import "./App.css";

// const CellType = {
//   orderId: "string",
//   order: "object",
//   row: "number",
//   col: "number",
//   show: "boolean",
//   rowspan: "number",
//   colspan: "number",
// };

const DEFAULT_CARD_SIZE = 200;

const DEFAULT_BUSINESS_TIME = [
  dayjs("09:30", "HH:mm"),
  dayjs("22:00", "HH:mm"),
];
const DEFAULT_SHOOT_DURATION = 2;

function App() {
  const [orderList, setOrderList] = useState([]);
  const [tableCellList, setTableCellList] = useState([]);
  const tableCellListRef = useRef([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const orderRef = useRef(null);
  const [businessTime, setBusinessTime] = useState(DEFAULT_BUSINESS_TIME);
  const [shootDuration, setShootDuration] = useState(DEFAULT_SHOOT_DURATION);

  const axisList = useMemo(() => {
    let list = calculateAxis(businessTime);
    list.unshift(...new Array(shootDuration - 1).fill("--"));
    list.unshift("时间待定");
    return list;
  }, [businessTime, shootDuration]);

  const orderAmountList = useMemo(() => {
    let data = [];
    tableCellList.forEach((row, rowIndex) => {
      data[rowIndex] = 0;
      row.forEach((col) => {
        if (col.orderId && col.show) {
          data[rowIndex]++;
        }
      });
    });
    return data;
  }, [tableCellList]);

  const unitLength = useMemo(() => {
    return DEFAULT_CARD_SIZE / shootDuration;
  }, [shootDuration]);

  const rowSize = useMemo(() => {
    return axisList.length;
  }, [axisList]);

  //TODO:计算多少列
  const colSize = useMemo(() => {
    return 100;
  }, []);

  const initOrderList = () => {
    initData.forEach((order) => {
      adjustPosition(
        order,
        tableCellListRef.current,
        businessTime[0],
        shootDuration
      );
    });
  };

  useEffect(() => {
    tableCellListRef.current = initTable(rowSize, colSize);
    initOrderList();
    updateTableCellList();
  }, [rowSize, colSize]);

  const handleCreate = (value) => {
    adjustPosition(
      value,
      tableCellListRef.current,
      businessTime[0],
      shootDuration
    );
    setOrderList([{ ...value }, ...orderList]);
    updateTableCellList();
  };

  const handleDurationChange = (value) => {
    setBusinessTime(value.businessTime);
    setShootDuration(value.shootDuration);
  };

  const updateTableCellList = () => {
    setTableCellList([...tableCellListRef.current]);
  };

  const handleCellClick = (cell) => () => {
    if (cell.orderId) {
      orderRef.current = cell.order;
      setisModalOpen(true);
    } else {
      Modal.info({
        title: "跳转到新建订单页面",
      });
    }
  };

  return (
    <Layout style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <OrderList orderList={orderList} />
      <Layout style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <OrderCreate
          onCreate={handleCreate}
          onDurationChange={handleDurationChange}
        />
        <div className="app">
          <table
            className="table"
            style={{
              width: 100 * colSize,
              height: unitLength * rowSize,
            }}
          >
            <tbody>
              {tableCellList.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => {
                      if (!cell.show) return null;
                      return (
                        <Cell
                          style={{
                            width: colSize + "px",
                            height: unitLength + "px",
                          }}
                          onClick={handleCellClick}
                          cell={cell}
                          key={rowIndex + colIndex}
                          axisValue={colIndex === 0 ? axisList[rowIndex] : null}
                          axisAmount={
                            colIndex === 0 ? orderAmountList[rowIndex] : null
                          }
                          className={colIndex === 0 ? "colSticky" : ""}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
      <Modal
        title="订单详情"
        open={isModalOpen}
        onCancel={() => setisModalOpen(false)}
        onOk={() => setisModalOpen(false)}
      >
        {orderRef.current && (
          <>
            <p>{orderRef.current.name}</p>
            <p>
              {orderRef.current.shootTime
                ? dayjs(orderRef.current.shootTime).format("HH:mm")
                : "未安排"}
            </p>
          </>
        )}
      </Modal>
    </Layout>
  );
}

export default App;
