import { IResourceComponentsProps } from "@refinedev/core";
import { AntdCreateInferencer } from "@refinedev/inferencer/antd";

export const BrandsCreate: React.FC<IResourceComponentsProps> = () => {
  return (
    <AntdCreateInferencer
      fieldTransformer={(field) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }
        return field;
      }}
    />
  );
};
