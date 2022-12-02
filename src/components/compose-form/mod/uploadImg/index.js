/*
 * @Author: 大鸡腿 734164941@qq.com
 * @Date: 2022-05-11 13:33:24
 * @LastEditors: 大鸡腿 734164941@qq.com
 * @LastEditTime: 2022-10-10 15:28:29
 * @FilePath: \suo-uicomponent\src\components\compose-form\mod\uploadImg\index.js
 *
 * Copyright (c) 2022 by 大鸡腿 734164941@qq.com, All Rights Reserved.
 */
import React from 'react';
import ImageUpload from './UploadImg';

export default function uploadImg(props) {
  const { appCode, onChange, value, maxCount = 1, ...otherProps } = props;
  const onUploadImgChange = (filesId) => {
    onChange(filesId);
  };
  const imgProps = {
    appCode,
    value,
    maxCount,
    accept: 'image/*',
    onUploadImgChange,
    ...otherProps,
  };
  return <ImageUpload {...imgProps} />;
}
