import dayjs from "dayjs";

export function initTable(rowSize, colSize) {
  let tableCellList = [];
  for (let i = 0; i < rowSize; i++) {
    tableCellList.push([]);
    for (let j = 0; j < colSize; j++) {
      tableCellList[i][j] = {
        show: true,
        rowSpan: 1,
        colSpan: 1,
      };
    }
  }
  return tableCellList;
}

function transformMinute(time) {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  return hour * 60 + minute;
}

export function calculateAxis(startEndTime) {
  let startTimeMinutes = transformMinute(startEndTime[0]);
  let endTimeMinutes = transformMinute(startEndTime[1]);
  //TODO:是否需要多展示几行 +1 or no
  let count = Math.ceil((endTimeMinutes - startTimeMinutes) / 30) + 1;
  return new Array(count).fill(0).map((_, index) => {
    let hour = Math.floor((startTimeMinutes + index * 30) / 60);
    let minute = (startTimeMinutes + index * 30) % 60;
    return (
      "" + (hour > 9 ? hour : "0" + hour) + (minute > 0 ? ":" + minute : ":00")
    );
  });
}

function calculateRowPosition(time, startTime, shootDuration) {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const startTimeHour = dayjs(startTime).hour();
  const startTimeMinute = dayjs(startTime).minute();
  const timeRow = hour * 2 + (minute >= 30 ? 1 : 0);
  const startTimeRow = startTimeHour * 2 + (startTimeMinute >= 30 ? 1 : 0);
  return timeRow >= startTimeRow ? timeRow - startTimeRow + shootDuration : 0;
}

//半小时1个cell，没有时间的占2个cell
export function calculatePosition(order, startTime, shootDuration) {
  return {
    row: order.shootTime
      ? calculateRowPosition(order.shootTime, startTime, shootDuration)
      : 0,
    col: 1,
    orderId: order.orderId,
    order: order,
  };
}

function hasOccupy(tableCellList, row, col, shootDuration) {
  return new Array(shootDuration).fill(0).some((_, index) => {
    return (
      tableCellList[row + index][col] &&
      !!tableCellList[row + index][col].orderId
    );
  });
}

function hiddenCell(cell, tableCellList, row, col, shootDuration) {
  new Array(shootDuration - 1).fill(0).forEach((_, index) => {
    tableCellList[row + index + 1][col].show = false;
    tableCellList[row + index + 1][col].rowSpan = 1;
    tableCellList[row + index + 1][col].orderId = cell.orderId;
  });
}

export function adjustPosition(order, tableCellList, startTime, shootDuration) {
  const cell = calculatePosition(order, startTime, shootDuration);
  let col = cell.col;
  let row = cell.row;

  while (hasOccupy(tableCellList, row, col, shootDuration)) {
    col++;
  }
  tableCellList[row][col] = cell;
  tableCellList[row][col].show = true;
  tableCellList[row][col].orderId = cell.orderId;
  tableCellList[row][col].rowSpan = shootDuration;

  hiddenCell(cell, tableCellList, row, col, shootDuration);
}
