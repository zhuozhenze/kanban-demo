import React from "react";
import { Form, Input, TimePicker, Button, Space, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import "./index.css";

const OrderCreate = (props) => {
  const { onCreate, onDurationChange } = props;

  const handleFinish = (value) => {
    onCreate({ ...value, orderId: uuidv4() });
  };

  const handleFinish2 = (value) => {
    onDurationChange(value);
  };

  return (
    <div className="container">
      <div>
        <Form onFinish={handleFinish} layout="inline">
          <Form.Item label="客户" name="name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="拍摄日期" name="shootTime">
            <TimePicker
              format={"HH:mm"}
              minuteStep={30}
              showSecond={false}
              showNow={false}
            />
          </Form.Item>
          <Form.Item label="状态" name="status" initialValue={1}>
            <Select
              options={[
                { value: 1, label: "未完成" },
                { value: 2, label: "进行中" },
                { value: 3, label: "已完成" },
              ]}
            ></Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              创建订单
            </Button>
          </Space>
        </Form>
      </div>
      <div>
        <Form
          onFinish={handleFinish2}
          layout="inline"
          initialValues={{
            businessTime: [dayjs("09:30", "HH:mm"), dayjs("22:00", "HH:mm")],
            shootDuration: 2,
          }}
        >
          <Form.Item label="营业时间" name="businessTime">
            <TimePicker.RangePicker
              format={"HH:mm"}
              minuteStep={15}
              showSecond={false}
              showNow={false}
            />
          </Form.Item>
          <Form.Item label="拍摄服务时长" name="shootDuration">
            <Select
              options={[
                { value: 1, label: "半小时" },
                { value: 2, label: "一小时" },
                { value: 3, label: "一个半小时" },
                { value: 4, label: "两小时" },
              ]}
            ></Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              更新营业时间
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(OrderCreate);
