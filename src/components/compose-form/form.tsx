import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { Form, Alert, message, Spin, Divider } from 'antd';
import { isEqual } from 'lodash';
import net from '@/services/index';

import CFFormItem from '@/components/compose-form/form-item';
import { getComByUiType } from '@/components/compose-form/helper';
import useRequest from '@/common/use-request';
import { CFFormProps, CFFormActionProps, CFFormItemProps } from './interface';

import EventEmitter from '@/components/compose-form/events';
import './form.less';

const { Item: FormItem } = Form;

interface FormSubmitResponse {
  /** classname */
  success: boolean;
  globalError?: string;
  msg?: string;
  errorFields?: {
    key: string;
    value: string | string[];
  }[];
  data?: any;
}

function CFForm({
  alertProps,
  comsMap = {},
  className,
  controls,
  actions,
  onSubmit,
  request,
  // 用于转化请求传参
  formatParams,
  dataFormatAfterInit,
  customValidateFields,
  dataFormatBeforeSubmit,
  beforeSubmit,
  initialValuesRequest,
  groupIdRequest,
  onFinish,
  initialValuesRequestSuccess,
  onValuesChange,
  renderItemList,
  disableSubmitWhenUnChanged = true,
  showActionInPageFooter = false,
  title,
  toastGlobalError,
  value,
  initialValues,
  noContainer,
  labelCol = {
    xs: { span: 19 },
    sm: { span: 3 },
  },
  wrapperCol = {
    xs: { span: 19 },
    sm: { span: 19 },
  },
  ...others
}: CFFormProps) {
  // 标识 form 原始的值，用于配合 disableSubmitWhenUnChanged 属性判断是否要禁用提交。
  const initialValuesRef = useRef<any>(initialValues);
  const [submitLoadGoBack, setSubmitLoadGoBack] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  const [submitLoadRefresh, setSubmitLoadRefresh] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(
    !!disableSubmitWhenUnChanged,
  );
  const [form] = Form.useForm();
  const eventEmitter = useRef<EventEmitter>(new EventEmitter());

  useEffect(() => {
    if ((controls || []).some((_) => _.name === 'nodeName')) {
      console.error(
        'Compose Form',
        '表单项的名称不能为 nodeName，否则提交会出问题。',
      );
    }
  }, [controls]);

  useEffect(() => {
    // 如果组件非受控，则在初始化时将 initialValues 设置为表单初始值
    if (value === undefined) {
      form.setFieldsValue(initialValues);
      initialValuesRequestSuccess && initialValuesRequestSuccess(eventEmitter);
    }
  }, []);

  useEffect(() => {
    // 如果组件受控，则受控同步 form 的值
    if (value !== undefined) {
      form.setFieldsValue({ ...form.getFieldsValue(), ...value });
    }
  }, [value]);
  // 请求
  const {
    url,
    params = {},
    data = {},
    search = {},
    ...otherParams
  } = initialValuesRequest || {};
  // 具体请求

  const [, formLoading] = useRequest(
    initialValuesRequest,
    {
      ...otherParams,
      showError: true,
      data: { ...params, ...data },
      search: { ...params, ...search },
    },
    null,
    // 相应回调
    async (dataSource) => {
      let initialFormValue = dataSource?.formValue || dataSource;
      let remoteData = null;
      if (dataFormatAfterInit) {
        initialFormValue = await dataFormatAfterInit(initialFormValue || {});
      }
      if (groupIdRequest) {
        const res = await net.request(groupIdRequest?.url, {
          method: 'GET',
          data: groupIdRequest?.params,
        });
        remoteData = res.data;
      }
      if (remoteData) {
        const newObj: any = {};
        for (const i of remoteData) {
          const itemName = i.formName;
          const findItem = controls.find((item) => item.name === itemName);

          if (findItem) {
            newObj[itemName] = i.groupId;
          }
        }
        initialFormValue = await { ...initialFormValue, ...newObj };
      }

      form.setFieldsValue(initialFormValue);

      initialValuesRequestSuccess && initialValuesRequestSuccess(eventEmitter);

      initialValuesRef.current = form.getFieldsValue();
    },
  );
  // 表单提交
  const handleSubmit = async (submitEvt: Event): Promise<void> => {
    const { currentTarget } = submitEvt;
    // setGlobalError(null);

    if (!request) {
      // 校验表单
      try {
        await form.validateFields();
      } catch (e) {
        console.log('form valid error', e);
        return;
      }

      let formValue = form.getFieldsValue();

      // 如果有dataFormatBeforeSubmit这个函数，先在提交之前将数据处理一下，不然之间用表单数据
      formValue = dataFormatBeforeSubmit
        ? await dataFormatBeforeSubmit(formValue)
        : formValue;

      if (beforeSubmit) {
        const couldSubmit = await beforeSubmit(formValue);
        if (!couldSubmit) {
          return;
        }
      }
      onValuesChange('submit', formValue);
      onSubmit && onSubmit(formValue, currentTarget);
      onFinish && onFinish(form, currentTarget);
      return;
    }

    // 校验表单
    try {
      await form.validateFields();
    } catch (e) {
      console.log('form valid error', e);
      return;
    }
    // debugger;
    const isGoBack = currentTarget?.dataset?.submitAction === 'goBack';
    isGoBack ? setSubmitLoadGoBack(true) : setSubmitLoadRefresh(true);
    setSubmitDisabled(true);
    try {
      // 获取表单数据
      let formValue = form.getFieldsValue();

      if (customValidateFields) {
        const shouldNext = customValidateFields(formValue);
        if (!shouldNext) {
          isGoBack ? setSubmitLoadGoBack(false) : setSubmitLoadRefresh(false);
          return;
        }
      }

      // 如果有dataFormatBeforeSubmit这个函数，先在提交之前将数据处理一下，不然之间用表单数据
      formValue = dataFormatBeforeSubmit
        ? await dataFormatBeforeSubmit(formValue)
        : formValue;

      // console.log('submit', formValue);
      // 如果有beforeSubmit，也执行
      if (beforeSubmit) {
        const couldSubmit = await beforeSubmit(formValue);
        if (!couldSubmit) {
          isGoBack ? setSubmitLoadGoBack(false) : setSubmitLoadRefresh(false);
          return;
        }
      }

      onSubmit && onSubmit(formValue, currentTarget);
      // 发送请求
      const response = await net.request(request.url, {
        method: request.method,
        data: formatParams
          ? formatParams({ ...formValue, ...request?.params })
          : { ...formValue, ...request?.params },
        formatter: request?.formatter,
        showError: false,
      });
      // button form 的场景不需要复杂的报错提示
      if (response?.success !== false) {
        // 更新缓存值
        initialValuesRef.current = form.getFieldsValue();
        // disableSubmitIfPossible();
        message.success('操作成功', 1, () => {
          onFinish && onFinish(form, currentTarget, response);
        });
      } else {
        handleSubmitError(response);
      }
    } catch (e) {
      console.error(e, 'xxxx');

      // if (e?.message?.indexOf('<br/>')) {
      //   messageApi.open({
      //     type: 'warning',
      //     content: (
      //       <div
      //         dangerouslySetInnerHTML={{
      //           __html: e.message,
      //         }}
      //       />
      //     ),
      //     className: 'custom-antd-message',
      //     duration: 6,
      //   });
      // } else {
      //   message.error(e.message || '操作失败');
      // }
    } finally {
      setTimeout(() => {
        isGoBack ? setSubmitLoadGoBack(false) : setSubmitLoadRefresh(false);
        setSubmitDisabled(false);
      }, 2000);
    }
  };
  // 表单处理
  const handleFormChange = (changedValue: any, formValue: any) => {
    onValuesChange(changedValue, formValue, form.setFieldsValue);
    disableSubmitIfPossible();
  };

  // 当 disableSubmitWhenUnChanged 为 true 时，如果表单值与初始值一样，则禁用提交
  const disableSubmitIfPossible = useCallback(() => {
    let _submitDisabled = false;
    if (
      disableSubmitWhenUnChanged &&
      isEqual(form.getFieldsValue(), initialValuesRef.current)
    ) {
      _submitDisabled = true;
    }
    setSubmitDisabled(_submitDisabled);
  }, [initialValuesRef.current, disableSubmitWhenUnChanged]);
  // 提交表单后，错误提示的处理
  const handleSubmitError = (response?: FormSubmitResponse) => {
    const { msg, errorFields } = response || {};

    // 如果后端什么错误信息都没返回，则弹层报错
    if (!(errorFields && errorFields.length) && !msg) {
      message.error('请求异常，请稍后再试。');
      return;
    }

    if (msg.indexOf('<br/>')) {
      message.warning({
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: msg,
            }}
          />
        ),
        className: 'custom-antd-message',
        duration: 6,
      });
    } else {
      message.error(msg);
    }

    form.setFields(
      (errorFields || []).map(({ key, value }) => ({
        name: key,
        errors: Array.isArray(value) ? value : [value],
      })),
    );
  };
  // 渲染Form组件里的FormItem
  const renderItem = (config: CFFormItemProps, index: number) => {
    return (
      <CFFormItem
        key={config.name || index}
        {...config}
        externalComsMap={comsMap}
        index={index}
        form={form}
        emitter={eventEmitter.current}
      />
    );
  };
  // 渲染一些有执行逻辑的组件
  const renderAction = (config: CFFormActionProps, index: number) => {
    const { uiType = 'submit', props } = config;
    const Com = getComByUiType(uiType, comsMap);
    const comProps = { ...props };

    switch (uiType) {
      case 'submit':
        // @ts-ignore
        comProps.onClick = handleSubmit;
        comProps.loading = comProps?.customLoading
          ? comProps?.customLoading
          : props['data-submit-action'] === 'goBack'
          ? submitLoadGoBack
          : submitLoadRefresh;
        comProps.disabled = !comProps?.customDisabled
          ? comProps?.customDisabled
          : comProps.loading
          ? false
          : submitDisabled;
        break;
      case 'confirmSubmit':
        // @ts-ignore
        comProps.onOk = handleSubmit;
        comProps.loading =
          props['data-submit-action'] === 'goBack'
            ? submitLoadGoBack
            : submitLoadRefresh;
        comProps.disabled = comProps.loading ? false : submitDisabled;
        break;
      case 'reset':
        comProps.onClick = () => {
          form.setFieldsValue(initialValuesRef.current);
        };
        break;
      default:
        break;
    }

    return <Com key={`action-${index}`} {...comProps} />;
  };

  const formItemNodes = useMemo(
    () => (controls || []).map(renderItem),
    [controls, comsMap],
  );
  const formActionNodes = useMemo(
    () => (actions || []).map(renderAction),
    [actions, submitLoadGoBack, submitLoadRefresh, submitDisabled],
  );

  return (
    <div
      className={classNames(
        `${
          noContainer
            ? 'cf-compose-form-container no-container'
            : 'cf-compose-form-container'
        }`,
      )}
    >
      {title ? (
        <div className="cf-compose-form-title">
          <span>{title}</span>
          <Divider />
        </div>
      ) : null}
      {alertProps && <Alert showIcon closable {...alertProps} />}

      <Spin delay={500} spinning={formLoading}>
        <Form
          form={form}
          className={classNames('cf-compose-form', className)}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          {...others}
          onValuesChange={handleFormChange}
        >
          {renderItemList(
            formItemNodes,
            !showActionInPageFooter && formActionNodes.length ? (
              <FormItem
                className="cf-form-action"
                wrapperCol={
                  others.labelCol
                    ? {
                        offset: others.labelCol.span,
                        ...(others.wrapperCol || {}),
                      }
                    : null
                }
              >
                {formActionNodes}
              </FormItem>
            ) : null,
          )}
        </Form>
        {showActionInPageFooter && formActionNodes ? (
          <div className={classNames('fixedActionWrapper', 'cf-form-action')}>
            {formActionNodes}
          </div>
        ) : null}
      </Spin>
    </div>
  );
}

export default CFForm;
