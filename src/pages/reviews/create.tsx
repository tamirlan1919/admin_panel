import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { API_URL, TOKEN_KEY } from "../../constants";
import axios from "axios";
const { Option } = Select;

export const ReviewsCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();
    const [statusOptions, setStatusOptions] = useState<any[]>([]);
    console.log(queryResult)
    useEffect(() => {
      const fetchStatusOptions = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${TOKEN_KEY}`, // Adjust as needed
            },
          });

          // Assuming the response.data is an array of products with "status" property

          setStatusOptions(response.data);
        } catch (error) {
          console.error('Error fetching statuses:', error);
        }
      };

      fetchStatusOptions(); // Call the fetch function

    }, []); // Empty dependency array to run only once
    console.log(statusOptions)
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("Текст")}
                    name={["text"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                    <Form.Item
                    label={translate("Пользователь")}
                    name={['user','username']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        {/* Map through fetched status options and create options */}
                        {statusOptions?.map((user) => (
                            <Option key={user?.id} value={user?.username}>
                                {user?.username}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                </Form.Item>
                <Form.Item
                    label={translate("Рейтинг")}
                    name={["rating"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
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
        </Create>
    );
};
