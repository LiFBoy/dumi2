import React, { useEffect, useState } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
interface Props {
  index?: any;
  value?: any;
  width?: any;
  onChange?: (value: any, others?: any) => void;
}
export function DatePicker_({
  value,
  index,
  disabledDate = false,
  onChange,
  dateFormat = null,
  width = 200,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const _dateFormat = dateFormat || 'YYYY-MM-DD';
  const handleChange = (value: any, others: any) => {
    setValue(value);
    onChange(value, others);
  };
  const disabledDateFun = (current: any) => {
    // Can not select days before today and today
    // console.log(moment().endOf('day'), '11');
    return current && current < moment().startOf('day');
  };
  return (
    <>
      <DatePicker
        style={{ width }}
        allowClear
        disabledDate={disabledDate ? disabledDateFun : () => {}}
        value={_value ? moment(_value, _dateFormat) : null}
        onChange={(cur) => {
          handleChange(cur ? moment(cur).format(_dateFormat) : '', others);
        }}
        {...others}
      />
    </>
  );
}
// tslint:disable-next-line:class-name
export function RangePicker_({
  value,
  dateFormat = null,
  onChange,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const _dateFormat = dateFormat || 'YYYYMMDD';
  const handleChange = (e: any, others: any) => {
    const date = [
      e[0] ? moment(e[0]).format(_dateFormat) : null,
      e[1] ? moment(e[1]).format(_dateFormat) : null,
    ];

    setValue(date);
    onChange(date);
  };
  return (
    <>
      <RangePicker
        allowClear
        value={
          _value && typeof _value === 'object' && _value.length > 0
            ? [
                _value[0] ? moment(_value[0], _dateFormat) : '',
                _value[1] ? moment(_value[1], _dateFormat) : '',
              ]
            : null
        }
        onChange={(e) => handleChange(e, others)}
        {...others}
      />
    </>
  );
}

// tslint:disable-next-line:class-name
export function TimeRangePicker_({ value, onChange, ...others }: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const dateFormat = 'HH:mm';
  const handleChange = (e: any, others: any) => {
    const date = [
      e[0] ? moment(e[0]).format(dateFormat) : null,
      e[1] ? moment(e[1]).format(dateFormat) : null,
    ];

    setValue(date);
    onChange(date);
  };

  return (
    <TimeRangePicker
      allowClear
      format={dateFormat}
      placeholder="请选择"
      value={
        _value && typeof _value === 'object' && _value.length > 0
          ? [
              _value[0] ? moment(_value[0], dateFormat) : '',
              _value[1] ? moment(_value[1], dateFormat) : '',
            ]
          : null
      }
      onChange={(e) => handleChange(e, others)}
      {...others}
    />
  );
}

export function TimePicker_({
  value = null,
  onChange,
  width = 90,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const handleChange = (time: any, others: any) => {
    setValue(time);
    onChange(time, others);
  };
  return (
    <TimePicker
      value={_value ? moment(_value, 'HH:mm') : null}
      onChange={(time) =>
        handleChange(time ? moment(time).format('HH:mm') : '', others)
      }
      style={{ width }}
      allowClear
      placeholder="请选择"
      {...others}
    />
  );
}
