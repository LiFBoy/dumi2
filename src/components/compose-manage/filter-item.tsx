// 数据过滤组件
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 21:17

import React, { useState, useEffect } from 'react';
import { Request } from '../interface';
import { Form } from 'antd';
import CascaderSelect from '../../components/compose-form/mod/cascaderSelect';
import useRequest from '@/common/use-request';
import {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDateTimeRangePicker,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';

export interface NsFilterProps {
  type:
    | 'search'
    | 'select'
    | 'datepicker'
    | 'dateRangePicker'
    | 'cascader-select';
  name: string;
  label?: string | React.ReactNode;
  defaultValue?: any;
  /** 用于 select 的本地数据源，如果是 url 或 Request 结构，则表示从远程获取数据，返回数据结构为与本地数据一致 */
  dataSource?: string | Request | { value: string | number; label: string }[];
  [x: string]: any;
}

export default function FilterItem({
  type,
  dataSource,
  props,
  ...others
}: NsFilterProps) {
  const [remoteSource] = useRequest(
    !Array.isArray(dataSource) ? (dataSource as any) : null,
    {},
    (data) => data?.dataSource || data?.formValue || data,
  );
  const [localSource, setLocalSource] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      setLocalSource(dataSource);
    }
  }, [dataSource]);

  const { name, label } = others;

  if (type === 'select') {
    return (
      <ProFormSelect
        {...props}
        {...others}
        options={remoteSource || localSource}
        fieldProps={props}
        allowClear
      />
    );
  }

  if (type === 'cascader-select') {
    return (
      <Form.Item name={name} label={label} style={{ minWidth: 280 }}>
        <CascaderSelect {...props} dataSource={remoteSource || localSource} />
      </Form.Item>
    );
  }

  if (type === 'search') {
    return (
      <ProFormText
        {...props}
        {...others}
        fieldProps={props}
        style={{ minWidth: 300 }}
      />
    );
  }
  if (type === 'datepicker') {
    return (
      <ProFormDatePicker
        {...props}
        {...others}
        fieldProps={props}
        style={{ minWidth: 280 }}
      />
    );
  }
  if (type === 'dateRangePicker') {
    return (
      <ProFormDateRangePicker
        {...props}
        {...others}
        fieldProps={props}
        style={{ minWidth: 280 }}
      />
    );
  }
  if (type === 'dateTimeRangePicker') {
    return (
      <ProFormDateTimeRangePicker
        {...props}
        {...others}
        fieldProps={props}
        style={{ minWidth: 280 }}
        width="lg"
        colSize="8"
        props={{
          width: 'lg',
          colSize: 8,
        }}

        // onChange={() => {
        //   console.log(33);
        // }}
        // width="xs"
        // colSize={3}
      />
    );
  }

  // datepicker

  return null;
}
