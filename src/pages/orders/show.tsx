import React from "react";
import {
    IResourceComponentsProps,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TextField,
    DateField,
} from "@refinedev/antd";
import { Typography, List, Space } from "antd";

const { Title } = Typography;



const getProductNameById = (productId: any, products: any[]) => {
    const product = products?.find((p) => p.id == productId);
    return product ? product?.name  : "Название не найдено";
};

export const OrdersShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow({
        metaData: {
            populate: '*',
        },
    });
    const { data, isLoading } = queryResult;

    const record = data?.data;
    console.log(record);

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{translate("Id")}</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>{translate("Цена")}</Title>
            <NumberField value={record?.total_price ?? ""} />
            <Title level={5}>{translate("Статус")}</Title>
            <TextField value={record?.status} />
            <Title level={5}>{translate("Создан")}</Title>
            <DateField value={record?.createdAt} />
            <hr />
            
            <Title style={{textAlign:'center', marginTop: '50px'}} level={5}>{translate("Товары")}</Title>

            <List
                itemLayout="horizontal"
                dataSource={record?.values.products}
                style={{marginBottom: '50px'}}
                renderItem={(product) => (
                    
                    <List.Item>
                        <Space direction="vertical">
                            <span>{getProductNameById(product.id, record?.products)}</span>
                            <span>Количество: {product.quantity}</span>
                        </Space>
                    </List.Item>
                )}
            />
<hr />
            <Title level={5}>{translate("Клиент")}</Title>
            <Space direction="vertical">
                <span>{record?.user.username}</span>
            </Space>
            <hr />
            <Title level={5}>{translate("Адрес")}</Title>
            <Space direction="vertical">
                <span>{translate("Телефон")}: {record?.address.phoneNumber}</span>
                <span>{translate("Страна")}: {record?.address.country}</span>
                <span>{translate("Город")}: {record?.address.city}</span>
                <span>{translate("Адрес")}: {record?.address.address}</span>
                <span>{translate("Дом")}: {record?.address.house}</span>
                <span>{translate("Квартира")}: {record?.address.kv}</span>
            </Space>
        </Show>
    );
};
