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
import { IReviews } from "../../interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { params } = useParsed<{ tenant: string }>();
    const { tableProps } = useTable<IReviews>({
        permanentFilter: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
                
            },
        ],
        initialSorter: [{
            field: 'id',
            order: 'desc',
          }],
        metaData: {
            populate:  '*',
        },
        
    });


    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("id")}
                    sorter
                />
            <Table.Column
                    dataIndex={['user','username']}
                    title={translate("Клиент")}
                />
                <Table.Column
                    dataIndex="text"
                    title={translate("Текст")}
                    sorter
                />
                    <Table.Column
                    dataIndex="rating"
                    title={translate("Рейтинг")}
                    sorter
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
