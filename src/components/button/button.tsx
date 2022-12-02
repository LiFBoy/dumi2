import React, { Suspense } from 'react';
import { PropTypes } from './interface';
import Button from './default';
import { Spin, Empty } from '@/components/blank';

const comsMap = {
  default: Button,
  event: React.lazy(() => import('./event')),
  // 下载型按钮，参数�? request 类型按钮一致，接口返回�? data 字段为下载链�?
  download: React.lazy(() => import('./download')),
  form: React.lazy(() => import('./form')),
  'drawer-modal': React.lazy(() => import('./test')),
  'business-card': React.lazy(() => import('./business-card')),
  request: React.lazy(() => import('./request')),
  'confirm-modal': React.lazy(() => import('./confirmModal')),
  link: React.lazy(() => import('./link')),
  'checkbox-group': React.lazy(() => import('../checkbox-group')),
  a: React.lazy(() => import('./anchor')),
  anchor: React.lazy(() => import('./anchor')),
  selectUser: React.lazy(() => import('./select-user')),
  // batch: React.lazy(() => import('./batch')),
  upload: React.lazy(() => import('./upload')),
  delconfirm: React.lazy(() => import('./comfirm')),
  'select-search': React.lazy(() => import('./select-search')),
};

export default ({ uiType = 'default', ...others }: PropTypes) => {
  const BtnCom = comsMap[uiType] || Button;
  // @ts-ignore
  return (
    <Suspense fallback={<Spin />}>
      <BtnCom {...others} />
    </Suspense>
  );
};
