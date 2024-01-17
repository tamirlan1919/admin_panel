import { DeleteButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { IBanner } from "../../interfaces";
import { API_URL } from "../../constants";

type BannerItemProps = {
    item: IBanner;
    editShow: (id?: string | undefined) => void;
};

const { Meta } = Card;

export const BannerItem: React.FC<BannerItemProps> = ({ item, editShow }) => {
    const image = item.image && item.image.length > 0 ? API_URL + item.image[0].url : "/error.png";
    return (
        <Card
            style={{ maxWidth: 500 }}
            cover={<img alt="example" src={image} height="240" />}
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
    );
};
