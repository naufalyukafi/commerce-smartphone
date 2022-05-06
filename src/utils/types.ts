interface IProduct {
    id: number,
    title: string,
    image: string,
    price: number
}

interface IProductDetail {
    id: number,
    title: string,
    img: string,
    price: number,
    bonus: string,
    storage: string,
    colour: string,
    image: string,
    image_detail: string,
    stok: number
}

interface ICartProduct {
    id: number,
    title: string,
    storage: string,
    colour: string,
    stok: number,
    countBuy: number,
    price: number,
    image: string,
    onDelete: () => void,
}

interface IUseRequest {
    path: string,
    name?: any
}

interface IContextValue {
    products: IProductDetail[],
    carts: ICartProduct[],
}

interface IContext {
    children: React.ReactNode;
}

export type {
    IProduct,
    IProductDetail,
    ICartProduct,
    IUseRequest,
    IContext,
    IContextValue
}