/* eslint-disable no-unused-expressions */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal } from 'antd';
import classNames from 'classnames';
import { FormButtonProps } from '../interface';
// import net from '@/services';
import Form from '@/components/compose-form';
import Button from '../default';
import './index.less';
// const defaultRequestFunction = (...args: any[]) => net.request(...args);
export default function DialogForm({
  className = null,
  onOpen,
  onCancel,
  onOk,
  dialogProps,
  formProps,
  noContainer,
  formItemLayout = {
    labelCol: {
      xs: {
        span: 19,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 19,
      },
      sm: {
        span: 19,
      },
    },
  },
  onSuccess,
  // requestFunction = net.request.bind(net),
  request,
  onRequestFailed,
  onChange,
  onValidateFailed,
  ...others
}: FormButtonProps) {
  const [actions, setActions] = useState([]);
  const [dlgVis, setDlgVis] = useState(false);
  const { dataSource, onFinish, title, ...otherFormProps } = formProps;
  const hideDlg = useCallback(() => {
    onCancel && onCancel();
    setDlgVis(false);
  }, [onCancel]);

  const showDlg = useCallback(() => {
    setDlgVis(true);
    onOpen && onOpen(others);
  }, [onOpen]);

  const handleFinish = (
    formValue: any,
    currentTarget?: EventTarget,
    response?: any,
  ) => {
    onSuccess && onSuccess(formValue, currentTarget, response);
    onFinish && onFinish(formValue);
    hideDlg();
  };

  useEffect(() => {
    setActions([
      {
        uiType: 'button',
        props: {
          children: '取消',
          onClick: hideDlg,
        },
      },
      {
        uiType: 'submit',
        props: {
          children: '确定',
          type: 'primary',
        },
      },
    ]);
  }, [hideDlg]);

  const ButtonDom = useMemo(() => {
    if (others.hasOwnProperty('to') && others.to === 'null') {
      return null;
    }
    return <Button {...others} onClick={showDlg} />;
  }, [others]);

  return (
    <>
      {ButtonDom}

      {dlgVis ? (
        <Form
          {...formItemLayout}
          {...otherFormProps}
          initialValues={formProps.value || formProps.initialValues}
          name="dialogForm"
          onFinish={handleFinish}
          controls={dataSource}
          actions={actions}
          request={request}
          noContainer
          toastGlobalError
          renderItemList={(controlItems, actionFormItems) => {
            return (
              <Modal
                className={classNames('cf-button-form-modal', className)}
                // confirmLoading={confirmLoading}
                visible={dlgVis}
                onCancel={hideDlg}
                footer={actionFormItems}
                {...dialogProps}
                // onOk={handleFinish}
              >
                {controlItems}
              </Modal>
            );
          }}
        />
      ) : null}
    </>
  );
}
