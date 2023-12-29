import { IResourceComponentsProps } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  return (
    <AntdListInferencer
      fieldTransformer={(field) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
