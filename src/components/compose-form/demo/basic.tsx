import ComposeForm from '@/components/compose-form';
import React, { useState } from 'react';

export default () => {
  // const eventEmitter = useRef(new EventEmitter());
  const [list, setList] = useState([
    {
      id: '1589941152926072833',
      name: '666标签名称',
      type: 'CUSTOMER_TAG',
      contactType: 9,
    },
  ]);
  window.token =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGd3dwaWMlMkY5MzI5NTFfUnZXVFVrY3NRXzZ5eFdsXzE2NjgzODc0MzElMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE1NjE5Njc4NDY3MjMyODUwMjYlMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU2JTlEJThFJUU1JUJCJUJBJUU1JUJEJUFDJTIyJTJDJTIybW9iaWxlJTIyJTNBJTIyMTM2NTcwODY0NTElMjIlMkMlMjJvcmdJZCUyMiUzQTMwMDEwMDEwMDEwMDAwMDYlMkMlMjJvcmdOYW1lJTIyJTNBJTIyJUU2JTlEJUFEJUU1JUI3JTlFJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJUU2JTlDJTg5JUU5JTk5JTkwJUU1JTg1JUFDJUU1JThGJUI4JUVGJUJDJTg4JUU2JUFGJThEJUU1JUE5JUI0JUVGJUJDJTg5JTIyJTJDJTIyb3JnVHlwZSUyMiUzQSUyMmdlbmVyYWwlMjIlMkMlMjJyZWdpb25Db2RlJTIyJTNBJTIyMzMwMTAyMDAwMDAwMDAwMDAwJTIyJTJDJTIyc2hvcnROYW1lJTIyJTNBJTIyJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJTIyJTJDJTIydXNlcklkJTIyJTNBMTU2MTk2Nzg0NjcyMzI4NTAyNiUyQyUyMnVzZXJOYW1lJTIyJTNBJTIyJUU2JTlEJThFJUU1JUJCJUJBJUU1JUJEJUFDJTIyJTJDJTIydXNlclR5cGUlMjIlM0ElMjJlbXBsb3llZSUyMiU3RCIsInVzZXJfbmFtZSI6IjMwMDEwMDEwMDEwMDAwMDY7MTU2MTk2Nzg0NjcyMzI4NTAyNjtlbXBsb3llZTtub3JtYWwiLCJvcmdfaWQiOjMwMDEwMDEwMDEwMDAwMDYsInNjb3BlIjpbIndyaXRlIl0sImV4cCI6MTY2OTgzMjA4MiwianRpIjoiMzFkNjdjZWYtNzUzMi00ZjM4LTk1ZTctOGQ3YmJkYzdkNTJjIiwiY2xpZW50X2lkIjoic2l0In0.e6hhEK5-ln6wyBCSZluI-AXWUXLe-XnwvXIYjR5QOAesFavhvTZczXd873lVAVFeFFNjQ-zueq9Q44-9DpBIni1wqtI3uwvyh6njv5MDyayOlzh_aY65pvI-5oLkcXAoS5Gw0Lqd15dZZXsTzPaID2RUSq_iZFO4NM2BUB1QlHQ';
  const url = {
    crm: '//gateway.dev.suosihulian.com/crm',
  };
  const dataForm = [
    {
      uiType: 'input',
      name: 'input1',
      label: '输入框',
      props: {
        tips: '啊啊啊',
      },
    },
  ];
  const props = {
    title: '添加',
    controls: dataForm,
    initialValues: {
      // groupId: '1536330523708399617',
      // deviceId: [
      //   {
      //     id: '1526430948989280258',
      //     name: '测试运营标签',
      //     type: 'CUSTOMER_TAG',
      //     contactType: 9,
      //     childDelete: true,
      //     noTagLabelPermission: true,
      //   },
      // ],
      // deviceId: '3001001001000006-202207171658073249630',
      a: [
        {
          id: '1589512616673996995',
          name: '备孕_群用户属性',
          type: 'GROUP_TAG',
          contactType: 14,
        },
      ],

      // test4: '1509105356252717058',
      // select: 1,
      // checkboxGroup: 1,
      deptIds: [
        {
          name: '',
          id: '',
        },
      ],
    },
    request: {
      url: `https://front.dev.suosihulian.com/gateway/user-center/dept/save`,
    },
    actions: [
      {
        uiType: 'button',
        props: {
          children: '取消',
          type: 'button',
          onClick() {
            history.go(-1);
          },
        },
      },
      {
        uiType: 'submit',
        props: {
          children: '保存',
          type: 'primary',
          'data-submit-action': 'submit',
        },
      },
      // {
      //   uiType: 'button',
      //   props: {
      //     customLoading: false,
      //     customDisabled: true,
      //     type: 'primary',
      //     children: '提交',
      //     'data-submit-action': 'add',
      //   },
      // },
    ],

    onFinish: (form, currentTarget) => {
      console.log(form, currentTarget);
    },
    onSubmit: (form, currentTarget) => {
      console.log(form, currentTarget);
    },
  };

  const selectUserProps = {
    showTabList: ['innerContacts'],
    userOrigin: 'https://front.sit.suosihulian.com/gateway/user-center',
    unCheckableNodeType: ['ORG'],
    isSaveSelectSignature: false,
    multiple: true,
    requestParams: {
      selectTypeList: ['user'],
    },

    selectType: 'user',
    searchPlaceholder: '请选择',
    noTagLabelPermission: false,
    dialogProps: {
      title: '请选择',
    },
  };
  return (
    <div>
      <ComposeForm {...props} />
    </div>
  );
};
