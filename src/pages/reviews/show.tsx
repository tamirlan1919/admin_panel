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

export const ReviewsShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{translate("Id")}</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>{translate("Текст")}</Title>
            <TextField value={record?.text} />
            <Title level={5}>{translate("Рейтинг")}</Title>
            <NumberField value={record?.rating ?? ""} />
            <Title level={5}>{translate("Добавлен")}</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
