import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useTranslate,
    useParsed,
} from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { IOrder } from "../../interfaces";

export const OrdersList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { params } = useParsed<{ tenant: string }>();
    const { tableProps } = useTable<IOrder>({
        permanentFilter: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
            },
        ],
        metaData: {
            populate:  '*',
        },
    });

    console.log(tableProps)
    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("id")}
                    sorter
                />
                <Table.Column
                    dataIndex="total_price"
                    title={translate("total_price")}
                    sorter
                />
                <Table.Column
                    dataIndex="status"
                    title={translate("status")}
                    sorter
                />
                <Table.Column
                    dataIndex={['user','username']}
                    title={translate("Клиент")}
                />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title={translate("createdAt")}
                    sorter
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
