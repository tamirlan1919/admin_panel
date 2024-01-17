
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParsed } from '@refinedev/core';
import {
  mediaUploadMapper,
  getValueProps
} from '@refinedev/strapi-v4';
import {
  Form,
  FormProps,
  Input,
  Upload,
  ModalProps,
  Modal,
  Select
} from 'antd';
import { Switch } from 'antd';

import { TOKEN_KEY, API_URL } from '../../constants';
const { Option } = Select;

type CreateBannerProps = {
  modalProps: ModalProps;
  formProps: FormProps;

};

export const CreateBanner: React.FC<CreateBannerProps> = ({
  modalProps,
  formProps,

}) => {
  const { params } = useParsed<{ tenant: string }>();

    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
                onFinish={(values) => {
                    formProps.onFinish?.(
                        mediaUploadMapper({
                            ...values,
                            stores: [params?.tenant],
                        }),
                    );
                }}
            >
  
                <Form.Item label="Image">
                <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                       
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/api/upload/`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};