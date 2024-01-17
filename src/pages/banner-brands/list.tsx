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
import { IBanner, IBannerBrands } from "../../interfaces";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../constants";
import { BannerBrandsItem } from "../../components/banner-brands";

export const BannersBrandsList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { listProps } = useSimpleList<IBannerBrands>({
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
    } = useModalForm<IBannerBrands, HttpError, IBannerBrands>({
        action: "create",
        resource: "banner-brands",
        redirect: false,
        meta:  { populate: '*' },
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IBannerBrands, HttpError, IBannerBrands>({
        action: "edit",
        meta:  { populate: '*' },
        resource: "banner-brands",
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
                    grid={{ gutter: 16, xs: 1, xl: 4, lg: 4, md: 6 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <BannerBrandsItem item={item} editShow={editShow} />
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

