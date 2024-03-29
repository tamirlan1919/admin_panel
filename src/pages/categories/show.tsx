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
import { Image, Typography } from "antd";
import { API_URL } from "../../constants";

const { Title } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow({meta:  { populate: '*' }});
    const { data, isLoading } = queryResult;
    console.log(queryResult)
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{translate("id")}</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>{translate("Категория")}</Title>
            <TextField value={record?.name} /><br />
            <Image src={API_URL+record?.image?.url} width={'200px'}/>
            <Title level={5}>{translate("Создана")}</Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
