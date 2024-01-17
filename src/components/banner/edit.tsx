import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import {
    Form,
    FormProps,
    Input,
    Upload,
    ModalProps,
    Modal,
    Select
  } from 'antd';
import { TOKEN_KEY, API_URL } from "../../constants";
import { useEffect, useState } from "react";
import { useParsed } from "@refinedev/core";
import axios from "axios";
import { Switch } from 'antd';
const { Option } = Select;

type EditBannerProps = {
    modalProps: ModalProps;
    formProps: FormProps;


};

export const EditBanner: React.FC<EditBannerProps> = ({
    modalProps,
    formProps,

    
}) => {

    // Update selectedCategory and selectedBrand when categories or brands change

    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                wrapperCol={{ span: 12 }}
                
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                }}
                
                
            >
                
                <Form.Item label="Image">
                <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
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