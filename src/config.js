import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const data = [
  { orderId: uuidv4(), name: "张1", shootTime: undefined, status: 2 },
  { orderId: uuidv4(), name: "张2", shootTime: undefined, status: 3 },

  {
    orderId: uuidv4(),
    name: "张3",
    shootTime: dayjs("09:30", "HH:mm"),
    status: 1,
  },
  {
    orderId: uuidv4(),
    name: "张4",
    shootTime: dayjs("10:00", "HH:mm"),
    status: 2,
  },
  {
    orderId: uuidv4(),
    name: "张5",
    shootTime: dayjs("09:30", "HH:mm"),
    status: 1,
  },
  {
    orderId: uuidv4(),
    name: "赵1",
    shootTime: dayjs("10:30", "HH:mm"),
    status: 1,
  },
  {
    orderId: uuidv4(),
    name: "赵2",
    shootTime: dayjs("09:30", "HH:mm"),
    status: 1,
  },
  {
    orderId: uuidv4(),
    name: "赵3",
    shootTime: dayjs("09:30", "HH:mm"),
    status: 2,
  },
];
