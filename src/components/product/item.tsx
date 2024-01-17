import React, { useState } from "react";
import { DeleteButton } from "@refinedev/antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Select } from "antd";

import { IProduct } from "../../interfaces";
import { API_URL } from "../../constants";

const { Meta } = Card;
const { Option } = Select;

type ProductItemProps = {
  item: IProduct;
  editShow: (id?: string | undefined) => void;
};

export const ProductItem: React.FC<ProductItemProps> = ({ item, editShow }) => {
  const image = item.image ? API_URL + item.image.url : "/error.png";

  return (
    <Card
      style={{ maxWidth: 300 }}
      cover={<img alt="example" src={image} height="240" />}
      actions={[
        <EditOutlined key="edit" onClick={() => editShow(item.id)} />,
        <DeleteButton key="delete" size="small" hideText recordItemId={item.id} />,
      ]}
    >
      <Meta
        className="ant-card-meta-title"
        title={item.brand?.name}
        description={item?.name}
      />
    </Card>
  );
};

type ProductFilterProps = {
  products: IProduct[];
};

export const ProductFilter: React.FC<ProductFilterProps> = ({ products }) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const categoryMatches =
      categoryFilter === "" || product.category === categoryFilter;
    const brandMatches = brandFilter === "" || product.brand?.name === brandFilter;
    const searchMatches =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatches && brandMatches && searchMatches;
  });

  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search by product name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        style={{ width: 200, margin: "8px" }}
        placeholder="Filter by category"
        onChange={(value) => setCategoryFilter(value)}
      >
        {/* Add options dynamically based on available categories */}
        <Option value="category1">Category 1</Option>
        <Option value="category2">Category 2</Option>
        {/* Add more options as needed */}
      </Select>
      <Select
        style={{ width: 200, margin: "8px" }}
        placeholder="Filter by brand"
        onChange={(value) => setBrandFilter(value)}
      >
        {/* Add options dynamically based on available brands */}
        <Option value="brand1">Brand 1</Option>
        <Option value="brand2">Brand 2</Option>
        {/* Add more options as needed */}
      </Select>

      {/* Render filtered products */}
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} item={product} editShow={() => {}} />
      ))}
    </div>
  );
};
