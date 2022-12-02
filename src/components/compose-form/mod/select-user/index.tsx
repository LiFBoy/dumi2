import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Select, Tag } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import SelectUser from 'suo-base-select-user';
import {
  Value as SelectUserValueProps,
  SelectUserFuncArgProps,
  IlistItem as ValueItem,
  IdefaultValue,
  NodeType,
} from 'suo-base-select-user/lib/components/select-user/interface';
import { uniqBy } from 'lodash';
import request2 from '@/common/request2';
import Confirm from '@/components/Confirm';
import './index.less';

const treeState = () => {
  return {
    deptInfoList: [],
    userInfoList: [],
    equipmentInfoList: [],
    customerManagerInfoList: [],
    tvInfoList: [],
    maternalInfoList: [],
    cameraInfoList: [],
    tagInfoList: [],
    customerTagInfoList: [],
    groupTagInfoList: [],
    circlesTagInfoList: [],
    contentTagInfoList: [],
    groupInfoList: [],
    workGroupInfoList: [],
  };
};

const getListByType = (type: NodeType) => {
  const typeToKeyMap = {
    DEPT: 'deptInfoList',
    GROUP_DEPT: 'deptInfoList',
    TAG: 'tagInfoList',
    CUSTOMER_TAG: 'customerTagInfoList',
    CUSTOMER_MANAGER_USER: 'customerManagerInfoList',
    GROUP_TAG: 'groupTagInfoList',
    CIRCLES_TAG: 'circlesTagInfoList',
    CONTENT_TAG: 'contentTagInfoList',
    USER: 'userInfoList',
    EQUIPMENT: 'equipmentInfoList',
    TV: 'tvInfoList',
    CAMERA: 'cameraInfoList',
    MATERNAL: 'maternalInfoList',
    GROUP: 'groupInfoList',
    WORK_GROUP: 'workGroupInfoList',
  };
  // @ts-ignore
  const key: string = typeToKeyMap[type];
  return key;
};

export interface PropTypes {
  value?: ValueItem | ValueItem[];
  selectUserProps: Omit<SelectUserFuncArgProps, 'onOk' | 'onCancel'>;
  onChange?: (val: any) => void;
  // 获取 info 的 key，如果设置了，则会自动将值回填到选人组件中，否则不回填
  wrapperKey?: string;
  confirmContent?: string;
  confirmTitle?: string;
}

export default ({
  value,
  onChange,
  wrapperKey,
  selectUserProps,
  confirmContent,
  confirmTitle,
}: PropTypes) => {
  const { multiple, isSaveSelectSignature, requestParams } =
    selectUserProps || {};
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [arrayValue, setArrayValue] = useState<ValueItem>([]);
  const [userIds] = useMemo(() => {
    const ids: ValueItem[] = [];
    arrayValue.forEach((user: any) => {
      ids.push(user?.id);
    });

    return [ids];
  }, [arrayValue]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setArrayValue(value.filter(({ id, name }) => id && name));
    } else if (value) {
      request2(
        `${selectUserProps.userOrigin}/select/component/result?selectSignature=${value}`,
      ).then((data) => {
        const {
          userInfoList = [],
          cameraInfoList = [],
          deptInfoList = [],
          equipmentInfoList = [],
          maternalInfoList = [],
          tvInfoList = [],
          workGroupInfoList = [],
          groupInfoList = [],
          tagInfoList = [],
          customerTagInfoList = [],
          groupTagInfoList = [],
          circlesTagInfoList = [],
          contentTagInfoList = [],
          customerManagerInfoList = [],
        } = data || [];
        const list = userInfoList
          .concat(cameraInfoList)
          .concat(deptInfoList)
          .concat(equipmentInfoList)
          .concat(maternalInfoList)
          .concat(tvInfoList)
          .concat(workGroupInfoList)
          .concat(groupInfoList)
          .concat(tagInfoList)
          .concat(customerTagInfoList)
          .concat(groupTagInfoList)
          .concat(circlesTagInfoList)
          .concat(contentTagInfoList)
          .concat(customerManagerInfoList)
          .filter((item: ValueItem) => !!item);

        if (list.length === 0) {
          onChange(null);
        }
        setArrayValue(list);
      });
    } else {
      setArrayValue([]);
    }
  }, [value]);
  // 复选场景：根据组件 value 生成 select 的下拉菜单和 value
  useEffect(() => {
    setOptions(
      arrayValue.map(({ id, name, childDelete = true }: any) => {
        return {
          label: name,
          value: id,
          disabled: !childDelete,
        };
      }),
    );
  }, [arrayValue]);

  const onUsersSelectChange = useCallback(
    (selectValue) => {
      Confirm({
        title: confirmTitle,
        content: confirmContent,
        onCancel() {},
        onOk() {
          const nextUserList = arrayValue.filter(
            (user: ValueItem) => selectValue !== user.id,
          );
          let nextTreeState: IdefaultValue = treeState();
          if (nextUserList.length === 0) {
            nextTreeState = treeState();
          } else {
            nextUserList.map((item: ValueItem) => {
              const key = getListByType(item?.type || 'USER');
              nextTreeState[key].push(item);
            });
          }

          if (isSaveSelectSignature) {
            saveResult(nextTreeState);
          } else {
            onChange(nextUserList);
          }
        },
      });
    },
    [arrayValue, selectUserProps],
  );

  const saveResult = (array: IdefaultValue) => {
    request2(`${selectUserProps.userOrigin}/select/component/result`, {
      method: 'POST',
      data: {
        selectTypeList: requestParams.selectTypeList,
        id: value,
        ...array,
      },
    }).then((data) => {
      onChange(data);
    });
  };

  const handleChange = useCallback(
    (val: SelectUserValueProps) => {
      // 整合所有的内容
      const mergedValue = [
        'userInfoList',
        'cameraInfoList',
        'equipmentInfoList',
        'maternalInfoList',
        'tvInfoList',
        'workGroupInfoList',
        'deptInfoList',
        'tagInfoList',
        'circlesTagInfoList',
        'customerTagInfoList',
        'groupTagInfoList',
        'contentTagInfoList',
        'customerManagerInfoList',
        'groupInfoList',
      ]
        .reduce((result, key) => {
          // @ts-ignore
          return result.concat(val[key] || []);
        }, [])
        .filter((_) => _);

      let sign;

      if (
        !isSaveSelectSignature &&
        !selectUserProps?.onlyLeafCheckable &&
        multiple &&
        selectUserProps?.showTabList?.includes('innerContacts')
      ) {
        // 内部通讯录非签名模式又能选人选部门多选,新增逻辑
        sign = uniqBy((value || []).concat(mergedValue), 'id');
      } else if (!isSaveSelectSignature) {
        sign = uniqBy(mergedValue, 'id');
      } else if (isSaveSelectSignature) {
        sign = val.selectSignature;
      }
      onChange(sign);
    },
    [onChange],
  );

  const showSelectUser = useCallback(
    (e) => {
      e.preventDefault();
      SelectUser.show({
        defaultValue: wrapperKey ? { [wrapperKey]: arrayValue } : null,
        ...selectUserProps,
        selectSignature:
          typeof value === 'string' ? value : selectUserProps.selectSignature,
        onOk(val: SelectUserValueProps) {
          handleChange(val);
        },
      });
    },
    [selectUserProps, wrapperKey, arrayValue, value],
  );

  return multiple && selectUserProps?.disabled ? (
    options.length ? (
      <div className="suo-tag-box">
        {options.map((item, index) => {
          if (typeof item === 'string') {
            return <Tag key={index}>{item}</Tag>;
          } else if (item.label) {
            return <Tag key={index}>{item.label}</Tag>;
          } else {
            return '-';
          }
        })}
      </div>
    ) : (
      '-'
    )
  ) : (
    <>
      <div
        className="ssl-select-user"
        onClick={selectUserProps?.disabled ? () => {} : showSelectUser}
      >
        <div>
          <Select
            mode="multiple"
            options={options}
            open={false}
            placeholder="请选择"
            value={userIds}
            dropdownStyle={{ display: 'none' }}
            onDeselect={onUsersSelectChange}
            disabled={selectUserProps?.disabled}
            showArrow={false}
            dropdownRender={() => null}
          />
        </div>
        <div className="add-icon" />
      </div>
    </>
  );
};
