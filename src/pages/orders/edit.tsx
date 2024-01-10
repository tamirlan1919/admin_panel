import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { API_URL, TOKEN_KEY } from "../../constants";
import axios from "axios";

const { Option } = Select;

export const OrdersEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();
    const [statusOptions, setStatusOptions] = useState<any[]>([]);
    
    useEffect(() => {
      const fetchStatusOptions = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/statuses`, {
            headers: {
              Authorization: `Bearer ${TOKEN_KEY}`, // Adjust as needed
            },
          });

          // Assuming the response.data is an array of products with "status" property

          setStatusOptions(response.data.data);
        } catch (error) {
          console.error('Error fetching statuses:', error);
        }
      };

      fetchStatusOptions(); // Call the fetch function

    }, []); // Empty dependency array to run only once

    const ordersData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("Id")}
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
                    label={translate("Цена")}
                    name={["total_price"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("Статус")}
                    name={["status"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        {/* Map through fetched status options and create options */}
                        {statusOptions?.map((status) => (
                            <Option key={status?.id} value={status.attributes?.name}>
                                {status.attributes?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={translate("Создан")}
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
