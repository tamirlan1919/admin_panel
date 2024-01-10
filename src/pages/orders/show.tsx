import React from "react";
import {
    IResourceComponentsProps,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const OrdersShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

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
        </Show>
    );
};
