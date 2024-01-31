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
    ProductItem,
    CreateProduct,
    EditProduct,
} from "../../components/product";
import { IProduct } from "../../interfaces";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../constants";

export const ProductsList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { listProps } = useSimpleList<IProduct>({
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
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "create",
        resource: "products",
        redirect: false,
        meta:  { populate: '*' },
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "edit",
        meta:  { populate: '*' },
        resource: "products",
        redirect: false,
    });

    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/categories?populate=*&pagination[page]=1&pagination[pageSize]=99999`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN_KEY}`,
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
          try {
            const response = await axios.get(`${API_URL}/api/brands?populate=*&pagination[page]=1&pagination[pageSize]=99999`, {
              headers: {
                Authorization: `Bearer ${TOKEN_KEY}`,
              },
            });
            setBrands(response.data.data);
          } catch (error) {
            console.error('Error fetching brands:', error);
          }
        };
      
        fetchBrands();
    }, []);

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
                            <ProductItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <EditProduct
                modalProps={editModalProps}
                formProps={editFormProps}
                categories={categories}
                brands={brands}
            />
            <CreateProduct
                modalProps={createModalProps}
                formProps={createModalFormProps}
                categories={categories}
                brands={brands}
            />
        </>
    );
};

export default ProductsList;
