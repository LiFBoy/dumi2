import React from 'react';
import { Input } from 'antd';
import './index.less';

const { TextArea } = Input;

export default ({
  value,
  onChange,
  maxLength = 200,
  form,
  type = 'normal',
  ...others
}) => {
  return (
    <>
      <TextArea
        className={type === 'normal' ? 'ssp-textarea' : ''}
        value={value}
        onChange={(e) => console.log(e) & onChange(e.target.value.trim())}
        maxLength={maxLength}
        bordered={type !== 'normal'}
        placeholder="请输入"
        showCount={type === 'normal'}
        autoSize={type !== 'normal' ? undefined : { minRows: 4, maxRows: 4 }}
        {...others}
      />
    </>
  );
};
