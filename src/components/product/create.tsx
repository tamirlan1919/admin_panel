
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

type CreateProductProps = {
  modalProps: ModalProps;
  formProps: FormProps;
  categories: any[]; // Add categories prop
  brands: any[]
};

export const CreateProduct: React.FC<CreateProductProps> = ({
  modalProps,
  formProps,
  categories,
  brands
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
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Категория"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a category',
                        },
                    ]}
                >
                    <Select>
                        {categories?.map((category) => (
                            <Option key={category?.id} value={category?.id}>
                                {category.attributes?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Бренд"
                    name="brand"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a brand',
                        },
                    ]}
                >
                    <Select>
                        {brands?.map((brand) => (
                            <Option key={brand?.id} value={brand?.id}>
                                {brand.attributes?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Цена"
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Старая цена"
                    name="old_price"

                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="Количество"
                    name="stock"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="В наличии"
                    name="available"
                    valuePropName="checked" // Use valuePropName to set the checked property for Switch
                    >
                    <Switch />
                    </Form.Item>

                    <Form.Item
                    label="Скидка"
                    name="is_on_sale"
                    valuePropName="checked" // Use valuePropName to set the checked property for Switch
                    >
                    <Switch />
                    </Form.Item>
                <Form.Item
                    label="Id на складе"
                    name="sclad_id"

                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
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