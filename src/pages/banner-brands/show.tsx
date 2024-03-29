import { IResourceComponentsProps } from "@refinedev/core";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";

export const BannersBrandsShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <AntdShowInferencer
      fieldTransformer={(field) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
