import { IResourceComponentsProps } from "@refinedev/core";
import { AntdEditInferencer } from "@refinedev/inferencer/antd";

export const BannersEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <AntdEditInferencer
      fieldTransformer={(field) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }
        return field;
      }}
    />
  );
};
