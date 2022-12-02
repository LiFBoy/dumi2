/*
 * @Author: 大鸡腿 734164941@qq.com
 * @Date: 2022-08-09 15:24:40
 * @LastEditors: 大鸡腿 734164941@qq.com
 * @LastEditTime: 2022-11-15 10:53:42
 * @FilePath: \suo-uicomponent\src\components\table\mod\text\index.jsx
 *
 * Copyright (c) 2022 by 大鸡腿 734164941@qq.com, All Rights Reserved.
 */
import React, { useRef, useEffect, useState } from 'react';
import { Popover } from 'antd';
import widthMap from './letterWidth';

function getStrlen(str = '') {
  let needWidth = 0;

  for (let i = 0; i < str.length; i += 1) {
    const c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      needWidth += widthMap[str[i]] || 9;
    } else {
      needWidth += 14;
    }
  }
  return needWidth;
}

function getLeftValue(value = '', width) {
  let curWidth = 0;
  let str = '';
  for (let i = 0; curWidth < width; i += 1) {
    // 单字节加1
    const c = value.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      curWidth += widthMap[value[i]] || 9;
    } else {
      curWidth += 14;
    }

    if (curWidth > width) {
      break;
    }
    str += value[i];
  }
  return str;
}

function getRightValue(value = '', width) {
  let curWidth = 0;
  let str = '';
  for (let i = value.length - 1; curWidth < width; i -= 1) {
    // 单字节加1
    const c = value.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      curWidth += widthMap[value[i]] || 9;
    } else {
      curWidth += 14;
    }

    if (curWidth > width) {
      break;
    }
    str += value[i];
  }
  return str.split('').reverse().join('');
}

export default function TableCellText({
  value = '-',
  tableProps,
  minWidth = 70,
  maxWidth = 280,
  ...others
}) {
  const textRef = useRef(null);
  const [showOverFlow, setShowOverFlow] = useState(0);
  const [overFlowValue, setOverFlowValue] = useState('');
  useEffect(() => {
    if (value) {
      const curValue = value.toString();
      const needWidth = getStrlen(curValue);
      const textWidth = textRef?.current?.clientWidth;
      // 经测试中文字符在字体大小14px下，占用14px宽度，但是英文字符占用宽度却不尽相同
      if (needWidth > textWidth) {
        const resWidth = textWidth - 11.67; // ... 三个点占用11.67px宽度。
        const letf = Math.ceil(resWidth / 2);
        setOverFlowValue(
          `${getLeftValue(curValue, letf)}...${getRightValue(
            curValue,
            resWidth - letf,
          )}`,
        );
        setShowOverFlow(true);
      } else {
        setShowOverFlow(false);
      }
    }
  }, [value]);

  let content = null;
  if (value instanceof Array) {
    content = (
      <span className="popoverText">
        {value.map((item) => (
          <div>{item}</div>
        ))}
      </span>
    );
  } else {
    content = <span className="popoverText">{value}</span>;
  }

  const overlayStyle = {
    maxWidth: '20em',
    wordBreak: 'break-all',
    fontSize: '12px',
    color: '#666',
    overflow: 'auto',
    backgroud: '#fff',
    maxHeight: '400px',
    boxShadow: '5px 5px 10px rgba(129, 133, 167, 0.2)',
  };

  const text = {
    display: 'block',
    minWidth,
    maxWidth,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    wordBreak: 'break-all',
    // textOverflow: 'ellipsis',
  };
  return (
    <Popover
      content={content}
      placement="bottomLeft"
      overlayStyle={overlayStyle}
    >
      <span ref={textRef} {...others} style={text}>
        {showOverFlow ? overFlowValue : value || '-'}
      </span>
    </Popover>
  );
}
