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

export const ProductList: React.FC<IResourceComponentsProps> = () => {
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
                    title={translate("products.fields.name")}
                />
                <Table.Column
                    dataIndex="slug"
                    title={translate("products.fields.slug")}
                />
                <Table.Column
                    dataIndex="description"
                    title={translate("products.fields.description")}
                />
                <Table.Column
                    dataIndex="price"
                    title={translate("products.fields.price")}
                />
                <Table.Column
                    dataIndex="old_price"
                    title={translate("products.fields.old_price")}
                />
                <Table.Column
                    dataIndex="stock"
                    title={translate("products.fields.stock")}
                />
                <Table.Column
                    dataIndex={["available"]}
                    title={translate("products.fields.available")}
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["is_on_sale"]}
                    title={translate("products.fields.is_on_sale")}
                    render={(value: any) => <BooleanField value={value} />}
                />

                <Table.Column
                    dataIndex={["createdAt"]}
                    title={translate("products.fields.createdAt")}
                    render={(value: any) => <DateField value={value} />}
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
