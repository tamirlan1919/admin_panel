import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    BooleanField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ProductsList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("products.fields.id")}
                />
                <Table.Column
                    dataIndex="name"
                    title={translate("Товар")}
                />
    
    
                <Table.Column
                    dataIndex="price"
                    title={translate("Цена")}
                />
                <Table.Column
                    dataIndex="old_price"
                    title={translate("Старая цена")}
                />
                <Table.Column
                    dataIndex="stock"
                    title={translate("Кол-во")}
                />
  
                <Table.Column
                    title={translate("table.actions")}
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
