/* eslint-disable no-extra-boolean-cast */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getComByUiType } from '@/components/compose-form/helper';
import useRequest from '@/common/use-request';
import { CFFormItemInternalProps } from './interface';
import './form-item.less';

export default function CFFormItem(componentProps: CFFormItemInternalProps) {
  const {
    uiType = 'text',
    name,
    index,
    props,
    tooltip,
    label,
    info,
    errors,
    visibleOn,
    source,
    newSourceParams,
    externalComsMap,
    form,
    emitter,
    showableOn,
    ...formItemProps
  } = componentProps;
  const [visible, setVisible] = useState(
    visibleOn ? visibleOn(form.getFieldsValue()) : true,
  );
  // const [showable, setShowable] = useState(true);
  // TODO
  // useEffect(() => {
  //   setShowable(showableOn ? form.getFieldValue(showableOn.name) === showableOn.value : true);
  // }, [showableOn && form.getFieldValue(showableOn.name), form.getFieldValue(showableOn?.name)])

  const [sourceParam, setSourceParams] = useState<any>(source?.params);
  const [remoteSource, loading] = useRequest(
    visible && source ? { ...source, params: sourceParam || {} } : undefined,
    {},
    (data) => data?.dataSource || data,
  );

  // Fetch the props you want to inject. This could be done with context instead.
  // const themeProps = useTheme();
  // debugger;
  const onComponentChange = useCallback(() => {
    emitter.dispatch('change');
    // console.log('onChange', form.getFieldsValue());
  }, []);

  const selfRefresh = useCallback(() => {
    const formValue = form.getFieldsValue();
    let nextVisible = visible;
    if (visibleOn) {
      nextVisible = visibleOn(formValue);
      setVisible(nextVisible);
    }

    if (nextVisible && newSourceParams) {
      setSourceParams(newSourceParams(formValue));
    }
  }, [form, visibleOn, newSourceParams]);

  // const onblurRefresh = useCallback(() => {
  //   const { setFieldsValue,getFieldsValue } = form;
  //   const formValue = getFieldsValue();
  //   if (!!onBlur) {
  //     debugger
  //     const freshValue = onBlur(formValue);
  //     setFieldsValue(freshValue);
  //   }

  // }, [form]);

  useEffect(() => {
    if (!visibleOn && !newSourceParams) {
      return;
    }

    selfRefresh();
    emitter.subscribe('change', selfRefresh);

    // const { visibleOn } = componentProps;

    if (visibleOn) {
      emitter.subscribe('visionchange', selfRefresh);
    }
  }, []);

  // const changeFormValue = useCallback(
  //   (formValue: any) => {
  //     form.setFieldsValue(formValue);
  //   },
  //   [form]
  // );

  // ????????????????????????????????????Props
  const Com = getComByUiType(uiType, externalComsMap);
  const comProps = { ...props };
  if (source) {
    comProps.loading = loading;
    comProps.dataSource = remoteSource;
  }

  const showTipsUiType = [
    'select',
    'radio',
    'datepicker',
    'date-range-picker',
    'textarea',
    'input',
    'number',
    'selectTag',
    'selectUser',
    'upload-file',
    'checkbox-group',
    'text',
    'date-picker',
  ];

  const isRequired = useMemo(
    () =>
      formItemProps.required !== undefined
        ? formItemProps.required
        : !!(
            formItemProps.rules &&
            formItemProps.rules.some(function (rule) {
              if (
                rule &&
                typeof rule === 'object' &&
                rule.required &&
                !rule.warningOnly
              ) {
                return true;
              }

              if (typeof rule === 'function') {
                const ruleEntity = rule(form);
                return (
                  ruleEntity && ruleEntity.required && !ruleEntity.warningOnly
                );
              }

              return false;
            })
          ),
    [formItemProps, form],
  );

  return visible ? (
    <Form.Item
      className="cf-form-item"
      required={isRequired}
      label={
        !!label && (
          <>
            {label}
            {!!tooltip && (
              <Tooltip title={tooltip}>
                &nbsp;
                <QuestionCircleOutlined />
              </Tooltip>
            )}
          </>
        )
      }
    >
      <Form.Item noStyle name={name} key={name || index} {...formItemProps}>
        <Com {...comProps} form={form} onChange={onComponentChange} />
      </Form.Item>
      {props?.tips && showTipsUiType.indexOf(uiType) > -1 && (
        <div
          style={{
            color: '#999',
            fontSize: '12px',
            wordBreak: 'break-all',
            paddingTop: '8px',
          }}
        >
          {props?.tips}
        </div>
      )}
    </Form.Item>
  ) : null;
}
