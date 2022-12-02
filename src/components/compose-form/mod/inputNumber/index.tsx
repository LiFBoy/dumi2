import React from 'react';
import { InputNumber } from 'antd';

export default ({ value, index, onChange, ...others }: any) => {
  return (
    <>
      <InputNumber
        value={value}
        onChange={(e) => onChange(e, index)}
        {...others}
      />
    </>
  );
};
