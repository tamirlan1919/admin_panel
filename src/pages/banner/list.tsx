import React, { useState, useEffect } from "react";
import {
    IResourceComponentsProps,
    HttpError,
    useParsed,
} from "@refinedev/core";
import {
    useSimpleList,
    useModalForm,
    CreateButton,
    List,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import {
    BannerItem,
    CreateBanner,
    EditBanner,
} from "../../components/banner";
import { IBanner } from "../../interfaces";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../constants";

export const BannersList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { listProps } = useSimpleList<IBanner>({
        permanentFilter: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
                
            },
        ],
        metaData: { populate: '*' },
        initialSorter: [{
            field: 'id',
            order: 'desc',
          }],
    });

    const {
        modalProps: createModalProps,
        formProps: createModalFormProps,
        show: createShow,
    } = useModalForm<IBanner, HttpError, IBanner>({
        action: "create",
        resource: "banners",
        redirect: false,
        meta:  { populate: '*' },
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IBanner, HttpError, IBanner>({
        action: "edit",
        meta:  { populate: '*' },
        resource: "banners",
        redirect: false,
    });



  
    return (
        <>

            <List
                headerProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 16, xs: 1, xl: 1, lg: 1, md: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <BannerItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <EditBanner
                modalProps={editModalProps}
                formProps={editFormProps}

            />
            <CreateBanner
                modalProps={createModalProps}
                formProps={createModalFormProps}

            />
        </>
    );
};

