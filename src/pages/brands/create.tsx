import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export const BrandsCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult, submit } = useForm();

    const setToday = () => {
        return dayjs().format("YYYY-MM-DD");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        // No need to set the slug value here; Strapi will generate it automatically
    };

    const handleSubmit = async (values: any) => {
        // Include any additional processing before submitting the form
        // For example, you can log the form values before submitting
        console.log(values);

        // Call the submit function to perform the actual form submission
        await submit(values);
    };

    return (
        <Create saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit }}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{ createdAt: setToday() }}
            >
                <Form.Item
                    label={translate("brands.fields.name")}
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handleNameChange} />
                </Form.Item>
                {/* Slug is not displayed in the form; Strapi will generate it automatically */}
                <Form.Item name={["slug"]} style={{ display: "none" }}>
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item
                    label={translate("brands.fields.createdAt")}
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
