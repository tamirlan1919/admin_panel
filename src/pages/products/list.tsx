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
                const response = await axios.get(`${API_URL}/api/categories?populate=*`, {
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
            const response = await axios.get(`${API_URL}/api/brands?populate=*`, {
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
            {/* <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: "8px", color: "black", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ marginRight: "8px", color: "black", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                        <option key={category?.id} value={category?.id}>
                            {category?.attributes?.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    style={{ marginRight: "8px", color: "black", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                    <option value="">Select Brand</option>
                    {brands?.map((brand) => (
                        <option key={brand?.id} value={brand?.id}>
                            {brand?.attributes?.name}
                        </option>
                    ))}
                </select>
            
            </div> */}
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
