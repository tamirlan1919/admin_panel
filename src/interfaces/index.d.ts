export interface IStore {
    id: string;
    title: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: any; // eslint-disable-line
    category: any;
    brand: any;
    name: any;
    price:string,
    filter: any,
    stores: IStore;
}

export interface IBanner {
    id: string;
    title: string;
    description: string;
    image: any; // eslint-disable-line
    category: any;
    brand: any;
    name: any;
    price:string,
    filter: any,
    stores: IStore;

}

export interface IBannerBrands {
    id: string;
    title: string;
    description: string;
    image: any; // eslint-disable-line

}

export interface IOrder {
    id: string;
    title: string;
    status: "delivered" | "not delivered";
    quantitiy: number;
    customerName: string;
    product: IProduct;
    customerAddress: string;
    stores: IStore;
}

export interface IReviews {
    id: string;
    rating: number;
    text: string;

}

export interface IOrderForm {
    title: string;
    status: "delivered" | "not delivered";
    quantitiy: number;
    customerName: string;
    products?: number[];
    customerAddress: string;
    stores?: [string];
}