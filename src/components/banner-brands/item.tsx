import { DeleteButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { IBannerBrands } from "../../interfaces";
import { API_URL } from "../../constants";
import { it } from "node:test";

type BannerBrandsItemProps = {
    item: IBannerBrands;
    editShow: (id?: string | undefined) => void;
};

const { Meta } = Card;

export const BannerBrandsItem: React.FC<BannerBrandsItemProps> = ({ item, editShow }) => {
    const image = item.image && item.image.length > 0 ? API_URL + item.image.url : "/error.png";
    console.log(item)
    return (
        
        <>
        <Card
            style={{ maxWidth: 500 }}
            cover={<img alt={item?.image?.name} src={API_URL+item?.image?.url} height="240" />}
            actions={[
                <EditOutlined key="edit" onClick={() => editShow(item.id)} />,
                <DeleteButton
                    key="delete"
                    size="small"
                    hideText
                    recordItemId={item.id}
                />,
            ]}
        >
            {/* Дополнительный контент карточки, если необходимо */}
        </Card>
        </>
    );
};
