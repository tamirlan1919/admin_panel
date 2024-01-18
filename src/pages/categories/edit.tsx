import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { API_URL, TOKEN_KEY } from "../../constants";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm({meta:  { populate: '*' }});

    const categoriesData = queryResult?.data?.data;
    
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical"
              onFinish={(values) => {
                formProps.onFinish?.(mediaUploadMapper(values));
            }}
            
            >
                <Form.Item
                    label={translate("id")}
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label={translate("Название")}
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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
                            
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    label={translate("Добавлен")}
                    name={["createdAt"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Edit>
    );
};
