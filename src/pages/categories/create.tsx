import React from "react";
import { IResourceComponentsProps, useParsed, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { API_URL, TOKEN_KEY } from "../../constants";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();
    const currentDate = dayjs();
    const { params } = useParsed<{ tenant: string }>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical"
                 onFinish={(values) => {
                  formProps.onFinish?.(
                      mediaUploadMapper({
                          ...values,
                          stores: [params?.tenant],
                      }),
                  );
              }}
            >
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
                <Form.Item
                    label={translate("Создан")}
                    name={["createdAt"]}
                    initialValue={currentDate}

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
        </Create>
    );
};
