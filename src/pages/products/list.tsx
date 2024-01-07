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
        metaData: { populate: ["image,brand,price"] },
    });

    const {
        modalProps: createModalProps,
        formProps: createModalFormProps,
        show: createShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "create",
        resource: "products",
        redirect: false,
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "edit",
        metaData: { populate: ["image",'brand',] },
        resource: "products",
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
                    grid={{ gutter: 16, xs: 1 , xl: 4, lg: 3, md:6 }}
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
            />
            <CreateProduct
                modalProps={createModalProps}
                formProps={createModalFormProps}
            />
        </>
    );
};