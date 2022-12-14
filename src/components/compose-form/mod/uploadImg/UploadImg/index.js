/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Upload, message, Image, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined } from '@ant-design/icons';
import request from '@/common/fileRequest';
import request2 from '@/common/request2';
import delIcon from './imgs/del.svg';
import preIcon from './imgs/pre.svg';
import './index.less';

export default function index({
  onUploadImgChange,
  appCode,
  value = 0,
  maxCount,
  maxSize = 10,
  isMultiple = false,
  tips,
  requestUrl,
  listType = 'picture-card',
  isCrop = false,
  orgId,
  disabled = false,
  ...otherProps
}) {
  const headers = {
    Authorization: window.token,
    'app-code': appCode,
    'page-log': `upload-img=1.0.0&appCode=${appCode}`,
  };
  const [groupId, setGroupId] = useState(value);
  const [bizGroupId, setbizGroupId] = useState(value);
  const [isFirst, setIsFirst] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        setFileList(value);
      } else if (value.toString().indexOf('http') !== -1) {
        setFileList([
          {
            status: 'done',
            uid: 1,
            fileId: 1,
            name: 1,
            url: value,
          },
        ]);
      } else {
        const __url = orgId
          ? `${requestUrl}/web/file/get?orgId=${orgId}&appCode=${appCode}&groupId=${value}`
          : `${requestUrl}/web/file/get?appCode=${appCode}&groupId=${value}`;
        request(__url).then((data) => {
          const { medias, groupId: id } = data;
          const list = medias.map((val) => {
            const { url: _url, mediaId: fileId, fileName: name } = val;
            return {
              status: 'done',
              uid: fileId,
              fileId,
              name,
              url: _url,
            };
          });
          setGroupId(id);
          !isFirst && setbizGroupId(id);
          setIsFirst(true);
          setFileList(list);
          setLoading(false);
        });
      }
    }
  }, [value]);

  const onRemove = (file) => {
    const { uid } = file;
    if (uid === 1) {
      const newsFiles = fileList.filter((val) => val.uid !== uid);
      setFileList(newsFiles);
      onUploadImgChange(0);
    } else {
      const resFiles = fileList
        .filter((val) => val.uid !== file.uid)
        .map((val) => val.fileId || val.response.data.files[0].fileId);
      request2(`${requestUrl}/web/file/del`, {
        method: 'POST',
        data: {
          fileIds: resFiles,
          groupId: groupId || 0,
          bizGroupId: bizGroupId || 0,
          orgId,
          appCode,
        },
      }).then((res) => {
        if (res === '0' || res === 0) {
          res = '';
        }
        setGroupId(res);
        onUploadImgChange(res);
      });
    }
  };

  const beforeUpload = (file) => {
    const { size, type } = file;
    if (type.includes('image')) {
      if (size > maxSize * 1024 * 1024) {
        message.error(`????????????????????????${maxSize}M`);
        return false;
      }
      if (maxCount * 1 === 1) {
        setGroupId(0);
      }
    } else {
      message.error('???????????????????????????');
      return false;
    }
    return true;
  };

  const onChange = ({ fileList: newFileList, file }) => {
    const { status, response } = file;
    if (status === 'uploading') {
      setLoading(true);
    }
    if (status) {
      setFileList(newFileList);
      if (status === 'done') {
        if (response.code === 0) {
          const { data } = response || {};
          const { groupId: id, files } = data || {};
          setGroupId(id);
          onUploadImgChange(id, files);
        } else {
          newFileList.pop();
          setFileList(newFileList);
          message.error(response.msg);
        }
      }
    }
  };
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewVisible(false);

  const onPreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewVisible(true);
    setPreviewTitle(file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const ___url = orgId
    ? `${requestUrl}/web/file/uploadFileList?appCode=${appCode}&groupId=${
        groupId || 0
      }&bizGroupId=${bizGroupId || 0}&orgId=${orgId}`
    : `${requestUrl}/web/file/uploadFileList?appCode=${appCode}&groupId=${
        groupId || 0
      }&bizGroupId=${bizGroupId || 0}`;
  const uploadProps = {
    action: ___url,
    headers,
    listType,
    maxCount: maxCount * 1,
    fileList,
    multiple: isMultiple,
    onChange,
    onRemove,
    onPreview,
    beforeUpload,
    showUploadList: !(maxCount * 1 === 1),
    disabled,
    ...otherProps,
  };

  return (
    <>
      {isCrop ? (
        <>
          {disabled && (!fileList.length || !fileList?.[0]?.url) ? (
            <span>-</span>
          ) : (
            <div className="upload-img">
              {value && maxCount === 1 ? (
                <div className="upload-img-single">
                  <div className="upload-img-single-mask">
                    <img
                      src={preIcon}
                      onClick={() => onPreview(fileList?.[0])}
                      alt=""
                    />
                    {disabled ? null : (
                      <img
                        src={delIcon}
                        onClick={() => onRemove(fileList?.[0])}
                        alt=""
                      />
                    )}
                  </div>
                  <Image
                    style={{ width: 80, height: 80 }}
                    src={fileList?.[0]?.url}
                    alt=""
                  />
                </div>
              ) : (
                <ImgCrop rotate>
                  <Upload {...uploadProps}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {loading ? <LoadingOutlined /> : <span>+</span>}
                      <span style={{ fontSize: '12px', paddingTop: '2px' }}>
                        ??????
                      </span>
                    </div>
                  </Upload>
                </ImgCrop>
              )}
              {tips && <div style={{ color: '#8c8c8c' }}>{tips}</div>}
            </div>
          )}

          {tips && (
            <div style={{ marginTop: '-5px', color: '#8c8c8c' }}>{tips}</div>
          )}
        </>
      ) : (
        <>
          {disabled && (!fileList.length || !fileList?.[0]?.url) ? (
            <span>-</span>
          ) : (
            <div className="upload-img">
              {value && maxCount === 1 ? (
                <div className="upload-img-single">
                  <div className="upload-img-single-mask">
                    <img
                      src={preIcon}
                      onClick={() => onPreview(fileList?.[0])}
                      alt=""
                    />
                    {disabled ? null : (
                      <img
                        src={delIcon}
                        onClick={() => onRemove(fileList?.[0])}
                        alt=""
                      />
                    )}
                  </div>
                  <Image
                    style={{ width: 80, height: 80 }}
                    src={fileList?.[0]?.url}
                    alt=""
                  />
                </div>
              ) : (
                <Upload {...uploadProps}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {loading ? <LoadingOutlined /> : <span>+</span>}
                    <span style={{ fontSize: '12px', paddingTop: '2px' }}>
                      ??????
                    </span>
                  </div>
                </Upload>
              )}
              {tips && (
                <div
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    wordBreak: 'break-all',
                  }}
                >
                  {tips}
                </div>
              )}
            </div>
          )}
        </>
      )}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        width={600}
        onCancel={handleCancel}
      >
        <img alt="" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
